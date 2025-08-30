# 🚀 GitHub Pages Setup für HormonCode.com

## 📋 SCHRITT-FÜR-SCHRITT ANLEITUNG

### **1. GitHub Repository erstellen**

1. **Gehen Sie zu GitHub**: https://github.com
2. **Klicken Sie auf "New repository"** (grüner Button)
3. **Repository-Einstellungen**:
   ```
   Repository name: hormoncode-website
   Description: HormonCode - AI-gestützte Hormongesundheit für Frauen 40+
   ☑️ Public (wichtig für GitHub Pages)
   ☐ Add a README file (haben wir schon)
   ☐ Add .gitignore (haben wir schon)
   ☐ Choose a license
   ```
4. **Klicken Sie "Create repository"**

### **2. Code hochladen**

Nach dem Erstellen des Repositories sehen Sie eine Seite mit Anweisungen. **Verwenden Sie diese Befehle** in Ihrem Terminal:

```bash
# Repository URL hinzufügen (ersetzen Sie USERNAME mit Ihrem GitHub Username)
git remote add origin https://github.com/USERNAME/hormoncode-website.git

# Branch umbenennen (falls nötig)
git branch -M main

# Code hochladen
git push -u origin main
```

### **3. GitHub Pages aktivieren**

1. **Gehen Sie zu Ihrem Repository** auf GitHub
2. **Klicken Sie auf "Settings"** (oben rechts)
3. **Scrollen Sie zu "Pages"** (links im Menü)
4. **Source konfigurieren**:
   ```
   Source: Deploy from a branch
   Branch: main
   Folder: / (root)
   ```
5. **Klicken Sie "Save"**
6. **Warten Sie 2-3 Minuten** für Deployment

### **4. Custom Domain konfigurieren**

1. **In GitHub Pages Settings**:
   - Custom domain: `hormoncode.com`
   - ☑️ Enforce HTTPS (aktivieren)
2. **Klicken Sie "Save"**

### **5. Domain DNS konfigurieren**

**Bei Ihrem Domain-Provider (wo Sie hormoncode.com gekauft haben):**

**A Records hinzufügen:**
```
Type: A
Name: @
Value: 185.199.108.153

Type: A  
Name: @
Value: 185.199.109.153

Type: A
Name: @
Value: 185.199.110.153

Type: A
Name: @
Value: 185.199.111.153
```

**CNAME Record für www:**
```
Type: CNAME
Name: www
Value: USERNAME.github.io
```

### **6. Testen**

Nach 10-30 Minuten sollte verfügbar sein:
- ✅ **https://hormoncode.com**
- ✅ **https://www.hormoncode.com**

---

## 🎯 **VERWENDUNG FÜR AWS BEDROCK**

Sobald die Website live ist, können Sie verwenden:

**Company Website URL**: `https://hormoncode.com`

Für Ihre AWS Bedrock Model Requests! 🚀

---

## 🔧 **UPDATES**

Um die Website zu aktualisieren:

```bash
# Änderungen machen
git add .
git commit -m "✨ Update website"
git push
```

Die Website wird automatisch aktualisiert!

---

## 📞 **HILFE**

Bei Problemen:
1. Prüfen Sie GitHub Actions (Repository → Actions)
2. DNS-Änderungen können 24h dauern
3. GitHub Pages Status: Repository → Settings → Pages

**Website ist bereit für professionelle Nutzung!** 🎉
