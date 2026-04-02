(function () {
  'use strict';

  var SESSION_KEY = 'qn_auth';

  const header = document.querySelector('.header');
  const menuToggle = document.querySelector('.menu-toggle');
  const nav = document.querySelector('.nav');
  const contactForm = document.querySelector('.contact-form');

  // Appliquer la config contact + réseaux (config.js)
  function applyConfig() {
    var c = window.QUARTIER_NOBLE_CONFIG;
    if (!c) return;
    var contact = c.contact;
    var social = c.social;

    if (contact) {
      var companyEl = document.getElementById('contact-company');
      var addressWrap = document.getElementById('contact-address-wrap');
      var addressEl = document.getElementById('contact-address');
      var emailWrap = document.getElementById('contact-email-wrap');
      var phoneWrap = document.getElementById('contact-phone-wrap');
      var phoneEl = document.getElementById('contact-phone');

      if (companyEl && contact.companyName) companyEl.textContent = contact.companyName;
      if (addressWrap) addressWrap.style.display = contact.showAddress !== false ? '' : 'none';
      if (addressEl && contact.address) addressEl.textContent = contact.address;
      if (emailWrap) emailWrap.style.display = contact.showEmail !== false ? '' : 'none';
      var emailTextEl = document.getElementById('contact-email-text');
      if (emailTextEl && contact.email) emailTextEl.textContent = contact.email;
      if (phoneWrap) phoneWrap.style.display = contact.showPhone !== false ? '' : 'none';
      if (phoneEl && contact.phone) phoneEl.textContent = contact.phone;
    }

    if (social) {
      var instaWrap = document.getElementById('contact-insta-wrap');
      var instaEl = document.getElementById('contact-insta');
      if (instaWrap) instaWrap.style.display = social.showInstagram && social.instagram ? '' : 'none';
      if (instaEl && social.instagram) instaEl.href = social.instagram;
    }
  }
  applyConfig();

  // Locale : appliquer les textes depuis config.locale
  (function applyLocale() {
    var locale = window.QUARTIER_NOBLE_CONFIG && window.QUARTIER_NOBLE_CONFIG.locale;
    if (!locale) return;
    function get(obj, path) {
      var keys = path.split('.');
      for (var i = 0; i < keys.length; i++) { obj = obj && obj[keys[i]]; }
      return obj;
    }
    document.querySelectorAll('[data-locale]').forEach(function (el) {
      var key = el.getAttribute('data-locale');
      var value = get(locale, key);
      if (value != null && value !== '') el.textContent = value;
    });
  })();

  // Modèles : construction des cartes depuis config.js (avec liste par défaut si absent)
  (function injectModels() {
    var grid = document.getElementById('models-grid');
    if (!grid) return;
    var list = window.QUARTIER_NOBLE_CONFIG && window.QUARTIER_NOBLE_CONFIG.models;
    if (!Array.isArray(list) || list.length === 0) {
      list = [
        { name: "Harysson", label: "Homme", photos: ["model/Harysson/Harysson1.jpg", "model/Harysson/Harysson2.jpg", "model/Harysson/Harysson3.jpg"] },
        { name: "Moha", label: "Homme", photos: ["model/Moha/Moha0.jpg", "model/Moha/Moha1.jpg"] }
      ];
    }
    grid.innerHTML = '';
    list.forEach(function (m) {
      var photos = m.photos || [];
      var firstPhoto = photos[0];
      if (!firstPhoto) return;
      var card = document.createElement('article');
      card.className = 'model-card';
      card.setAttribute('data-model-name', m.name);
      card.setAttribute('data-model-photos', photos.join(','));
      card.innerHTML =
        '<div class="model-image"><img src="' + firstPhoto + '" alt="' + (m.name || '').replace(/"/g, '&quot;') + '" loading="lazy"></div>' +
        '<div class="model-info"><h3>' + (m.name || '').replace(/</g, '&lt;') + '</h3><p>' + (m.label || '').replace(/</g, '&lt;') + '</p></div>';
      grid.appendChild(card);
    });
  })();

  // Header : fond au scroll
  function onScroll() {
    if (window.scrollY > 80) {
      header.classList.add('scrolled');
    } else {
      header.classList.remove('scrolled');
    }
  }
  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();

  // Connexion : modale + redirection vers annonce.html
  var loginModal = document.getElementById('login-modal');
  var openLoginBtn = document.getElementById('open-login');
  var loginBackdrop = document.getElementById('login-modal-backdrop');
  var loginCancel = document.getElementById('login-cancel');
  var loginForm = document.getElementById('login-form');
  var loginError = document.getElementById('login-error');

  function openLoginModal() {
    if (!loginModal) return;
    loginModal.classList.add('is-open');
    loginModal.setAttribute('aria-hidden', 'false');
    document.body.style.overflow = 'hidden';
    if (nav) nav.classList.remove('open');
    if (menuToggle) menuToggle.setAttribute('aria-expanded', 'false');
    var u = document.getElementById('login-username');
    if (u) u.focus();
  }

  function restoreLoginFormControls() {
    var loc = window.QUARTIER_NOBLE_CONFIG && window.QUARTIER_NOBLE_CONFIG.locale && window.QUARTIER_NOBLE_CONFIG.locale.login;
    var sb = loginForm && loginForm.querySelector('button[type="submit"]');
    if (sb) {
      sb.disabled = false;
      sb.textContent = (loc && loc.submit) || 'Valider';
      sb.classList.remove('is-loading');
    }
    if (loginCancel) loginCancel.disabled = false;
    var u = document.getElementById('login-username');
    var p = document.getElementById('login-password');
    if (u) u.disabled = false;
    if (p) p.disabled = false;
  }

  function closeLoginModal() {
    if (!loginModal) return;
    loginModal.classList.remove('is-open');
    loginModal.setAttribute('aria-hidden', 'true');
    document.body.style.overflow = '';
    if (loginError) loginError.hidden = true;
    if (loginForm) loginForm.reset();
    restoreLoginFormControls();
  }

  if (openLoginBtn) openLoginBtn.addEventListener('click', openLoginModal);
  if (loginBackdrop) loginBackdrop.addEventListener('click', closeLoginModal);
  if (loginCancel) loginCancel.addEventListener('click', closeLoginModal);

  if (loginForm) {
    loginForm.addEventListener('submit', function (e) {
      e.preventDefault();
      var cfg = window.QUARTIER_NOBLE_CONFIG;
      var locLogin = cfg && cfg.locale && cfg.locale.login;
      var submitBtn = loginForm.querySelector('button[type="submit"]');
      var loadingLabel = (locLogin && locLogin.loading) || 'Connexion…';

      if (submitBtn) {
        submitBtn.disabled = true;
        submitBtn.textContent = loadingLabel;
        submitBtn.classList.add('is-loading');
      }
      if (loginCancel) loginCancel.disabled = true;
      var uEl = document.getElementById('login-username');
      var pEl = document.getElementById('login-password');
      if (uEl) uEl.disabled = true;
      if (pEl) pEl.disabled = true;
      if (loginError) loginError.hidden = true;

      var rawU = (uEl || {}).value;
      var rawP = (pEl || {}).value;
      var username = rawU != null ? String(rawU).trim() : '';
      var password = rawP != null ? String(rawP).trim() : '';
      var users = cfg && cfg.auth && cfg.auth.users;

      if (!Array.isArray(users) || users.length === 0) {
        restoreLoginFormControls();
        if (loginError) {
          loginError.textContent = 'Configuration indisponible. Vérifiez que config.js se charge (aucune erreur dans la page).';
          loginError.hidden = false;
        }
        return;
      }

      var matched = null;
      for (var i = 0; i < users.length; i++) {
        var u = users[i];
        if (!u || u.username == null || u.password == null) continue;
        if (
          String(u.username).trim().toLowerCase() === username.toLowerCase() &&
          String(u.password) === password
        ) {
          matched = u;
          break;
        }
      }

      if (matched) {
        sessionStorage.setItem(
          SESSION_KEY,
          JSON.stringify({ username: String(matched.username).trim() })
        );
        var panel = loginModal && loginModal.querySelector('.login-modal-panel');
        if (loginModal) loginModal.setAttribute('aria-busy', 'true');
        if (panel) panel.classList.add('is-connecting');
        setTimeout(function () {
          window.location.href = 'annonce.html';
        }, 1200);
        return;
      }

      restoreLoginFormControls();
      if (loginError) {
        var errDefault =
          (cfg.locale && cfg.locale.login && cfg.locale.login.error) ||
          'Identifiant ou mot de passe incorrect.';
        loginError.textContent = errDefault;
        loginError.hidden = false;
      }
    });
  }

  document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape' && loginModal && loginModal.classList.contains('is-open')) {
      closeLoginModal();
    }
  });

  // Menu mobile
  if (menuToggle && nav) {
    menuToggle.addEventListener('click', function () {
      nav.classList.toggle('open');
      menuToggle.setAttribute('aria-expanded', nav.classList.contains('open'));
    });
    nav.querySelectorAll('a').forEach(function (link) {
      link.addEventListener('click', function () {
        nav.classList.remove('open');
        menuToggle.setAttribute('aria-expanded', 'false');
      });
    });
  }

  // Galerie modale : clic sur un modèle = afficher toutes ses photos
  var gallery = document.getElementById('model-gallery');
  var galleryTitle = document.getElementById('model-gallery-title');
  var galleryImg = document.getElementById('model-gallery-img');
  var galleryCurrentN = document.getElementById('model-gallery-current-n');
  var galleryTotalN = document.getElementById('model-gallery-total-n');
  var galleryThumbs = document.getElementById('model-gallery-thumbs');
  var galleryBackdrop = gallery && gallery.querySelector('.model-gallery-backdrop');
  var galleryClose = gallery && gallery.querySelector('.model-gallery-close');
  var galleryPrev = gallery && gallery.querySelector('.model-gallery-prev');
  var galleryNext = gallery && gallery.querySelector('.model-gallery-next');

  var currentPhotos = [];
  var currentIndex = 0;

  function openGallery(name, photos) {
    if (!gallery || !photos.length) return;
    currentPhotos = photos;
    currentIndex = 0;
    galleryTitle.textContent = name;
    galleryTotalN.textContent = String(photos.length);
    galleryImg.src = photos[0];
    galleryImg.alt = name;
    galleryCurrentN.textContent = '1';
    galleryThumbs.innerHTML = '';
    photos.forEach(function (src, i) {
      var btn = document.createElement('button');
      btn.type = 'button';
      btn.className = i === 0 ? 'is-active' : '';
      btn.setAttribute('aria-label', 'Voir photo ' + (i + 1));
      var thumb = document.createElement('img');
      thumb.src = src;
      thumb.alt = '';
      btn.appendChild(thumb);
      btn.addEventListener('click', function () {
        setGalleryIndex(i);
      });
      galleryThumbs.appendChild(btn);
    });
    gallery.classList.add('is-open');
    gallery.setAttribute('aria-hidden', 'false');
    document.body.style.overflow = 'hidden';
  }

  function setGalleryIndex(index) {
    if (index < 0) index = currentPhotos.length - 1;
    if (index >= currentPhotos.length) index = 0;
    currentIndex = index;
    galleryImg.src = currentPhotos[index];
    galleryCurrentN.textContent = String(index + 1);
    var thumbs = galleryThumbs.querySelectorAll('button');
    thumbs.forEach(function (btn, i) {
      btn.classList.toggle('is-active', i === index);
    });
  }

  function closeGallery() {
    if (!gallery) return;
    gallery.classList.remove('is-open');
    gallery.setAttribute('aria-hidden', 'true');
    document.body.style.overflow = '';
  }

  if (gallery) {
    document.querySelectorAll('.model-card').forEach(function (card) {
      card.addEventListener('click', function () {
        var name = card.getAttribute('data-model-name');
        var photosStr = card.getAttribute('data-model-photos');
        if (!name || !photosStr) return;
        var photos = photosStr.split(',').map(function (s) { return s.trim(); }).filter(Boolean);
        openGallery(name, photos);
      });
    });
    if (galleryBackdrop) galleryBackdrop.addEventListener('click', closeGallery);
    if (galleryClose) galleryClose.addEventListener('click', closeGallery);
    if (galleryPrev) galleryPrev.addEventListener('click', function () { setGalleryIndex(currentIndex - 1); });
    if (galleryNext) galleryNext.addEventListener('click', function () { setGalleryIndex(currentIndex + 1); });
    document.addEventListener('keydown', function (e) {
      if (!gallery.classList.contains('is-open')) return;
      if (e.key === 'Escape') closeGallery();
      if (e.key === 'ArrowLeft') setGalleryIndex(currentIndex - 1);
      if (e.key === 'ArrowRight') setGalleryIndex(currentIndex + 1);
    });
  }

  // Formulaire contact : envoi vers Formspree si formEndpoint est configuré
  if (contactForm) {
    contactForm.addEventListener('submit', function (e) {
      e.preventDefault();
      var btn = contactForm.querySelector('button[type="submit"]');
      var text = btn.textContent;
      var endpoint = (window.QUARTIER_NOBLE_CONFIG && window.QUARTIER_NOBLE_CONFIG.contact && window.QUARTIER_NOBLE_CONFIG.contact.formEndpoint) || '';
      btn.textContent = 'Envoi…';
      btn.disabled = true;

      function resetBtn() {
        contactForm.reset();
        setTimeout(function () {
          btn.textContent = text;
          btn.disabled = false;
        }, 3000);
      }

      if (endpoint && endpoint.indexOf('formspree.io') !== -1) {
        fetch(endpoint, {
          method: 'POST',
          body: new FormData(contactForm),
          headers: { Accept: 'application/json' }
        })
          .then(function (r) {
            if (r.ok) {
              btn.textContent = 'Message envoyé';
              resetBtn();
            } else {
              btn.textContent = 'Erreur, réessayez';
              setTimeout(function () { btn.textContent = text; btn.disabled = false; }, 3000);
            }
          })
          .catch(function () {
            btn.textContent = 'Erreur, réessayez';
            setTimeout(function () { btn.textContent = text; btn.disabled = false; }, 3000);
          });
      } else {
        btn.textContent = 'Message envoyé';
        setTimeout(resetBtn, 800);
      }
    });
  }
})();
