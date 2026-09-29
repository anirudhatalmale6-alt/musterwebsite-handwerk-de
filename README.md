# Musterwebsite: Vollmer Haustechnik GmbH

Arbeitsprobe fuer eine deutsche Handwerks-Website (SHK-Meisterbetrieb).
Vier Seiten: Startseite, Leistungen, Impressum, Datenschutzerklaerung.

Live: siehe GitHub Pages dieses Repos.

## Hinweis

Die Vollmer Haustechnik GmbH ist ein erfundenes Unternehmen. Firma, Anschrift,
Telefonnummern, Registerangaben und Referenzen sind Beispieldaten und beziehen
sich auf kein bestehendes Unternehmen. Diese Seiten dienen ausschliesslich als
Arbeitsprobe.

## Was hier umgesetzt ist

Deutscher Markt:

- Impressum nach Paragraf 5 DDG inkl. Kammer, Berufsbezeichnung und Aufsicht
- Datenschutzerklaerung mit Rechtsgrundlagen, Speicherdauer und Betroffenenrechten
- Einwilligungs-Banner, externe Karte wird erst nach Zustimmung geladen
- Kontaktformular mit Einwilligungs-Checkbox und markierten Pflichtfeldern
- Durchgaengig Sie-Form, korrekte Umlaute und scharfes S
- Keine Google Fonts, keine CDN, keine Tracker: null externe Requests

Technik:

- Statisches HTML und CSS, kein Framework, kein Build-Schritt
- Schriften lokal als woff2, auf den benoetigten Zeichensatz reduziert
- Responsiv von 320 px bis Desktop, mobiles Menue
- JSON-LD (HVACBusiness, BreadcrumbList), Meta-Tags, Open Graph, Canonical
- Formularpruefung ohne Fremdbibliothek, Fehlermeldungen auf Deutsch
- `prefers-reduced-motion` wird respektiert

## Aufbau

```
index.html          Startseite
leistungen.html     Leistungen
impressum.html      Impressum
datenschutz.html    Datenschutzerklaerung
assets/style.css    Gesamtes Layout
assets/site.js      Menue, Einwilligung, Kartensperre, Formular
assets/fonts/       TeX Gyre Heros Cn, Lato, Inconsolata als woff2
```

## Schriftlizenzen

- TeX Gyre Heros Cn: GUST Font License
- Lato: SIL Open Font License 1.1
- Inconsolata: SIL Open Font License 1.1

## Geprueft mit

Playwright (Chromium), Desktop 1280x720 und Mobil 390x780:

- 0 externe Requests auf allen vier Seiten
- 0 JavaScript-Fehler, 0 Konsolen-Warnungen
- kein Element ragt aus dem Viewport
- Einwilligung, Kartensperre, Formularpruefung und mobiles Menue funktionieren
