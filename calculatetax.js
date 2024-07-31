function showresults(efftax) {
    let steuerjahr = document.getElementById('slsteuerjahr').value;
    let gemeinde = document.getElementById('slgemeinde').value;
    let konfession = document.getElementById('slkonfession').value;
    let konfessionehepartner = document.getElementById('slkonfessionehe').value;

    let lblKantonssteuer = document.getElementById('lblkantonssteuer');
    let lblGemeindesteuer = document.getElementById('lblgemeindesteuer');
    let lblKirchensteuer = document.getElementById('lblkirchensteuer');
    let txtEinfacheSteuer = document.getElementById('txteinfachesteuer');
    let divEinfacheSteuer = document.getElementById('diveinfachesteuer');
    let txtKantonssteuer = document.getElementById('txtkantonssteuer');
    let divKantonssteuer = document.getElementById('divkantonssteuer');
    let txtGemeindesteuer = document.getElementById('txtgemeindesteuer');
    let divGemeindesteuer = document.getElementById('divgemeindesteuer');
    let txtKirchensteuer = document.getElementById('txtkirchensteuer');
    let divKirchensteuer = document.getElementById('divkirchensteuer');
    let txtEffTax = document.getElementById('txtefftax');
    let divTotalSteuer = document.getElementById('divtotalsteuer');

    lblKantonssteuer.innerText = "Anteil Kantonssteuer";
    lblGemeindesteuer.innerText = "Anteil Gemeindesteuer ";
    lblKirchensteuer.innerText = "Anteil Kirchensteuer";

    txtEinfacheSteuer.value = (parseFloat((Math.ceil(efftax * 20) / 20)).toFixed(2));
    divEinfacheSteuer.hidden = false;

    let gemeindesteuer = (Math.ceil((efftax * (dataGlobal[steuerjahr].find(item => item.Gemeinde === gemeinde).natPers / 100)) * 20) / 20).toFixed(2);
    let kantonssteuer = (Math.ceil((efftax * (dataGlobal[steuerjahr].find(item => item.Gemeinde === "Kanton").natPers / 100)) * 20) / 20).toFixed(2);

    txtKantonssteuer.value = kantonssteuer;
    lblKantonssteuer.innerText += (" (" + (dataGlobal[steuerjahr].find(item => item.Gemeinde === "Kanton").natPers) + "%)");
    divKantonssteuer.hidden = false;

    txtGemeindesteuer.value = gemeindesteuer;
    lblGemeindesteuer.innerText += (" (" + (dataGlobal[steuerjahr].find(item => item.Gemeinde === gemeinde).natPers) + "%)");
    divGemeindesteuer.hidden = false;

    if (konfession != "Andere" || konfessionehepartner != "Andere") {
        let selectedGemeinde = dataGlobal[steuerjahr].find(item => item.Gemeinde === gemeinde);
        let kirchensteuer;
        let kirchensteuerRateText;

        if (konfession === "Andere") {
            kirchensteuer = (efftax / 2 * selectedGemeinde[konfessionehepartner] / 100).toFixed(2);
            kirchensteuerRateText = selectedGemeinde[konfessionehepartner] + "%";
        } else if (konfessionehepartner === "Andere") {
            kirchensteuer = (efftax / 2 * selectedGemeinde[konfession] / 100).toFixed(2);
            kirchensteuerRateText = selectedGemeinde[konfession] + "%";
        } else {
            kirchensteuer = ((efftax / 2 * selectedGemeinde[konfession] / 100) + (efftax / 2 * selectedGemeinde[konfessionehepartner] / 100)).toFixed(2);
            kirchensteuerRateText = selectedGemeinde[konfession] + "% / " + selectedGemeinde[konfessionehepartner] + "%";
        }

        txtKirchensteuer.value = kirchensteuer;
        lblKirchensteuer.innerText += (" (" + kirchensteuerRateText + ")");
        divKirchensteuer.hidden = false;

        txtEffTax.value = (parseFloat(kantonssteuer) + parseFloat(gemeindesteuer) + parseFloat(kirchensteuer)).toFixed(2);
        divTotalSteuer.hidden = false;
    } else {
        txtKirchensteuer.value = "";
        divKirchensteuer.hidden = true;

        txtEffTax.value = (parseFloat(kantonssteuer) + parseFloat(gemeindesteuer)).toFixed(2);
        divTotalSteuer.hidden = false;
    }

}



function calculatetax(amount, totalmonate) {

    let tax = 0;
    let ownershipYears = Math.floor(totalmonate / 12);

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


    for (let i = 0; i < ranges.length; i++) {
        if (amount <= 0) break;

        const { limit, rate } = ranges[i];
        const taxableAmount = Math.min(amount, limit - (i > 0 ? ranges[i - 1].limit : 0));
        tax += taxableAmount * rate;
        amount -= taxableAmount;
    }

    if (amount > 0) {
        tax += amount * 0.15;
    }

    // Apply surcharges for ownership durations less than 5 years

    if (totalmonate < 60) {
        for (let i = 0; i < surcharges.length; i++) {
            if (totalmonate <= surcharges[i].maxMonths) {
                tax *= 1 + surcharges[i].rate;
                break;
            }
        }
    }

    // Apply discounts for ownership durations 6 years or more
    if (ownershipYears >= 6) {
        for (let i = discounts.length - 1; i >= 0; i--) {
            if (ownershipYears >= discounts[i].years) {
                tax *= 1 - discounts[i].rate;
                break;
            }
        }
    }

    return (Math.floor(tax / 100) * 100);

}


