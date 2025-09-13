# 📊 Google Analytics 4 Setup für HormonCode

## 🚀 Quick Setup (5 Minuten)

### Schritt 1: Google Analytics Account erstellen

1. **Gehe zu:** [analytics.google.com](https://analytics.google.com)
2. **Klicke:** "Kostenfrei starten"
3. **Account-Name:** "HormonCode"
4. **Property-Name:** "HormonCode Website"
5. **Zeitzone:** Schweiz (GMT+1)
6. **Währung:** CHF

### Schritt 2: Measurement ID kopieren

Nach dem Setup erhältst du eine **Measurement ID** wie:
```
G-XXXXXXXXXX
```

### Schritt 3: Code in Landing Page einfügen

**Ersetze in `index.html`:**
```html
<!-- Zeile 57 & 63 -->
<script async src="https://www.googletagmanager.com/gtag/js?id=G-XXXXXXXXXX"></script>

gtag('config', 'G-XXXXXXXXXX', {
```

**Beispiel:**
```html
<!-- Deine echte Measurement ID -->
<script async src="https://www.googletagmanager.com/gtag/js?id=G-12345ABCDE"></script>

gtag('config', 'G-12345ABCDE', {
```

### Schritt 4: Testen

1. **Öffne:** hormoncode.com
2. **Gehe zu:** Google Analytics → Berichte → Echtzeit
3. **Sollte zeigen:** 1 aktiver Nutzer (Du!)

## 📈 Was wird automatisch getrackt:

### Standard-Events (kostenlos):
- ✅ **page_view** - Seitenaufrufe
- ✅ **scroll** - Scroll-Verhalten (25%, 50%, 75%, 90%)
- ✅ **click** - Externe Links
- ✅ **file_download** - PDF-Downloads
- ✅ **video_play** - Video-Interaktionen

### Custom HormonCode Events:
- ✅ **waitlist_signup** - Warteliste-Anmeldungen
- ✅ **form_interaction** - Formular-Nutzung
- ✅ **interest_selected** - Interesse-Auswahl
- ✅ **age_selected** - Altersgruppe-Auswahl

## 🎯 Wichtige Metriken für HormonCode:

### Conversions Setup:
1. **GA4 öffnen** → Admin → Events
2. **Als Conversion markieren:**
   - `waitlist_signup` ✅
   - `form_interaction` (optional)

### Custom Audiences:
1. **GA4 öffnen** → Admin → Audiences
2. **Neue Audience:**
   - **Name:** "Warteliste Interessierte"
   - **Bedingung:** `form_interaction` Event
   - **Verwendung:** Retargeting Ads

### Goal Setup:
- **Primäres Ziel:** Warteliste-Anmeldungen
- **Sekundäres Ziel:** Scroll zu 75% (Engagement)
- **Tertiäres Ziel:** Interesse-Auswahl (Intent)

## 📊 Analytics Dashboard Setup:

### Standard-Reports:
- **Echtzeit** → Aktuelle Nutzer
- **Zielgruppe** → Demografie (Alter, Geschlecht)
- **Akquisition** → Traffic-Quellen
- **Verhalten** → Seitenaufrufe
- **Conversions** → Warteliste-Anmeldungen

### Custom Report erstellen:
1. **GA4** → Erkunden → Leerer Bericht
2. **Dimensionen:** 
   - Traffic-Quelle
   - Altersgruppe (custom)
   - Interesse (custom)
3. **Messwerte:**
   - Nutzer
   - Warteliste-Anmeldungen
   - Conversion-Rate

## 🔗 Integration mit anderen Tools:

### Google Search Console:
1. **GA4** → Admin → Property → Search Console Links
2. **Verknüpfe:** hormoncode.com
3. **Nutzen:** SEO-Performance tracken

### Google Ads (für später):
1. **GA4** → Admin → Google Ads-Verknüpfungen
2. **Import:** Conversions zu Google Ads
3. **Optimierung:** Bidding basierend auf GA4-Daten

## 📧 Alert Setup:

### Wichtige Alerts:
```
Alert 1: Kein Traffic
- Bedingung: Tägliche Nutzer < 5
- Benachrichtigung: Email

Alert 2: Hohe Conversion-Rate
- Bedingung: Conversion-Rate > 15%
- Benachrichtigung: Email (Erfolg!)

Alert 3: Technischer Fehler
- Bedingung: Bounce-Rate > 90%
- Benachrichtigung: Email (Problem)
```

## 📱 Mobile App Tracking (später):

Wenn Sie eine mobile App entwickeln:
```javascript
// React Native / Flutter
firebase.analytics().logEvent('waitlist_signup', {
  age: '40-44',
  source: 'mobile_app',
  interests: 'hormone-balance'
});
```

## 🎯 KPIs Dashboard (Looker Studio):

**Erstelle kostenloses Dashboard:**
1. **Gehe zu:** [datastudio.google.com](https://datastudio.google.com)
2. **Datenquelle:** Google Analytics 4
3. **KPIs:**
   - Täglich Warteliste-Anmeldungen
   - Conversion-Rate nach Traffic-Quelle
   - User-Demografie
   - Scroll-Engagement

## 🔐 Datenschutz & DSGVO:

**Cookie-Banner (optional):**
```html
<!-- Cookiebot oder ähnlich -->
<script id="Cookiebot" src="https://consent.cookiebot.com/uc.js" 
        data-cbid="YOUR-DOMAIN-GROUP-ID" type="text/javascript" async></script>
```

**IP-Anonymisierung (automatisch in GA4):**
- GA4 anonymisiert IPs automatisch
- Keine zusätzliche Konfiguration nötig

## ✅ Launch Checklist:

- [ ] Google Analytics Account erstellt
- [ ] Measurement ID in Website eingefügt
- [ ] Echtzeit-Tracking funktioniert
- [ ] Conversions konfiguriert
- [ ] Search Console verknüpft
- [ ] Custom Audiences erstellt
- [ ] Alerts eingerichtet
- [ ] Dashboard erstellt

**Nach Setup:** Erste Daten sind nach 24-48h verfügbar!

## 💡 Pro-Tips:

1. **Geduld:** Erste aussagekräftige Daten nach 1-2 Wochen
2. **Segmentierung:** Analysiere verschiedene Traffic-Quellen separat
3. **Cohort-Analyse:** Verfolge User-Gruppen über Zeit
4. **Attribution:** Multi-Channel-Funnels für komplexe Customer Journeys

**Ready to track! 🚀**

