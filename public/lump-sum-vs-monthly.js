function syncInvestment() {
    const monthlyInvestment = parseFloat(document.getElementById("monthlyInvestment").value) || 0;
    const rate = parseFloat(document.getElementById("loanInterestRate").value) / 100;
    const term = parseInt(document.getElementById("loanTerm").value);
    const years = parseFloat(document.getElementById("investmentYears").value) || 0;

    document.getElementById("monthlyLoan").value = monthlyInvestment;

    if (term === 0) {
        document.getElementById("investmentLoan").value = (monthlyInvestment * 12 * years).toFixed(2);
    } else {
        const monthlyRate = rate / 12;
        const totalPayments = term * 12;
        const loanPrincipal = (monthlyInvestment * (1 - Math.pow(1 + monthlyRate, -totalPayments))) / monthlyRate;
        document.getElementById("investmentLoan").value = loanPrincipal.toFixed(2);
    }

    calculateInvestments();
}

function calculateInvestments() {
    const monthlyInvestment = parseFloat(document.getElementById("monthlyInvestment").value) || 0;
    const rateOfReturn = parseFloat(document.getElementById("rateOfReturn").value) / 100;
    const years = parseFloat(document.getElementById("investmentYears").value) || 0;
    const loanPrincipal = parseFloat(document.getElementById("investmentLoan").value) || 0;

    // Monthly Investment Calculation
    let monthlyBalance = 0;
    for (let i = 0; i < years * 12; i++) {
        monthlyBalance = (monthlyBalance + monthlyInvestment) * (1 + rateOfReturn / 12);
    }

    // Lump-Sum Investment Calculation
    let lumpSumBalance = loanPrincipal * Math.pow(1 + rateOfReturn, years);
    const loanBalance = loanPrincipal;
    const netEquity = lumpSumBalance - loanBalance;

    // Display Results with Commas
    document.getElementById("monthlyBalanceResult").innerText = formatCurrency(monthlyBalance);
    document.getElementById("lumpSumBalanceResult").innerText = formatCurrency(lumpSumBalance);
    document.getElementById("loanBalanceResult").innerText = formatCurrency(loanBalance);
    document.getElementById("netEquityResult").innerText = formatCurrency(netEquity);
}

// Function to Format Numbers with Commas
function formatCurrency(value) {
    return `$${value.toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, ",")}`;
}
