// public/ul-rate-of-return.js
function toggleLearnMore() {
    const learnMoreContent = document.getElementById("learnMoreContent");
    const learnMoreIcon = document.getElementById("learnMoreIcon");

    if (learnMoreContent.classList.contains("hidden")) {
        learnMoreContent.classList.remove("hidden");
        learnMoreContent.style.maxHeight = learnMoreContent.scrollHeight + "px";
        learnMoreIcon.innerText = "-";
    } else {
        learnMoreContent.style.maxHeight = "0";
        setTimeout(() => {
            learnMoreContent.classList.add("hidden");
            learnMoreIcon.innerText = "+";
        }, 300);
    }
}



// Updated JavaScript (public/ul-rate-of-return.js)
function calculateULRateOfReturn() {
    const startValue = parseFloat(document.getElementById("startValue").value);
    const deposits = parseFloat(document.getElementById("deposits").value) || 0;
    const depositFrequency = parseInt(document.getElementById("depositFrequency").value);
    const interest = parseFloat(document.getElementById("interest").value);
    const bonus = parseFloat(document.getElementById("bonus").value) || 0;
    const charges = parseFloat(document.getElementById("charges").value);

    if (isNaN(startValue) || isNaN(deposits) || isNaN(interest) || isNaN(charges)) {
        document.getElementById("result").innerText = "Please fill in all required fields correctly.";
        return;
    }

    // Calculate total deposits and end value
    const totalDeposits = deposits * depositFrequency;
    const computedEndValue = startValue + totalDeposits + interest + bonus - charges;
    document.getElementById("endValue").value = computedEndValue.toFixed(2);

    // Adjusted start value (initial + deposits)
    const adjustedStartValue = startValue + totalDeposits;

    // Calculate rates
    const totalReturn = ((computedEndValue - adjustedStartValue) / adjustedStartValue) * 100;
    const returnExcludingBonus = ((interest - charges) / adjustedStartValue) * 100;
    const bonusRate = (bonus / adjustedStartValue) * 100;

    // Display results
    document.getElementById("result").innerHTML = `
        <p>Total Rate of Return: <strong>${totalReturn.toFixed(2)}%</strong></p>
        <p>Rate of Return (Excluding Bonus): <strong>${returnExcludingBonus.toFixed(2)}%</strong></p>
        <p>Bonus Interest Percentage: <strong>${bonusRate.toFixed(2)}%</strong></p>
    `;
}
