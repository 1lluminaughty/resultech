# resultech.de

Statische Website (HTML/CSS/JS, kein Build-Step, keine Abhängigkeiten außer Google Fonts).

```
index.html                Startseite
styles.css                komplettes Design (auch Blog)
main.js                   Navigation, Reveals, Laptop-/Karussell, Lesefortschritt
blog/index.html           Blog-Übersicht
blog/<artikel>.html       je ein Artikel
```

## Lokal ansehen

```bash
python3 -m http.server 4321
```

Im Ordner `/Users/mathias/bi-hub.de` ausführen, dann http://localhost:4321 öffnen.
Der Verzeichnisname ist noch der alte — inhaltlich steht überall resultech; umbenennen
kannst du ihn jederzeit, es hängt nichts daran.

`index.html` direkt per Doppelklick funktioniert auch, nur die Google Fonts brauchen
dann eine Internetverbindung.

## Veröffentlichen

Den Ordnerinhalt in das Web-Root hochladen (`index.html`, `styles.css`, `main.js`,
`blog/`) — mehr ist nicht nötig. Bei Netlify oder Vercel
genügt es, den Ordner hineinzuziehen; ein Build-Kommando ist nicht erforderlich.

## Designprinzip

Helles Thema: warmes Off-White als Fläche (`--paper` #FBFBF9), Karten in Reinweiß mit
weichen Schatten, Text in Near-Black (`--ink` #101215). Die Fläche bleibt **neutral** —
Farbe erscheint ausschließlich dort, wo ein Power-Platform-Produkt gemeint ist.

Jede Produktfarbe existiert in zwei Werten, weil der reine Markenton auf Weiß zu hell
für Text wäre:

| Produkt        | Text / Linien        | Flächen / Diagramme       |
|----------------|----------------------|---------------------------|
| Power BI       | `--bi` #B08704       | `--bi-pure` #F2C811       |
| Power Automate | `--flow` #2563EB     | `--flow-pure` #3E7BFA     |
| Power Apps     | `--apps` #9333EA     | `--apps-pure` #B267E6     |
| Fabric         | `--fabric` #0D8F76   | `--fabric-pure` #2FD3AE   |

Regel: `--x` für alles, was gelesen werden muss. `--x-pure` für Balken, Ringe und die
zarten Farbschleier im Hero und im CTA. Keine weiteren Farben einführen.

Schriften: **Manrope** (400–800; Headlines in 700/800 mit engem Tracking) und
**IBM Plex Mono** für Labels, Zahlen und Codeschnipsel.

## Logo

Das Icon liegt als Inline-SVG in jeder HTML-Datei (`.logo__mark`, sowie einmal als
`.lid__logo` auf der Laptop-Rückseite in `index.html`). Es ist ein **nachgebauter**
Pfad: das abgerundete Quadrat mit ausgestanztem Dreieck und Eckquadrat, per
`fill-rule="evenodd"`. Weil die Formen ausgestanzt sind statt weiß gefüllt, funktioniert
das Icon auf jedem Hintergrund und färbt sich über `currentColor`.

Wenn die Original-SVG vorliegt: Datei als `logo.svg` ablegen und den `<svg>`-Block in
allen fünf HTML-Dateien dagegen tauschen (oder `<img src="logo.svg" alt="">` verwenden —
dann entfällt allerdings die automatische Farbanpassung). Die Wortmarke ist echter Text
in Manrope 700 (`.logo__word`); liegt die Originalschrift des Logos vor, gehört sie dort
hinein.

## Was noch ausgetauscht werden muss

* **Kontaktdaten** — `hallo@resultech.de` und `+49 000 000 000` (Platzhalter) in der
  CTA-Sektion und im Footer jeder Seite.
* **Referenzen** — das Zitat der „Leitung Controlling" und die Zahlen unter
  `.voices__stats` sind Beispieltexte. Ebenso die Branchenliste im Hero.
* **Kennzahlen** — die Werte in `.levers__chips` (318 h, 6 Wochen …) durch eigene
  belegbare Zahlen ersetzen.
* **Impressum / Datenschutz** — im Footer als `href="#"` angelegt und zu verlinken.
* Die Inhalte in den vier Laptop-Screens (Umsätze, Flow-Schritte, Auftragsliste) sind
  bewusst realistisch erfundene Demo-Daten. Sie stellen keine Kundendaten dar.

## Blog

Bewusst ohne Generator: jeder Artikel ist eine eigene HTML-Datei. Solange es unter
etwa zwanzig Beiträge bleibt, ist das die wartungsärmste Lösung — kein Build, keine
Abhängigkeiten, die veralten.

### Neuen Artikel anlegen

1. Eine bestehende Artikeldatei in `blog/` kopieren und umbenennen. Der Dateiname ist
   die URL, also sprechend und klein schreiben: `blog/dax-oder-power-query.html`.
2. Im `<body style="--a:var(--bi)">` die Akzentfarbe auf das Thema setzen
   (`--bi`, `--flow`, `--apps`, `--fabric`). Sie färbt Kategorie, Listenpunkte,
   Callout-Kante und Lesefortschritt in einem Zug.
3. `<title>`, `<meta name="description">`, Kategorie, Überschrift, Lede und Datum
   ersetzen, dann den Text zwischen `<div class="prose">` schreiben.
4. In `blog/index.html` ein `<li class="post">` ergänzen — **oben**, die Liste ist
   chronologisch absteigend.
5. Optional in `index.html` in der Sektion `.journal` die älteste der drei Teaser-Karten
   austauschen.
6. Am Ende jedes Artikels stehen unter „Weiterlesen" zwei Verweise auf andere Beiträge.
   Die pflegt man mit.

### Bausteine im Lauftext

Innerhalb von `<div class="prose">` stehen zur Verfügung: `h2`, `h3`, `p`, `ul`, `ol`
(nummeriert mit führender Null), `blockquote` (groß, fett), `hr`, `code` und:

```html
<div class="callout">
  <span class="callout__k">Überschrift des Kastens</span>
  <p>Der Merksatz.</p>
</div>

<div class="table-scroll">   <!-- wichtig: Tabellen immer so umschließen,
  <table>…</table>                 sonst scrollt auf dem Handy die ganze Seite -->
</div>

<p class="note">Kleingedruckter Hinweis in Versalien.</p>
```

Die Absatzabstände regelt `.prose > * + *`. Deshalb **kein** `margin` an `p` setzen —
das überschreibt die Regel und die Absätze kleben aneinander.

### Zu den drei bestehenden Artikeln

Sie sind inhaltlich ernst gemeint und fachlich belastbar, aber vor der
Veröffentlichung solltest du prüfen:

* Die Zahlen im Beispiel zum Rechnungsprozess (240 Rechnungen/Woche, 55 €/h) sind
  plausible, aber erfundene Werte. Ersetze sie durch einen echten Fall — oder
  kennzeichne sie als Beispielrechnung.
* Fabric-Preise und Lizenzgrenzen ändern sich mehrmals im Jahr. Der Artikel nennt
  deshalb bewusst keine Eurobeträge für Kapazitäten, verweist aber auf „mehrere Hundert
  Betrachter" als Break-even — das vor Veröffentlichung gegen die aktuelle Preisliste
  halten.
* Die Zeile „Aus der Praxis" in der Meta-Zeile kann durch einen Autorennamen ersetzt
  werden, sobald klar ist, wer zeichnet.

Nav und Footer sind in jeder Datei dupliziert — bei einer Änderung an der Navigation
also in allen fünf HTML-Dateien nachziehen. Ab etwa zwanzig Artikeln lohnt der Umstieg
auf einen Generator (Eleventy oder Astro); dann können Kopf und Fuß in ein Layout
wandern.

## Hero-Animation

Der Ablauf ist an den Scrollfortschritt der Sektion `.showcase` gekoppelt:

1. **0 – 24 %** des Scrollwegs: Der Deckel klappt von −72° auf 0° auf, das Gerät wächst
   leicht, der Bildschirm leuchtet auf.
2. **24 – 96 %**: Die vier Produkt-Screens wechseln durch. Die Schalter unter dem Gerät
   springen bei Klick an die passende Scrollposition.

Justierschrauben:

| Wo | Was |
|----|-----|
| `styles.css` → `.showcase { height: 460vh }` | Länge des Scrollwegs. Kleiner = schneller |
| `styles.css` → `:root { --lw }` | Gerätebreite. Die `vh`-Grenze hält es im Bild |
| `styles.css` → `:root { --open: -72deg }` | Winkel des geschlossenen Deckels |
| `main.js` → `LID_SHUT` | muss zu `--open` passen |
| `main.js` → `OPEN_END` | Anteil des Scrollwegs für das Aufklappen |

Bei `prefers-reduced-motion` steht das Gerät offen, der Sticky-Effekt entfällt und die
Screens werden nur über die Schalter gewechselt.

## Technische Hinweise

* Die Bildschirminhalte skalieren über Container-Query-Einheiten (`cqw`); alle Innenmaße
  sind in `em` gesetzt. Ein Pixel-Fallback ist für ältere Browser hinterlegt.
* Der Laptop ist echtes CSS-3D (`transform-style: preserve-3d`) — keine Bilder, keine
  Videos, keine Bibliothek. Die Vorder- und Rückseite des Deckels sind getrennte Flächen
  mit `backface-visibility: hidden`.
* Bilder gibt es keine: alle Grafiken sind Inline-SVG oder CSS.
