// public/ul-rate-of-return.js
function calculateULRateOfReturn() {
    const startValue = parseFloat(document.getElementById("startValue").value);
    const interest = parseFloat(document.getElementById("interest").value);
    const bonus = parseFloat(document.getElementById("bonus").value) || 0;
    const charges = parseFloat(document.getElementById("charges").value);
    const endValue = parseFloat(document.getElementById("endValue").value);

    if (isNaN(startValue) || isNaN(interest) || isNaN(charges) || isNaN(endValue)) {
        document.getElementById("result").innerText = "Please fill in all fields correctly.";
        return;
    }

    const totalReturn = ((endValue - startValue + charges) / startValue) * 100;
    const returnExcludingBonus = ((interest + charges) / startValue) * 100;
    const bonusRate = (bonus / startValue) * 100;

    document.getElementById("result").innerHTML = `
        <p>Total Rate of Return: <strong>${totalReturn.toFixed(2)}%</strong></p>
        <p>Rate of Return (Excluding Bonus): <strong>${returnExcludingBonus.toFixed(2)}%</strong></p>
        <p>Bonus Interest Percentage: <strong>${bonusRate.toFixed(2)}%</strong></p>
    `;
}
