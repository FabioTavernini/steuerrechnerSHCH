



//Zuschlag:
// Art. 120 Abs. 2 StG:
// 2 Die gemäss Abs. 1 berechnete Steuer erhöht sich bei einer anrechenbaren Besitzesdauer von weniger
// als 6 Monaten um 50 %
// 6 - 12 Monate um 45 %
// 1 - 1½ Jahren um 40 %
// 1½ - 2 Jahren um 35 %
// 2 - 2½ Jahren um 30 %
// 2½ - 3 Jahren um 25 %
// 3 - 3½ Jahren um 20 %
// 3½ - 4 Jahren um 15 %
// 4 - 4½ Jahren um 10 %
// 4½ - 5 Jahren um 5 %


// ermässigung
// 6 Jahren um 5 %
// 7 Jahren um 10 %
// 8 Jahren um 15 %
// 9 Jahren um 20 %
// 10 Jahren um 25 %
// 11 Jahren um 30 %
// 12 Jahren um 35 %
// 13 Jahren um 40 %
// 14 Jahren um 45 %
// 15 Jahren um 50 %
// 16 Jahren um 55 %
// 17 Jahren um 60 %





async function calculatetax(amount, totalmonate) {

    // console.log(amount + " " + years + " " + months)

    // Fetch the JSON data
    const response = await fetch("./tarifs.json");
    const json = await response.json();

    // Round up the amount to the nearest 100
    amount = Math.ceil(amount / 100) * 100;

    console.log("gerundet: " + amount)

    // let totalmonate = months

    // Loop through the JSON data to find a matching amount
    for (const element of json) {
        if (amount == element[0]) {

            steuerschuld = element[1];

            if (totalmonate < 6) { //ZUSCHLAG
                endresult = (parseInt(steuerschuld) + (parseInt(steuerschuld) * 0.5))
            } else if (totalmonate < 12) {
                endresult = (parseInt(steuerschuld) + (parseInt(steuerschuld) * 0.45))
            } else if (totalmonate < 18) {
                endresult = (parseInt(steuerschuld) + (parseInt(steuerschuld) * 0.4))
            } else if (totalmonate < 24) {
                endresult = (parseInt(steuerschuld) + (parseInt(steuerschuld) * 0.35))
            } else if (totalmonate < 30) {
                endresult = (parseInt(steuerschuld) + (parseInt(steuerschuld) * 0.3))
            } else if (totalmonate < 36) {
                endresult = (parseInt(steuerschuld) + (parseInt(steuerschuld) * 0.25))
            } else if (totalmonate < 42) {
                endresult = (parseInt(steuerschuld) + (parseInt(steuerschuld) * 0.2))
            } else if (totalmonate < 48) {
                endresult = (parseInt(steuerschuld) + (parseInt(steuerschuld) * 0.15))
            } else if (totalmonate < 54) {
                endresult = (parseInt(steuerschuld) + (parseInt(steuerschuld) * 0.1))
            } else if (totalmonate < 60) {
                endresult = (parseInt(steuerschuld) + (parseInt(steuerschuld) * 0.05))
            } else if (totalmonate < 72) { //ERMÄSSIGUNG ab 6 vollen Jahren
                endresult = (parseInt(steuerschuld) - (parseInt(steuerschuld) * 0.00))
            } else if (totalmonate < 84) {
                endresult = (parseInt(steuerschuld) - (parseInt(steuerschuld) * 0.05))
            } else if (totalmonate < 96) {
                endresult = (parseInt(steuerschuld) - (parseInt(steuerschuld) * 0.10))
            } else if (totalmonate < 108) {
                endresult = (parseInt(steuerschuld) - (parseInt(steuerschuld) * 0.15))
            } else if (totalmonate < 120) {
                endresult = (parseInt(steuerschuld) - (parseInt(steuerschuld) * 0.20))
            } else if (totalmonate < 132) {
                endresult = (parseInt(steuerschuld) - (parseInt(steuerschuld) * 0.25))
            } else if (totalmonate < 144) {
                endresult = (parseInt(steuerschuld) - (parseInt(steuerschuld) * 0.30))
            } else if (totalmonate < 156) {
                endresult = (parseInt(steuerschuld) - (parseInt(steuerschuld) * 0.35))
            } else if (totalmonate < 168) {
                endresult = (parseInt(steuerschuld) - (parseInt(steuerschuld) * 0.40))
            } else if (totalmonate < 180) {
                endresult = (parseInt(steuerschuld) - (parseInt(steuerschuld) * 0.45))
            } else if (totalmonate < 192) {
                endresult = (parseInt(steuerschuld) - (parseInt(steuerschuld) * 0.5))
            } else if (totalmonate < 204) {
                endresult = (parseInt(steuerschuld) - (parseInt(steuerschuld) * 0.55))
            } else if (totalmonate >= 204) {
                endresult = (parseInt(steuerschuld) - (parseInt(steuerschuld) * 0.60))
            }

            endresult = (Math.round(endresult / 0.05) * 0.05).toFixed(2) // Auf 5 Rappen runden

            console.log(totalmonate)
            console.log(endresult)

            return endresult; // Return the corresponding value if a match is found
        }
    }
    return "#Fehler bei der Berechnung#"; // Default return if no match is found
}
