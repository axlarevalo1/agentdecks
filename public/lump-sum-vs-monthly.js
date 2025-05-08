function syncInvestment() {
    const monthlyInvestment = parseFloat(document.getElementById("monthlyInvestment").value) || 0;
    const rate = parseFloat(document.getElementById("loanInterestRate").value) / 100;
    const term = parseInt(document.getElementById("loanTerm").value);
    const years = parseFloat(document.getElementById("investmentYears").value) || 0;

    document.getElementById("monthlyLoan").value = monthlyInvestment;

    if (term === 0) {
        // Interest Only Loan - Principal is total monthly payments
        document.getElementById("investmentLoan").value = (monthlyInvestment * 12 * years).toFixed(2);
    } else {
        // Amortized Loan Calculation (Principal derived from monthly payments)
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

    // Monthly Investment Calculation with Compound Interest
    let monthlyBalance = 0;
    for (let i = 0; i < years * 12; i++) {
        monthlyBalance = (monthlyBalance + monthlyInvestment) * (1 + rateOfReturn / 12);
    }

    // Lump-Sum Investment Calculation (Principal Grows at Same Rate of Return)
    const lumpSumBalance = loanPrincipal * Math.pow(1 + rateOfReturn, years);

    // Loan Balance Calculation (Interest-Only or Amortized)
    let loanBalance = loanPrincipal;
    const loanInterestRate = parseFloat(document.getElementById("loanInterestRate").value) / 100;
    const loanTerm = parseInt(document.getElementById("loanTerm").value);

    if (loanTerm === 0) {
        // Interest-Only Loan: Principal remains the same
        loanBalance = loanPrincipal;
    } else {
        // Amortized Loan Calculation
        const monthlyRate = loanInterestRate / 12;
        const totalPayments = loanTerm * 12;
        const monthlyLoanPayment = (loanPrincipal * monthlyRate) / (1 - Math.pow(1 + monthlyRate, -totalPayments));
        loanBalance = 0;

        for (let i = 0; i < years * 12; i++) {
            loanBalance = (loanBalance + monthlyLoanPayment) * (1 + loanInterestRate / 12) - monthlyLoanPayment;
        }
        loanBalance = Math.max(0, loanBalance);
    }

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
