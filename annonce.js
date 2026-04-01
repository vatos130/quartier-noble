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

  document.querySelectorAll('[data-locale]').forEach(function (el) {
    var key = el.getAttribute('data-locale');
    var value = getLocale(key);
    if (value != null && value !== '') el.textContent = value;
  });

  var bodyEl = document.getElementById('annonce-body');
  var msg = window.QUARTIER_NOBLE_CONFIG && window.QUARTIER_NOBLE_CONFIG.annonce && window.QUARTIER_NOBLE_CONFIG.annonce.message;
  if (bodyEl && msg != null) {
    bodyEl.textContent = msg;
  }

  document.getElementById('annonce-logout').addEventListener('click', function () {
    sessionStorage.removeItem(SESSION_KEY);
    window.location.href = 'index.html';
  });
})();
