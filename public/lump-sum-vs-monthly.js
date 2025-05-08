// Synchronize Monthly Investment to Loan Amount
function syncInvestment() {
    const monthlyInvestment = parseFloat(document.getElementById("monthlyInvestment").value) || 0;
    const years = parseFloat(document.getElementById("investmentYears").value) || 0;

    document.getElementById("monthlyLoan").value = monthlyInvestment;
    document.getElementById("investmentLoan").value = (monthlyInvestment * 12 * years).toFixed(2);
    calculateInvestments();
}

// Calculate Investments
function calculateInvestments() {
    const monthlyInvestment = parseFloat(document.getElementById("monthlyInvestment").value) || 0;
    const rateOfReturn = parseFloat(document.getElementById("rateOfReturn").value) / 100;
    const years = parseFloat(document.getElementById("investmentYears").value) || 0;
    const loanInterestRate = parseFloat(document.getElementById("loanInterestRate").value) / 100;
    const loanTerm = parseInt(document.getElementById("loanTerm").value);

    // Monthly Investment Calculation
    let monthlyBalance = 0;
    for (let i = 0; i < years * 12; i++) {
        monthlyBalance = (monthlyBalance + monthlyInvestment) * (1 + rateOfReturn / 12);
    }

    // Lump Sum Investment Calculation
    const lumpSumInvestment = monthlyInvestment * 12 * years;
    let lumpSumBalance = lumpSumInvestment * Math.pow(1 + rateOfReturn, years);
    let loanBalance = lumpSumInvestment; // Default interest-only

    if (loanTerm === 0) {
        // Interest Only Calculation
        loanBalance = lumpSumInvestment;
    } else {
        // Amortizing Loan Calculation
        const monthlyRate = loanInterestRate / 12;
        const totalPayments = loanTerm * 12;
        const monthlyLoanPayment = (lumpSumInvestment * monthlyRate) / (1 - Math.pow(1 + monthlyRate, -totalPayments));
        loanBalance = 0;

        for (let i = 0; i < years * 12; i++) {
            loanBalance = (loanBalance + monthlyLoanPayment) * (1 + loanInterestRate / 12) - monthlyLoanPayment;
        }
        loanBalance = Math.max(0, loanBalance); // Prevent negative loan balance
    }

    const netEquity = lumpSumBalance - loanBalance;

    // Display Results
    document.getElementById("monthlyBalanceResult").innerText = `$${monthlyBalance.toFixed(2)}`;
    document.getElementById("lumpSumBalanceResult").innerText = `$${lumpSumBalance.toFixed(2)}`;
    document.getElementById("loanBalanceResult").innerText = `$${loanBalance.toFixed(2)}`;
    document.getElementById("netEquityResult").innerText = `$${netEquity.toFixed(2)}`;
}

// Auto-calculate whenever interest rate or loan term is changed
document.getElementById("loanTerm").addEventListener("change", calculateInvestments);
document.getElementById("loanInterestRate").addEventListener("input", calculateInvestments);
