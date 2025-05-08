function syncInvestment() {
    const monthlyInvestment = parseFloat(document.getElementById("monthlyInvestment").value) || 0;
    const rate = parseFloat(document.getElementById("loanInterestRate").value) / 100;
    const term = parseInt(document.getElementById("loanTerm").value);
    const years = parseFloat(document.getElementById("investmentYears").value) || 0;

    document.getElementById("monthlyLoan").value = monthlyInvestment;
    document.getElementById("lumpSumRate").value = document.getElementById("rateOfReturn").value;

    if (term === 0) {
        document.getElementById("investmentLoan").value = (monthlyInvestment * 12 * years).toFixed(2);
    } else {
        const monthlyRate = rate / 12;
        const totalPayments = term * 12;
        const loanPrincipal = (monthlyInvestment * (1 - Math.pow(1 + monthlyRate, -totalPayments))) / monthlyRate;
        document.getElementById("investmentLoan").value = loanPrincipal.toFixed(2);
    }

    document.getElementById("initialInvestment").value = document.getElementById("investmentLoan").value;
    calculateInvestments();
}

function calculateInvestments() {
    const initialInvestment = parseFloat(document.getElementById("initialInvestment").value) || 0;
    const rateOfReturn = parseFloat(document.getElementById("rateOfReturn").value) / 100;
    const years = parseFloat(document.getElementById("investmentYears").value) || 0;

    const lumpSumBalance = initialInvestment * Math.pow(1 + rateOfReturn, years);
    document.getElementById("lumpSumBalanceResult").innerText = formatCurrency(lumpSumBalance);
}

// Function to Format Numbers with Commas
function formatCurrency(value) {
    return `$${value.toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, ",")}`;
}
