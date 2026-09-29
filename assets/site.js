/* Vollmer Haustechnik - Musterwebsite
   Mobiles Menue, Cookie-Einwilligung, Karten-Sperre, Formularpruefung, Scroll-Auftritt */
(function () {
  'use strict';

  var STORE = 'vh_consent_v1';

  /* ----- Mobiles Menue ----- */
  var burger = document.querySelector('.burger');
  var nav = document.getElementById('hauptnavigation');
  if (burger && nav) {
    burger.addEventListener('click', function () {
      var open = burger.getAttribute('aria-expanded') === 'true';
      burger.setAttribute('aria-expanded', open ? 'false' : 'true');
      nav.classList.toggle('on', !open);
      document.querySelector('.masthead').classList.toggle('open', !open);
      document.body.style.overflow = open ? '' : 'hidden';
    });
    nav.addEventListener('click', function (e) {
      if (e.target.tagName === 'A' && nav.classList.contains('on')) {
        burger.setAttribute('aria-expanded', 'false');
        nav.classList.remove('on');
        document.querySelector('.masthead').classList.remove('open');
        document.body.style.overflow = '';
      }
    });
  }

  /* ----- Cookie-Einwilligung -----
     Externe Inhalte (Karte) werden erst nach ausdruecklicher Zustimmung geladen. */
  function readConsent() {
    try { return JSON.parse(localStorage.getItem(STORE)) || null; }
    catch (e) { return null; }
  }
  function writeConsent(value) {
    try { localStorage.setItem(STORE, JSON.stringify(value)); } catch (e) {}
  }

  var banner = document.querySelector('.cookie');
  var consent = readConsent();

  if (banner) {
    if (!consent) {
      setTimeout(function () { banner.classList.add('on'); }, 700);
    }
    banner.addEventListener('click', function (e) {
      var act = e.target.getAttribute('data-consent');
      if (!act) return;
      writeConsent({ extern: act === 'all', ts: new Date().toISOString() });
      banner.classList.remove('on');
      if (act === 'all') unlockMaps();
    });
  }

  /* ----- Karte erst nach Einwilligung ----- */
  function unlockMaps() {
    var gates = document.querySelectorAll('.map-gate');
    for (var i = 0; i < gates.length; i++) {
      var g = gates[i];
      var live = g.parentNode.querySelector('.map-live');
      if (live) { live.classList.add('on'); g.style.display = 'none'; }
    }
  }
  if (consent && consent.extern) unlockMaps();

  var mapBtn = document.querySelector('[data-map-load]');
  if (mapBtn) {
    mapBtn.addEventListener('click', function () {
      var c = readConsent() || {};
      c.extern = true;
      c.ts = new Date().toISOString();
      writeConsent(c);
      if (banner) banner.classList.remove('on');
      unlockMaps();
    });
  }

  /* ----- Formularpruefung ----- */
  var form = document.getElementById('kontaktformular');
  if (form) {
    var ok = form.querySelector('.form-ok');

    function fail(el, on) {
      el.setAttribute('aria-invalid', on ? 'true' : 'false');
      var box = el.closest('.field') || el.closest('.consent');
      var msg = box && box.querySelector('.err');
      if (msg) msg.classList.toggle('on', on);
    }

    form.addEventListener('submit', function (e) {
      e.preventDefault();
      var bad = null;
      var required = form.querySelectorAll('[data-pflicht]');

      for (var i = 0; i < required.length; i++) {
        var el = required[i];
        var wrong;
        if (el.type === 'checkbox') {
          wrong = !el.checked;
        } else if (el.type === 'email') {
          wrong = !/^[^\s@]+@[^\s@]+\.[a-z]{2,}$/i.test(el.value.trim());
        } else {
          wrong = el.value.trim().length < 2;
        }
        fail(el, wrong);
        if (wrong && !bad) bad = el;
      }

      if (bad) { bad.focus(); return; }

      if (ok) {
        ok.classList.add('on');
        ok.setAttribute('tabindex', '-1');
        ok.focus();
      }
      form.querySelector('.form-fields').style.display = 'none';
    });

    form.addEventListener('input', function (e) {
      if (e.target.getAttribute('data-pflicht') !== null &&
          e.target.getAttribute('aria-invalid') === 'true') {
        fail(e.target, false);
      }
    });
  }

  /* ----- Auftritt beim Scrollen ----- */
  var risers = document.querySelectorAll('.rise');
  if ('IntersectionObserver' in window && risers.length) {
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add('seen');
          io.unobserve(entry.target);
        }
      });
    }, { rootMargin: '0px 0px -12% 0px', threshold: 0.08 });
    for (var j = 0; j < risers.length; j++) io.observe(risers[j]);
  } else {
    for (var k = 0; k < risers.length; k++) risers[k].classList.add('seen');
  }
})();
