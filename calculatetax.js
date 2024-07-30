function showresults(efftax) {

    steuerjahr = document.getElementById('slsteuerjahr').value;
    gemeinde = document.getElementById('slgemeinde').value;
    konfession = document.getElementById('slkonfession').value;

    document.getElementById('lblkantonssteuer').innerText = "Anteil Kantonssteuer"
    document.getElementById('lblgemeindesteuer').innerText = "Anteil Gemeindesteuer "
    document.getElementById('lblkirchensteuer').innerText = "Anteil Kirchensteuer"

    
    document.getElementById('txteinfachesteuer').value = (parseFloat((Math.ceil(efftax * 20) / 20)).toFixed(2));
    document.getElementById('diveinfachesteuer').hidden = false;

    gemeindesteuer = (Math.ceil((efftax * (dataGlobal[steuerjahr].find(item => item.Gemeinde === gemeinde).natPers / 100)) * 20) / 20).toFixed(2)
    kantonssteuer = (Math.ceil((efftax * (dataGlobal[steuerjahr].find(item => item.Gemeinde === "Kanton").natPers / 100)) * 20) / 20).toFixed(2)

    document.getElementById('txtkantonssteuer').value = kantonssteuer;
    document.getElementById('lblkantonssteuer').innerText += (" (" + (dataGlobal[steuerjahr].find(item => item.Gemeinde === "Kanton").natPers) + "%)");
    document.getElementById('divkantonssteuer').hidden = false;

    document.getElementById('txtgemeindesteuer').value = gemeindesteuer;
    document.getElementById('lblgemeindesteuer').innerText += (" (" + (dataGlobal[steuerjahr].find(item => item.Gemeinde === gemeinde).natPers) + "%)");
    document.getElementById('divgemeindesteuer').hidden = false;

    if (konfession != "Andere") {
        selectedGemeinde = dataGlobal[steuerjahr].find(item => item.Gemeinde === gemeinde);
        kirchensteuer = efftax * (selectedGemeinde[konfession] / 100);
        kirchensteuer = (Math.ceil(kirchensteuer * 20) / 20).toFixed(2)

        console.log(selectedGemeinde[konfession])

        document.getElementById('txtkirchensteuer').value = kirchensteuer;
        document.getElementById('lblkirchensteuer').innerText += (" (" + (selectedGemeinde[konfession]) + "%)");
        document.getElementById('divkirchensteuer').hidden = false;

        document.getElementById('txtefftax').value = (parseFloat(kantonssteuer) + parseFloat(gemeindesteuer) + parseFloat(kirchensteuer)).toFixed(2);
        document.getElementById('divtotalsteuer').hidden = false;

    } else {

        document.getElementById('txtkirchensteuer').value = "";
        document.getElementById('divkirchensteuer').hidden = true;

        document.getElementById('txtefftax').value = (parseFloat(kantonssteuer) + parseFloat(gemeindesteuer)).toFixed(2);
        document.getElementById('divtotalsteuer').hidden = false;
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

    return tax;

}


