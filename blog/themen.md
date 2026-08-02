# Themenvorrat & Rotation

Diese Datei steuert den Blog-Autopiloten. Sie ist **die** Stelle, an der du Einfluss
nimmst: Themen umsortieren, umformulieren, löschen oder eigene ergänzen. Der Autopilot
nimmt immer das **oberste noch offene** Thema der fälligen Kategorie.

## Rotation

`bi` → `flow` → `apps` → `fabric` → `bi` → …

Die fällige Kategorie wird nicht aus dem Datum berechnet, sondern aus dem neuesten
Beitrag in `blog/index.html` abgeleitet (`data-accent` des ersten `<li class="post">`).
Dadurch bleibt die Reihenfolge auch dann korrekt, wenn ein Lauf ausfällt oder du
zwischendurch selbst einen Artikel schreibst.

## Regeln für den Autopiloten

* Ein Thema pro Lauf. Nach dem Schreiben `- [ ]` → `- [x]` setzen und das Datum ergänzen.
* Ist eine Kategorie leer, das nächste offene Thema der **nachfolgenden** Kategorie
  nehmen und im Lauf-Protokoll unten vermerken.
* Sind weniger als 8 Themen offen, unten unter „Nachschub" fünf neue Vorschläge je
  Kategorie eintragen — **als Vorschlag, nicht als erledigt**, damit du sie prüfen kannst.

---

## Power BI · `bi`

- [ ] **Star-Schema statt einer breiten Tabelle** — warum das Datenmodell die Hälfte aller Performance- und Kennzahlprobleme vorher löst.
- [ ] **CALCULATE verstehen, ohne Filterkontext-Vorlesung** — die drei Fälle, die 90 % der DAX-Arbeit abdecken.
- [ ] **Warum eine Kennzahl in drei Berichten drei Werte hat** — und wie man zu einer Definition kommt, auf die sich alle berufen.
- [ ] **Row-Level-Security, die man in zwei Jahren noch pflegen kann** — Rollen an Organisationsstruktur binden statt an Personen.
- [ ] **Excel-Berichte ablösen: die Reihenfolge, die funktioniert** — warum man mit dem zweitwichtigsten Bericht anfängt.
- [ ] **Berichtsdesign: die drei Fragen, die jede Seite beantworten muss** — gegen Dashboards, die schön sind und niemandem helfen.
- [ ] **Den Performance-Analyzer lesen** — die vier Zahlen, die entscheiden, ob es am Modell oder am Visual liegt.
- [ ] **Inkrementelle Aktualisierung: ab wann sie sich lohnt** — und warum sie ohne Partitionierungskonzept Ärger macht.
- [ ] **Deployment-Pipelines für Berichte** — Dev, Test, Prod ohne manuelles Hochladen.
- [ ] **Measure oder berechnete Spalte?** — eine Entscheidungsregel, die man sich merken kann.
- [ ] **Wenn Nutzer die Zahlen nicht glauben** — Datenqualität sichtbar machen statt verteidigen.
- [ ] **Composite Models** — nützliches Werkzeug oder Einstieg in ein unwartbares Modell.

## Power Automate · `flow`

- [ ] **Fehlerbehandlung: der Aufbau, den jeder produktive Flow braucht** — Scope, Ausführungsbedingung, Benachrichtigung an eine namentlich benannte Person.
- [ ] **Genehmigungen, die nicht im Postfach versanden** — Eskalation, Vertretung, Fristen.
- [ ] **Warum Flows im privaten Konto ein Betriebsrisiko sind** — und wie man sie in Lösungen und Dienstkonten umzieht.
- [ ] **Cloud Flow, Desktop Flow oder gar nichts** — Entscheidung in drei Fragen.
- [ ] **Throttling und Grenzwerte verstehen, bevor sie zuschlagen** — was passiert bei 10.000 Elementen.
- [ ] **AI Builder für Belege: was heute funktioniert und was nicht** — realistische Erwartung an Belegerkennung.
- [ ] **Wann ein Flow eigentlich eine Integration sein müsste** — die Grenze zwischen Automatisierung und Schnittstelle.
- [ ] **Umgebungsvariablen statt hartkodierter Werte** — damit Test und Produktion sich unterscheiden dürfen.
- [ ] **RPA für Altsysteme ohne Schnittstelle** — die ehrliche Einschätzung inklusive Wartungskosten.
- [ ] **Wiederverwendbare Child Flows** — wann Aufteilen hilft und wann es nur verteilt.
- [ ] **Flow-Dokumentation, die nach zwei Jahren noch stimmt** — was rein muss, was man weglassen kann.
- [ ] **Monitoring: welche Kennzahlen wirklich zählen** — Erfolgsquote allein sagt zu wenig.

## Power Apps · `apps`

- [ ] **Canvas oder Model-Driven** — ein Entscheidungsbaum statt einer Featureliste.
- [ ] **Dataverse oder SharePoint als Datenquelle** — Kosten, Grenzen und der Punkt, an dem SharePoint kippt.
- [ ] **Delegation: warum die App nur 500 Zeilen zeigt** — und wie man Abfragen delegierbar hält.
- [ ] **Offlinefähige Apps: das Muster, das trägt** — lokale Sammlung, Warteschlange, sichtbarer Sync-Status.
- [ ] **Formulare, die man nicht hasst** — Feldreihenfolge, Pflichtfelder, Fehlermeldungen.
- [ ] **Barcode und Foto in der Halle** — was auf Firmengeräten wirklich funktioniert.
- [ ] **App-Start unter drei Sekunden** — was den Startbildschirm langsam macht.
- [ ] **Berechtigungen: wer sieht welchen Datensatz** — Dataverse-Sicherheit ohne Überraschungen.
- [ ] **Von der App zur Lösung** — Solutions, Umgebungen und warum man nicht in Produktion baut.
- [ ] **Wann eine Power App die falsche Antwort ist** — drei Fälle, in denen wir davon abraten.
- [ ] **Übergabe an Key-User** — was in zwei Stunden Schulung gehört und was nicht.
- [ ] **Wie viel Power Fx darf in einer App stecken?** — die Grenze zur Unwartbarkeit.

## Microsoft Fabric · `fabric`

- [ ] **Medaillon-Architektur praktisch** — was konkret in Bronze, Silber und Gold gehört.
- [ ] **OneLake Shortcuts statt Datenkopien** — ein Datenstand, mehrere Arbeitsbereiche.
- [ ] **Kapazität planen: von F2 bis F64** — messen statt raten, und wann man pausiert.
- [ ] **Dataflows Gen2 oder Notebook?** — nach Team-Fähigkeiten entscheiden, nicht nach Mode.
- [ ] **Warehouse oder Lakehouse** — und warum die Frage seltener wichtig ist als gedacht.
- [ ] **Kostenkontrolle in Fabric** — Auslastung, Bursting, Glättung: was die Rechnung treibt.
- [ ] **Data Activator für Schwellenwerte** — Benachrichtigung statt täglicher Berichtskontrolle.
- [ ] **Von Azure Synapse zu Fabric** — was migriert wird und was neu gebaut werden muss.
- [ ] **Governance: Domains, Arbeitsbereiche, Namenskonventionen** — der Teil, den alle überspringen.
- [ ] **Semantische Modelle versionieren** — Git-Integration für Berichte.
- [ ] **Copilot in Fabric** — was es heute leistet, wo es Aufsicht braucht.
- [ ] **Datenqualität als eigene Schicht** — Prüfregeln, die im Bericht sichtbar werden.

---

## Nachschub (Vorschläge, noch nicht freigegeben)

_Hier trägt der Autopilot neue Themenvorschläge ein, wenn der Vorrat knapp wird._

---

## Lauf-Protokoll

| Datum | Kategorie | Artikel | Anmerkung |
|-------|-----------|---------|-----------|
| — | — | — | Noch kein automatischer Lauf |
