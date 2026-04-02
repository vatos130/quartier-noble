(function () {
  'use strict';

  var SESSION_KEY = 'qn_auth';

  function redirectToLogin() {
    window.location.href = 'index.html';
  }

  try {
    var raw = sessionStorage.getItem(SESSION_KEY);
    if (!raw) {
      redirectToLogin();
      return;
    }
    JSON.parse(raw);
  } catch (e) {
    redirectToLogin();
    return;
  }

  function getLocale(path) {
    var locale = window.QUARTIER_NOBLE_CONFIG && window.QUARTIER_NOBLE_CONFIG.locale;
    if (!locale) return null;
    var keys = path.split('.');
    var obj = locale;
    for (var i = 0; i < keys.length; i++) {
      obj = obj && obj[keys[i]];
    }
    return obj;
  }

  function getSessionUsername() {
    try {
      var raw = sessionStorage.getItem(SESSION_KEY);
      var s = raw && JSON.parse(raw);
      return (s && s.username) ? String(s.username) : 'Modèle';
    } catch (e) {
      return 'Modèle';
    }
  }

  function buildEspaceChat(container, sec, cfg) {
    var username = getSessionUsername();
    var storageKey = 'qn_espace_chat_' + username.replace(/[^\w-]/g, '_');
    var history = [];
    try {
      history = JSON.parse(localStorage.getItem(storageKey) || '[]');
      if (!Array.isArray(history)) history = [];
    } catch (e) {
      history = [];
    }

    var introText = sec.text != null && String(sec.text).trim() !== '' ? sec.text : '';
    if (introText) {
      var intro = document.createElement('p');
      intro.className = 'espace-single-text espace-chat-intro';
      intro.textContent = introText;
      container.appendChild(intro);
    }

    var thread = document.createElement('div');
    thread.className = 'espace-chat-thread';
    thread.setAttribute('role', 'log');
    thread.setAttribute('aria-live', 'polite');

    var welcome = document.createElement('div');
    welcome.className = 'espace-chat-bubble espace-chat-bubble--agency';
    welcome.textContent = getLocale('espacePrivePage.chatWelcome') || '';
    thread.appendChild(welcome);

    function appendUserBubble(text, authorName) {
      var wrap = document.createElement('div');
      wrap.className = 'espace-chat-msg-user';
      var authorEl = document.createElement('div');
      authorEl.className = 'espace-chat-msg-author';
      authorEl.textContent = authorName;
      var bubble = document.createElement('div');
      bubble.className = 'espace-chat-bubble espace-chat-bubble--user';
      bubble.textContent = text;
      wrap.appendChild(authorEl);
      wrap.appendChild(bubble);
      thread.appendChild(wrap);
    }

    history.forEach(function (item) {
      if (!item || !item.text) return;
      var who = item.author || username;
      appendUserBubble(item.text, who);
    });

    var statusEl = document.createElement('p');
    statusEl.className = 'espace-chat-status';
    statusEl.setAttribute('role', 'status');
    statusEl.hidden = true;

    var form = document.createElement('form');
    form.className = 'espace-chat-form';
    form.setAttribute('novalidate', '');

    var ta = document.createElement('textarea');
    ta.className = 'espace-chat-input';
    ta.id = 'espace-chat-message';
    ta.rows = 4;
    ta.setAttribute('aria-label', 'Message');
    var ph = getLocale('espacePrivePage.chatPlaceholder');
    if (ph) ta.placeholder = ph;

    var btn = document.createElement('button');
    btn.type = 'submit';
    btn.className = 'btn btn-primary espace-chat-send';
    btn.textContent = getLocale('espacePrivePage.chatSend') || 'Envoyer';

    form.appendChild(ta);
    form.appendChild(btn);

    var endpoint = cfg && cfg.contact && cfg.contact.formEndpoint;

    form.addEventListener('submit', function (e) {
      e.preventDefault();
      var text = (ta.value || '').trim();
      if (!text) return;

      if (!endpoint || String(endpoint).indexOf('formspree.io') === -1) {
        statusEl.textContent = getLocale('espacePrivePage.chatNoEndpoint') || '';
        statusEl.hidden = false;
        return;
      }

      var sendLabel = getLocale('espacePrivePage.chatSend') || 'Envoyer';
      var sendingLabel = getLocale('espacePrivePage.chatSending') || '…';
      var sentLabel = getLocale('espacePrivePage.chatSent') || '';
      var errLabel = getLocale('espacePrivePage.chatError') || '';

      btn.disabled = true;
      btn.textContent = sendingLabel;
      statusEl.hidden = true;

      var slug = username.replace(/[^a-z0-9._-]/gi, '_').slice(0, 48) || 'invite';
      var fd = new FormData();
      fd.append('name', username + ' — espace modèle');
      fd.append('email', slug + '+espace@example.com');
      fd.append('message', 'Message de « ' + username + ' » :\n\n' + text);
      fd.append('_subject', 'Quartier Noble — ' + username + ' (espace)');

      fetch(endpoint, {
        method: 'POST',
        body: fd,
        headers: { Accept: 'application/json' }
      })
        .then(function (r) {
          if (r.ok) {
            appendUserBubble(text, username);
            thread.scrollTop = thread.scrollHeight;
            history.push({ text: text, author: username, t: Date.now() });
            try {
              localStorage.setItem(storageKey, JSON.stringify(history));
            } catch (err) {}
            ta.value = '';
            statusEl.textContent = sentLabel;
            statusEl.hidden = false;
            btn.textContent = sendLabel;
            btn.disabled = false;
            ta.focus();
            setTimeout(function () {
              statusEl.hidden = true;
            }, 4000);
          } else {
            statusEl.textContent = errLabel;
            statusEl.hidden = false;
            btn.textContent = sendLabel;
            btn.disabled = false;
          }
        })
        .catch(function () {
          statusEl.textContent = errLabel;
          statusEl.hidden = false;
          btn.textContent = sendLabel;
          btn.disabled = false;
        });
    });

    container.appendChild(thread);
    container.appendChild(statusEl);
    container.appendChild(form);

    requestAnimationFrame(function () {
      thread.scrollTop = thread.scrollHeight;
    });
  }

  document.querySelectorAll('[data-locale]').forEach(function (el) {
    var key = el.getAttribute('data-locale');
    var value = getLocale(key);
    if (value != null && value !== '') el.textContent = value;
  });

  var cfg = window.QUARTIER_NOBLE_CONFIG;
  var esp = cfg && cfg.espacePrive;
  if (!esp && cfg && cfg.annonce) {
    esp = {
      intro: cfg.annonce.message,
      sections: [
        { title: 'Shooting', text: cfg.annonce.shooting || '' },
        { title: 'Prochain shooting', text: cfg.annonce.prochainShooting || '' }
      ]
    };
  }
  esp = esp || { intro: '', sections: [] };

  var viewEl = document.getElementById('espace-single-view');
  var navEl = document.getElementById('espace-nav');

  var sections = Array.isArray(esp.sections) ? esp.sections.filter(function (sec) {
    return sec && sec.title && (sec.text != null || sec.chat === true || sec.annonce != null);
  }) : [];

  var activeIndex = 0;
  var navPickerBtn = null;
  var navPickerPanel = null;
  var navPickerLabelEl = null;
  var navPickerOptionEls = [];

  function closeNavPicker() {
    if (!navPickerBtn || !navPickerPanel) return;
    navPickerBtn.setAttribute('aria-expanded', 'false');
    navPickerPanel.hidden = true;
  }

  function openNavPicker() {
    if (!navPickerBtn || !navPickerPanel) return;
    navPickerBtn.setAttribute('aria-expanded', 'true');
    navPickerPanel.hidden = false;
  }

  function toggleNavPicker(e) {
    if (e) e.stopPropagation();
    if (!navPickerPanel) return;
    if (navPickerPanel.hidden) openNavPicker();
    else closeNavPicker();
  }

  function setActiveNav(index) {
    if (index < 0 || index >= sections.length) return;
    if (navPickerLabelEl && sections[index]) {
      navPickerLabelEl.textContent = sections[index].title || '';
    }
    navPickerOptionEls.forEach(function (btn, j) {
      var on = j === index;
      btn.classList.toggle('is-active', on);
      btn.setAttribute('aria-selected', on ? 'true' : 'false');
    });
  }

  function renderSection(index) {
    if (index < 0 || index >= sections.length) index = 0;
    activeIndex = index;
    var sec = sections[index];
    if (!viewEl || !sec) return;

    viewEl.innerHTML = '';
    viewEl.setAttribute('role', 'region');
    viewEl.setAttribute('aria-label', sec.title ? sec.title + ' — contenu' : 'Contenu');

    if (index === 0 && esp.intro) {
      var welcome = document.createElement('p');
      welcome.className = 'espace-single-welcome';
      welcome.textContent = esp.intro;
      viewEl.appendChild(welcome);
    }

    var inner = document.createElement('div');
    inner.className = 'espace-single-inner';

    if (sec.chat === true) {
      buildEspaceChat(inner, sec, cfg);
    } else {
      var annonceText = sec.annonce != null ? String(sec.annonce).trim() : '';
      if (annonceText) {
        var ann = document.createElement('div');
        ann.className = 'espace-section-annonce';
        ann.setAttribute('role', 'note');
        var annLabel = document.createElement('span');
        annLabel.className = 'espace-section-annonce-label';
        annLabel.textContent = getLocale('espacePrivePage.annonceLabel') || 'Annonce';
        var annBody = document.createElement('p');
        annBody.className = 'espace-section-annonce-body';
        annBody.textContent = annonceText;
        annBody.style.whiteSpace = 'pre-wrap';
        ann.appendChild(annLabel);
        ann.appendChild(annBody);
        inner.appendChild(ann);
      }
      var bodyText = sec.text != null ? String(sec.text).trim() : '';
      if (bodyText) {
        var p = document.createElement('p');
        p.className = 'espace-single-text';
        p.textContent = bodyText;
        p.style.whiteSpace = 'pre-wrap';
        inner.appendChild(p);
      }
    }

    viewEl.appendChild(inner);
    setActiveNav(index);

    if (history.replaceState) {
      history.replaceState(null, '', '#espace-sec-' + index);
    }

    if (sec.chat === true) {
      setTimeout(function () {
        var ta = viewEl.querySelector('.espace-chat-input');
        if (ta) ta.focus();
      }, 200);
    }
  }

  function goToSection(index, smooth) {
    renderSection(index);
    if (viewEl) {
      viewEl.scrollIntoView({ behavior: smooth ? 'smooth' : 'auto', block: 'start' });
    }
  }

  if (navEl && sections.length) {
    navEl.innerHTML = '';
    var wrap = document.createElement('div');
    wrap.className = 'espace-nav-wrap';

    var fieldLabel = document.createElement('span');
    fieldLabel.className = 'espace-nav-field-label';
    fieldLabel.id = 'espace-nav-field-label';
    fieldLabel.textContent = getLocale('espacePrivePage.sectionPicker') || 'Rubrique';

    var picker = document.createElement('div');
    picker.className = 'espace-nav-picker';

    navPickerBtn = document.createElement('button');
    navPickerBtn.type = 'button';
    navPickerBtn.className = 'espace-nav-picker-btn';
    navPickerBtn.setAttribute('aria-expanded', 'false');
    navPickerBtn.setAttribute('aria-haspopup', 'listbox');
    navPickerBtn.setAttribute('aria-controls', 'espace-nav-picker-list');
    navPickerBtn.id = 'espace-nav-picker-btn';
    navPickerBtn.setAttribute('aria-labelledby', 'espace-nav-field-label espace-nav-picker-current');

    navPickerLabelEl = document.createElement('span');
    navPickerLabelEl.className = 'espace-nav-picker-current';
    navPickerLabelEl.id = 'espace-nav-picker-current';

    var chev = document.createElement('span');
    chev.className = 'espace-nav-picker-chevron';
    chev.setAttribute('aria-hidden', 'true');

    navPickerBtn.appendChild(navPickerLabelEl);
    navPickerBtn.appendChild(chev);

    navPickerPanel = document.createElement('div');
    navPickerPanel.className = 'espace-nav-picker-panel';
    navPickerPanel.id = 'espace-nav-picker-list';
    navPickerPanel.hidden = true;
    navPickerPanel.setAttribute('role', 'listbox');

    navPickerBtn.addEventListener('click', toggleNavPicker);
    navPickerPanel.addEventListener('click', function (e) {
      e.stopPropagation();
    });

    document.addEventListener('click', function () {
      closeNavPicker();
    });
    document.addEventListener('keydown', function (e) {
      if (e.key === 'Escape') closeNavPicker();
    });

    sections.forEach(function (sec, i) {
      var optBtn = document.createElement('button');
      optBtn.type = 'button';
      optBtn.className = 'espace-nav-picker-item';
      optBtn.setAttribute('role', 'option');
      optBtn.setAttribute('aria-selected', 'false');
      optBtn.textContent = sec.title || 'Rubrique ' + (i + 1);
      optBtn.addEventListener('click', function (e) {
        e.stopPropagation();
        goToSection(i, true);
        closeNavPicker();
      });
      navPickerPanel.appendChild(optBtn);
      navPickerOptionEls.push(optBtn);
    });

    picker.appendChild(navPickerBtn);
    picker.appendChild(navPickerPanel);
    wrap.appendChild(fieldLabel);
    wrap.appendChild(picker);
    navEl.appendChild(wrap);

    var hashIdx = -1;
    if (window.location.hash && /^#espace-sec-\d+$/.test(window.location.hash)) {
      hashIdx = parseInt(window.location.hash.replace('#espace-sec-', ''), 10);
    }
    if (hashIdx >= 0 && hashIdx < sections.length) {
      renderSection(hashIdx);
    } else {
      renderSection(0);
    }

    window.addEventListener('hashchange', function () {
      var m = window.location.hash.match(/^#espace-sec-(\d+)$/);
      if (!m) return;
      var idx = parseInt(m[1], 10);
      if (idx >= 0 && idx < sections.length) renderSection(idx);
    });
  }

  document.getElementById('annonce-logout').addEventListener('click', function () {
    sessionStorage.removeItem(SESSION_KEY);
    window.location.href = 'index.html';
  });
})();
