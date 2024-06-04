
# Taktikarten-Generator Dokumentation

## Projektstruktur

```
interactive_dso/
├── assets/
│   ├── icons/
│   ├── maps/
│   ├── images/
│   │   ├── general/
│   │   ├── units/
│   ├── styles/
│   │   ├── main.css
│   │   ├── reset.css
├── data/
│   ├── generals.json
│   ├── units.json
│   ├── map_loader.json
│   ├── maps.json
├── scripts/
│   ├── main.js
│   ├── marker.js
│   ├── attack_waves.js
│   ├── generals.js
│   ├── units.js
├── index.html
```

## Funktionen und ihre Aufgaben

### index.html
- Enthält die Grundstruktur der Webseite.
- Lädt die benötigten CSS- und JavaScript-Dateien.
- Definiert die Hauptcontainer für die Karte, die Dropdown-Menüs und die Liste der Lager.

### main.css
- Stellt das Styling der Webseite sicher.
- Enthält Layout- und Design-Anweisungen für die Karte, Dropdown-Menüs, Buttons und andere HTML-Elemente.

### main.js
- Lädt und zeigt die Karten basierend auf der Auswahl im Dropdown-Menü.
- Lädt und zeigt die Abenteuerdetails basierend auf der ausgewählten Karte.
- Validiert die Benutzereingaben.
- Exportiert und importiert die Konfigurationen.
- Generiert die finale Taktikkarte und ermöglicht das Herunterladen.

### marker.js
- Ermöglicht das Hinzufügen von Markern auf der Karte.
- Ermöglicht das Entfernen von Markern.
- Aktualisiert die Liste der Lager basierend auf den gesetzten Markern.

### attack_waves.js
- Stellt die Optionen für die Anzahl der Angriffswellen bereit.
- Lädt und zeigt die Generäle und Einheiten für jede Angriffswelle.
- Validiert die Auswahl der Generäle und Einheiten.

### generals.js
- Lädt und zeigt die verfügbaren Generäle basierend auf den Daten in `generals.json`.
- Stellt sicher, dass die Generäle korrekt in den Dropdown-Menüs angezeigt werden.

### units.js
- Lädt und zeigt die verfügbaren Einheiten basierend auf den Daten in `units.json`.
- Stellt sicher, dass die Einheiten korrekt in den Dropdown-Menüs angezeigt werden.

### reset.css
- Setzt die Standard-Stile für HTML-Elemente zurück, um eine konsistente Basis für das Design zu schaffen.

## Detaillierte Erklärung der Funktionen

### index.html
- **Header**: Enthält Meta-Tags und Links zu den CSS-Dateien.
- **Body**:
  - **Container**: Hauptcontainer für die Taktikkarte und die Steuerungselemente.
  - **Map Container**: Enthält das Bild der aktuellen Karte.
  - **Controls**: Enthält das Dropdown-Menü zum Auswählen der Abenteuerkarte und den Bereich für die Abenteuerdetails.
  - **Marker Controls**: Enthält Buttons zum Hinzufügen und Entfernen von Markern.
  - **Lager List**: Listet die gesetzten Marker und die zugehörigen Angriffswellen auf.
  - **Generate Button**: Button zum Generieren und Herunterladen der Taktikkarte.

### main.css
- **Layout**: Stellt das Layout für den Container, die Karte, die Steuerungselemente und die Liste der Lager bereit.
- **Design**: Stellt sicher, dass die Buttons, Dropdown-Menüs und anderen Elemente ein konsistentes Design haben.

### main.js
- **Karten laden**: Lädt die Karten aus `map_loader.json` und füllt das Dropdown-Menü.
- **Kartenwechsel**: Aktualisiert das angezeigte Kartenbild und die Abenteuerdetails basierend auf der Auswahl im Dropdown-Menü.
- **Abenteuerdetails laden**: Lädt die Details der ausgewählten Karte aus `maps.json` und zeigt sie an.
- **Marker hinzufügen/entfernen**: Fügt Marker zur Karte hinzu oder entfernt sie.
- **Validierung**: Überprüft, ob alle erforderlichen Eingaben gemacht wurden.
- **Export/Import**: Exportiert und importiert die Konfigurationen der Marker und Angriffswellen.
- **Karte generieren**: Generiert die finale Taktikkarte und ermöglicht das Herunterladen.

### marker.js
- **Marker hinzufügen**: Fügt Marker auf der Karte hinzu, wenn die Karte angeklickt wird.
- **Marker entfernen**: Entfernt den zuletzt hinzugefügten Marker.
- **Lagerliste aktualisieren**: Aktualisiert die Liste der Lager basierend auf den gesetzten Markern.

### attack_waves.js
- **Angriffswellen anzeigen**: Stellt die Optionen für die Anzahl der Angriffswellen bereit.
- **Generäle und Einheiten laden**: Lädt die verfügbaren Generäle und Einheiten aus `generals.json` und `units.json`.
- **Angriffswellen validieren**: Überprüft, ob für jede Angriffswelle ein General und Einheiten ausgewählt wurden.

### generals.js
- **Generäle laden**: Lädt die verfügbaren Generäle aus `generals.json`.
- **Generäle anzeigen**: Stellt sicher, dass die Generäle in den Dropdown-Menüs korrekt angezeigt werden.

### units.js
- **Einheiten laden**: Lädt die verfügbaren Einheiten aus `units.json`.
- **Einheiten anzeigen**: Stellt sicher, dass die Einheiten in den Dropdown-Menüs korrekt angezeigt werden.

### reset.css
- **Standard-Stile zurücksetzen**: Setzt die Standard-Stile für HTML-Elemente zurück, um eine konsistente Basis für das Design zu schaffen.

## Nächste Schritte

### Schritt 1: HTML-Struktur mit Pico.css erstellen
- Erstelle die grundlegende HTML-Struktur und binde Pico.css ein.
- Definiere die Hauptcontainer für die Taktikkarte, die Dropdown-Menüs und die Lagerliste.

### Schritt 2: CSS-Styling anpassen
- Passe das Styling an, um ein modernes und ansprechendes Design zu gewährleisten.
- Stelle sicher, dass das Layout responsiv ist und auf verschiedenen Geräten gut aussieht.

### Schritt 3: JavaScript-Funktionalität erweitern
- Implementiere die interaktiven Funktionen Schritt für Schritt, beginnend mit dem Laden der Karten und Abenteuerdetails.
- Füge die Logik zum Hinzufügen, Entfernen und Verschieben von Markern hinzu.
- Implementiere die Angriffswellen- und Generäle-Auswahl.
- Füge die Export- und Importfunktionen hinzu.

### Weitere Ideen für die Benutzerfreundlichkeit
- Implementiere Drag-and-Drop für Marker.
- Füge Tooltips und Hilfetexte hinzu.
- Biete eine Dunkelmodus-Option an.
- Verwende Icons und Bilder für Generäle und Einheiten.
