# Grundstückgewinnsteuer - Rechner

Ein web-rechner für die Grundstückgewinnsteuer im Kanton Schaffhausen - [Steuerrechner](https://steuerrechner.sh.ch/grundstueckgewinn/) / [Steuerrechner Test](https://steuerrechner-test.sh.ch)

# Funktion
Der Steuerrechner führt alle berechnungen zur Steuer auf Client-Seite aus! - kein Backend o.ä

## Tarifberechnung

Einerseits diente dieses [Kantonsblatt](./docs/sh-de.pdf) zur berechnung der Tarife, anderseits auch [diese Angaben](https://sh.ch/CMS/get/file/b665cf35-ca62-4439-b485-5a7391cd072d) aus dem Merkblatt, was dieser [Tabelle](https://sh.ch/CMS/get/file/ca0d9d0b-64f9-45fc-9754-a186094ed97e) entspricht.

Die Tarife pro gemeinde und Konfession für das Formular werden aus [steuerfuesse.json](./steuerfuesse.json) befüllt.
dieses ist folgendermassen aufgebaut:


```json
{
    "2024": [
        {
            "Gemeinde": "Bargen",
            "natPers": "102",
            "jurPers": "102",
            "evangR": "11",
            "roemK": "13",
            "christK": "12.5"
        },
        {
            "Gemeinde": "Beggingen",
            "natPers": "117",
            "jurPers": "95",
            "evangR": "12",
            "roemK": "15",
            "christK": "12.5"
        }
    ],
    "2023": [
        {
            "Gemeinde": "Bargen",
            "natPers": "104",
            "jurPers": "104",
            "evangR": "11",
            "roemK": "13",
            "christK": "12.5"
        },
```

Danach wird im Javascript [calculatetax.js](./calculatetax.js) die Steuer anhand den Gesetzlichen Limiten berechnet

```javascript
    // definieren von Steuerraten
    const ranges = [
        { limit: 2000, rate: 0.02 },
        { limit: 4000, rate: 0.04 },
        { limit: 6000, rate: 0.06 },
        { limit: 8000, rate: 0.08 },
        { limit: 15000, rate: 0.10 },
        { limit: 30000, rate: 0.12 },
        { limit: 45000, rate: 0.14 },
        { limit: 60000, rate: 0.16 },
        { limit: 80000, rate: 0.18 },
        { limit: 100000, rate: 0.20 }
    ];

    // definieren von zusatzgebühren (Abhängig von besitzdauer in monaten)
    const surcharges = [
        { maxMonths: 6, rate: 0.50 },
        { maxMonths: 12, rate: 0.45 },
        { maxMonths: 18, rate: 0.40 },
        { maxMonths: 24, rate: 0.35 },
        { maxMonths: 30, rate: 0.30 },
        { maxMonths: 36, rate: 0.25 },
        { maxMonths: 42, rate: 0.20 },
        { maxMonths: 48, rate: 0.15 },
        { maxMonths: 54, rate: 0.10 },
        { maxMonths: 60, rate: 0.05 }
    ];

    // rabatte abhängig von besitzdauerJahre
    const discounts = [
        { years: 6, rate: 0.05 },
        { years: 7, rate: 0.10 },
        { years: 8, rate: 0.15 },
        { years: 9, rate: 0.20 },
        { years: 10, rate: 0.25 },
        { years: 11, rate: 0.30 },
        { years: 12, rate: 0.35 },
        { years: 13, rate: 0.40 },
        { years: 14, rate: 0.45 },
        { years: 15, rate: 0.50 },
        { years: 16, rate: 0.55 },
        { years: 17, rate: 0.60 }
    ];
```

## Kontakt
### Steuerverwaltung
- [Informatik Steuerverwaltung](informatik.stv@sh.ch)
- [Markus Schwyn](mailto:markus.schwyn@sh.ch)
- [Nina Blanz](mailto:nina.blanz@sh.ch)

### Informatik Schaffhausen
- [Fabio Tavernini](mailto:Fabio.Tavernini@itsh.ch)
- [Lucas Köppli](mailto:Lucas.Koeppli@itsh.ch)
- [Marco Schirru](mailto:marco.schirru@itsh.ch)