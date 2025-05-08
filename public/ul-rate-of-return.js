// public/ul-rate-of-return.js
function toggleLearnMore() {
    const learnMoreContent = document.getElementById("learnMoreContent");
    learnMoreContent.classList.toggle("hidden");
}

function calculateULRateOfReturn() {
    const startValue = parseFloat(document.getElementById("startValue").value);
    const deposits = parseFloat(document.getElementById("deposits").value) || 0;
    const depositFrequency = parseInt(document.getElementById("depositFrequency").value);
    const interest = parseFloat(document.getElementById("interest").value);
    const bonus = parseFloat(document.getElementById("bonus").value) || 0;
    const charges = parseFloat(document.getElementById("charges").value);
    const endValue = parseFloat(document.getElementById("endValue").value);

    if (isNaN(startValue) || isNaN(deposits) || isNaN(interest) || isNaN(charges) || isNaN(endValue)) {
        document.getElementById("result").innerText = "Please fill in all fields correctly.";
        return;
    }

    // Total deposits for the year
    const totalDeposits = deposits * depositFrequency;

    // Adjusted start value including total deposits
    const adjustedStartValue = startValue + totalDeposits;

    // Calculations
    const totalReturn = ((endValue - adjustedStartValue + charges) / adjustedStartValue) * 100;
    const returnExcludingBonus = ((interest + charges) / adjustedStartValue) * 100;
    const bonusRate = (bonus / adjustedStartValue) * 100;

    document.getElementById("result").innerHTML = `
        <p>Total Rate of Return: <strong>${totalReturn.toFixed(2)}%</strong></p>
        <p>Rate of Return (Excluding Bonus): <strong>${returnExcludingBonus.toFixed(2)}%</strong></p>
        <p>Bonus Interest Percentage: <strong>${bonusRate.toFixed(2)}%</strong></p>
    `;
}
