// Toggle Learn More Section
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

// Auto-update End Value as you type
function updateEndValue() {
    const startValue = parseFloat(document.getElementById("startValue").value) || 0;
    const deposits = parseFloat(document.getElementById("deposits").value) || 0;
    const depositFrequency = parseInt(document.getElementById("depositFrequency").value) || 12;
    const interest = parseFloat(document.getElementById("interest").value) || 0;
    const bonus = parseFloat(document.getElementById("bonus").value) || 0;
    const charges = parseFloat(document.getElementById("charges").value) || 0;

    const totalDeposits = deposits * depositFrequency;
    const computedEndValue = startValue + totalDeposits + interest + bonus - charges;
    
    document.getElementById("endValue").value = computedEndValue.toFixed(2);
}

// Main Calculation Function
function calculateULRateOfReturn() {
    const startValue = parseFloat(document.getElementById("startValue").value) || 0;
    const deposits = parseFloat(document.getElementById("deposits").value) || 0;
    const depositFrequency = parseInt(document.getElementById("depositFrequency").value) || 12;
    const interest = parseFloat(document.getElementById("interest").value) || 0;
    const bonus = parseFloat(document.getElementById("bonus").value) || 0;
    const charges = parseFloat(document.getElementById("charges").value) || 0;

    if (!startValue || !interest) {
        document.getElementById("result").innerText = "Please fill Start Value and Interest fields.";
        return;
    }

    const totalDeposits = deposits * depositFrequency;
    const adjustedStartValue = startValue + totalDeposits;

    // Final Calculations
    const totalReturn = ((interest + bonus) / adjustedStartValue * 100).toFixed(2);
    const returnExcludingBonus = (interest / adjustedStartValue * 100).toFixed(2);
    const bonusRate = (bonus / adjustedStartValue * 100).toFixed(2);

    document.getElementById("result").innerHTML = `
        <p>Total Rate of Return: <strong>${totalReturn}%</strong></p>
        <p>Rate of Return (Excluding Bonus): <strong>${returnExcludingBonus}%</strong></p>
        <p>Bonus Interest Percentage: <strong>${bonusRate}%</strong></p>
    `;
}
