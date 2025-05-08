// public/ul-rate-of-return.js
function calculateULRateOfReturn() {
    const startValue = parseFloat(document.getElementById("startValue").value);
    const deposits = parseFloat(document.getElementById("deposits").value) || 0;
    const depositFrequency = parseInt(document.getElementById("depositFrequency").value);
    const interest = parseFloat(document.getElementById("interest").value);
    const bonus = parseFloat(document.getElementById("bonus").value) || 0;
    const annualCharges = parseFloat(document.getElementById("charges").value);
    const endValue = parseFloat(document.getElementById("endValue").value);

    if (isNaN(startValue) || isNaN(deposits) || isNaN(interest) || isNaN(annualCharges) || isNaN(endValue)) {
        document.getElementById("result").innerText = "Please fill in all fields correctly.";
        return;
    }

    // Calculate monthly charges
    const monthlyCharge = annualCharges / 12;
    const totalDeposits = deposits * depositFrequency;
    let balance = startValue;
    let totalCharges = 0;

    // Monthly Calculation Loop
    for (let month = 1; month <= 12; month++) {
        // Apply monthly charges
        balance -= monthlyCharge;
        totalCharges += monthlyCharge;

        // Apply periodic deposits based on selected frequency
        if ((month % (12 / depositFrequency)) === 0) {
            balance += deposits;
        }
    }

    // Add interest at the end of the year
    balance += interest;

    // Add bonus at the end of the year
    balance += bonus;

    // Calculations
    const adjustedStartValue = startValue + totalDeposits - totalCharges;
    const totalReturn = ((endValue - adjustedStartValue + totalCharges) / adjustedStartValue) * 100;
    const returnExcludingBonus = ((interest + totalCharges) / adjustedStartValue) * 100;
    const bonusRate = (bonus / adjustedStartValue) * 100;

    document.getElementById("result").innerHTML = `
        <p>Total Rate of Return: <strong>${totalReturn.toFixed(2)}%</strong></p>
        <p>Rate of Return (Excluding Bonus): <strong>${returnExcludingBonus.toFixed(2)}%</strong></p>
        <p>Bonus Interest Percentage: <strong>${bonusRate.toFixed(2)}%</strong></p>
        <p><small>Total Charges Deducted: $${totalCharges.toFixed(2)}</small></p>
    `;
}
