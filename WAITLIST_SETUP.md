# 🎯 HormonCode Waitlist System

## 📋 Überblick

Die Landing Page wurde um ein professionelles Waitlist-System erweitert, mit dem sich interessierte Frauen für den Beta-Zugang registrieren können.

## ✨ Features

### Frontend (Landing Page):
- ✅ **Modernes Warteliste-Formular** mit Validierung
- ✅ **Responsive Design** für alle Geräte
- ✅ **Animierte Statistiken** (Wartelisten-Counter)
- ✅ **Echzeit-Feedback** (Success/Error Messages)
- ✅ **Benutzerfreundliche UX** mit Loading-States
- ✅ **Analytics-Integration** (Google Analytics ready)
- ✅ **Offline-Fallback** (localStorage backup)

### Backend API:
- ✅ **RESTful API** für Warteliste-Management
- ✅ **Email-Validierung** und Duplikat-Prüfung
- ✅ **Daten-Export** (CSV für Admin)
- ✅ **Statistiken** (Anmeldungen, Demografie)
- ✅ **Sicherheit** (CORS, Rate Limiting, Input Validation)
- ✅ **Logging** und Monitoring

## 🚀 Quick Start

### 1. Backend starten:

```bash
cd /Users/tabeawidmer/Desktop/hormoncode-website
npm install
npm start
```

Backend läuft auf: `http://localhost:3002`

### 2. Landing Page öffnen:

Die Landing Page (`index.html`) kann direkt im Browser geöffnet werden oder über einen lokalen Server:

```bash
# Mit Python (einfach)
python3 -m http.server 8080

# Mit Node.js
npx serve .
```

### 3. Testen:

1. **Formular ausfüllen** und absenden
2. **Success Message** erscheint
3. **Wartelisten-Counter** erhöht sich
4. **Daten werden gespeichert** in `waitlist-data.json`

## 📊 API Endpunkte

### POST `/api/waitlist`
Fügt eine Person zur Warteliste hinzu.

**Request:**
```json
{
  "email": "anna@example.com",
  "firstName": "Anna",
  "age": "40-44",
  "interests": "hormone-balance",
  "newsletter": true,
  "source": "landing-page"
}
```

**Response (Success):**
```json
{
  "success": true,
  "message": "Successfully added to waitlist",
  "data": {
    "id": "abc123...",
    "email": "anna@example.com",
    "firstName": "Anna",
    "position": 248,
    "signupDate": "2024-08-31T12:00:00.000Z"
  }
}
```

### GET `/api/waitlist/stats`
Liefert Wartelisten-Statistiken.

**Response:**
```json
{
  "success": true,
  "stats": {
    "totalSignups": 247,
    "signupsToday": 12,
    "signupsThisWeek": 89,
    "ageDistribution": {
      "40-44": 65,
      "45-49": 82,
      "50-54": 71
    },
    "interestDistribution": {
      "hormone-balance": 123,
      "weight-management": 87,
      "energy-boost": 37
    }
  }
}
```

### GET `/api/waitlist/export?key=admin_key`
Exportiert Warteliste als CSV (Admin-only).

## 📁 Datenstruktur

```json
[
  {
    "id": "abc123def456...",
    "email": "anna@example.com",
    "firstName": "Anna",
    "age": "40-44",
    "interests": "hormone-balance",
    "newsletter": true,
    "source": "landing-page",
    "signupDate": "2024-08-31T12:00:00.000Z",
    "ipAddress": "192.168.1.1",
    "userAgent": "Mozilla/5.0..."
  }
]
```

## 🔒 Sicherheit

- **Input Validation** für alle Felder
- **Email Format Validation**
- **Duplikat-Prüfung** (keine doppelten Emails)
- **CORS-Konfiguration** für erlaubte Domains
- **Admin-Key** für sensitive Endpunkte
- **IP-Logging** für Tracking

## 📈 Analytics & Tracking

Das System ist vorbereitet für:
- **Google Analytics** Events
- **Mixpanel** Tracking
- **Custom Analytics** Lösungen

Events werden getrackt:
- `waitlist_signup` - Erfolgreiche Anmeldung
- `form_error` - Fehler beim Ausfüllen
- `email_duplicate` - Bereits registrierte Email

## 🚢 Deployment Optionen

### Option 1: Vercel (Empfohlen)
```bash
# Vercel CLI installieren
npm i -g vercel

# Projekt deployen
vercel
```

### Option 2: Netlify Functions
```bash
# Netlify CLI
npm i -g netlify-cli

# Deploy
netlify deploy
```

### Option 3: Heroku
```bash
# Heroku CLI
heroku create hormoncode-waitlist
git push heroku main
```

### Option 4: DigitalOcean/AWS
Standard Node.js Deployment mit PM2 oder Docker.

## 📧 Email-Integration (Next Steps)

Für automatische Bestätigungs-Emails integrieren:

### Option 1: SendGrid
```javascript
const sgMail = require('@sendgrid/mail');
sgMail.setApiKey(process.env.SENDGRID_API_KEY);

const sendWelcomeEmail = async (email, firstName) => {
  const msg = {
    to: email,
    from: 'hello@hormoncode.com',
    subject: 'Willkommen auf der HormonCode Warteliste! 🎉',
    html: generateWelcomeEmailHTML(firstName)
  };
  await sgMail.send(msg);
};
```

### Option 2: Mailchimp
```javascript
const mailchimp = require('@mailchimp/mailchimp_marketing');

const addToMailchimp = async (email, firstName) => {
  await mailchimp.lists.addListMember(LIST_ID, {
    email_address: email,
    status: 'subscribed',
    merge_fields: {
      FNAME: firstName
    }
  });
};
```

## 🎯 Conversion Optimierung

### A/B Testing bereit:
- **Formular-Varianten** (Felder, Copy, Design)
- **CTA-Buttons** (Text, Farbe, Position)
- **Social Proof** (Testimonials, Zahlen)

### Analytics Setup:
```javascript
// Google Analytics 4
gtag('config', 'GA_MEASUREMENT_ID', {
  custom_map: { 'custom_parameter_1': 'waitlist_source' }
});

// Conversion Tracking
gtag('event', 'conversion', {
  'send_to': 'AW-CONVERSION_ID/CONVERSION_LABEL',
  'value': 1.0,
  'currency': 'EUR'
});
```

## 🔄 Migration zu Full Backend

Wenn das System wächst, Migration zum HormonCode AI Agent Backend:

1. **User-Tabelle erweitern** um Waitlist-Flag
2. **Automatische Account-Erstellung** bei Beta-Launch
3. **Email-Benachrichtigungen** über API
4. **Admin-Dashboard** in der Hauptapp

## 📞 Support

Bei Fragen oder Problemen:
- **Email:** hello@hormoncode.com
- **Logs:** Siehe `console.log` Output
- **Daten:** Gespeichert in `waitlist-data.json`

Das Waitlist-System ist produktionsbereit und kann sofort für User-Testing eingesetzt werden! 🚀

