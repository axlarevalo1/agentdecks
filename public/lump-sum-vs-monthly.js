// Syncing and Calculation Function
function syncInvestment() {
    const monthlyInvestment = parseFloat(document.getElementById("monthlyInvestment").value) || 0;
    const rate = parseFloat(document.getElementById("loanInterestRate").value) / 100;
    const term = parseInt(document.getElementById("loanTerm").value);
    const years = parseFloat(document.getElementById("investmentYears").value) || 0;

    // Sync Monthly Loan Obligation with Monthly Investment
    document.getElementById("monthlyLoan").value = monthlyInvestment;

    // Calculate Total Investment Loan (Principal) Dynamically
    let loanPrincipal = 0;
    if (term === 0) {
        // Interest Only Loan: Principal is the total of monthly payments over the years
        loanPrincipal = monthlyInvestment * 12 * years;
    } else {
        // Amortized Loan Calculation (Principal derived from monthly payments)
        const monthlyRate = rate / 12;
        const totalPayments = term * 12;
        loanPrincipal = (monthlyInvestment * (1 - Math.pow(1 + monthlyRate, -totalPayments))) / monthlyRate;
    }

    // Auto-populate Initial Investment and Total Investment Loan
    document.getElementById("investmentLoan").value = loanPrincipal.toFixed(2);
    document.getElementById("initialInvestment").value = loanPrincipal.toFixed(2);
    document.getElementById("lumpSumRate").value = document.getElementById("rateOfReturn").value;

    calculateInvestments();
}

// Calculation of Investments
function calculateInvestments() {
    const monthlyInvestment = parseFloat(document.getElementById("monthlyInvestment").value) || 0;
    const rateOfReturn = parseFloat(document.getElementById("rateOfReturn").value) / 100;
    const years = parseFloat(document.getElementById("investmentYears").value) || 0;
    const initialInvestment = parseFloat(document.getElementById("initialInvestment").value) || 0;

    // Calculate Monthly Investment Compound Balance
    let monthlyBalance = 0;
    for (let i = 0; i < years * 12; i++) {
        monthlyBalance = (monthlyBalance + monthlyInvestment) * (1 + rateOfReturn / 12);
    }

    // Calculate Lump-Sum Investment Compound Growth
    const lumpSumBalance = initialInvestment * Math.pow(1 + rateOfReturn, years);

    // Calculate Loan Balance (Interest-Only or Amortized)
    const loanPrincipal = initialInvestment;
    const loanInterestRate = parseFloat(document.getElementById("loanInterestRate").value) / 100;
    const loanTerm = parseInt(document.getElementById("loanTerm").value);
    let loanBalance = loanPrincipal;

    if (loanTerm === 0) {
        // Interest-Only: Loan Balance remains the same
        loanBalance = loanPrincipal;
    } else {
        // Amortized Loan Calculation
        const monthlyRate = loanInterestRate / 12;
        const totalPayments = loanTerm * 12;
        const monthlyLoanPayment = (loanPrincipal * monthlyRate) / (1 - Math.pow(1 + monthlyRate, -totalPayments));
        loanBalance = loanPrincipal;

        for (let i = 0; i < years * 12; i++) {
            loanBalance = (loanBalance * (1 + monthlyRate)) - monthlyLoanPayment;
        }
        loanBalance = Math.max(0, loanBalance);
    }

    // Calculate Net Equity
    const netEquity = lumpSumBalance - loanBalance;

    // Display Results with Proper Formatting
    document.getElementById("monthlyBalanceResult").innerText = formatCurrency(monthlyBalance);
    document.getElementById("lumpSumBalanceResult").innerText = formatCurrency(lumpSumBalance);
    document.getElementById("loanBalanceResult").innerText = formatCurrency(loanBalance);
    document.getElementById("netEquityResult").innerText = formatCurrency(netEquity);
}

// Function to Format Numbers with Commas
function formatCurrency(value) {
    return `$${value.toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, ",")}`;
}

// Auto-sync when values change
document.getElementById("monthlyInvestment").addEventListener("input", syncInvestment);
document.getElementById("loanInterestRate").addEventListener("input", syncInvestment);
document.getElementById("loanTerm").addEventListener("change", syncInvestment);
document.getElementById("rateOfReturn").addEventListener("input", syncInvestment);
document.getElementById("investmentYears").addEventListener("input", syncInvestment);
