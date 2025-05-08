// public/sale-vs-refinance.js

// Function to calculate Refinance Proceeds
function calculateRefinance() {
    const propertyValue = parseFloat(document.getElementById("propertyValue").value);
    const ltv = parseFloat(document.getElementById("ltv").value) / 100;
    const currentMortgage = parseFloat(document.getElementById("currentMortgage").value) || 0;
    const mortgagePenalty = parseFloat(document.getElementById("mortgagePenalty").value) || 0;

    // Calculate Maximum Loan Amount
    const maxLoanAmount = propertyValue * ltv;
    document.getElementById("maxLoanAmount").value = maxLoanAmount.toFixed(2);

    // Calculate Proceeds upon Refinance
    const refinanceProceeds = maxLoanAmount - currentMortgage - mortgagePenalty;
    document.getElementById("refinanceProceeds").innerText = `$${refinanceProceeds.toFixed(2)}`;

    // Calculate Monthly Payment (Assume 25-year term, 5% interest for simplicity)
    const annualInterestRate = 5 / 100;
    const monthlyRate = annualInterestRate / 12;
    const totalPayments = 25 * 12;

    const monthlyPayment = maxLoanAmount * (monthlyRate) / 
        (1 - Math.pow(1 + monthlyRate, -totalPayments));

    document.getElementById("monthlyPayment").innerText = `$${monthlyPayment.toFixed(2)}`;
}

// Function to calculate Net Sale Proceeds
function calculateSaleProceeds() {
    const salePrice = parseFloat(document.getElementById("salePrice").value);
    const saleMortgage = parseFloat(document.getElementById("saleMortgage").value) || 0;
    const salePenalty = parseFloat(document.getElementById("salePenalty").value) || 0;
    const realtyFees = parseFloat(document.getElementById("realtyFees").value) || 0;
    const legalFees = parseFloat(document.getElementById("legalFees").value) || 0;
    const adjustments = parseFloat(document.getElementById("adjustments").value) || 0;

    // Calculate Net Sale Proceeds
    const netProceeds = salePrice - saleMortgage - salePenalty - realtyFees - legalFees - adjustments;
    document.getElementById("saleProceeds").innerText = `$${netProceeds.toFixed(2)}`;
}

// Event Listeners for Auto-Calculation
document.getElementById("propertyValue").addEventListener("input", calculateRefinance);
document.getElementById("ltv").addEventListener("change", calculateRefinance);
document.getElementById("currentMortgage").addEventListener("input", calculateRefinance);
document.getElementById("mortgagePenalty").addEventListener("input", calculateRefinance);

document.getElementById("salePrice").addEventListener("input", calculateSaleProceeds);
document.getElementById("saleMortgage").addEventListener("input", calculateSaleProceeds);
document.getElementById("salePenalty").addEventListener("input", calculateSaleProceeds);
document.getElementById("realtyFees").addEventListener("input", calculateSaleProceeds);
document.getElementById("legalFees").addEventListener("input", calculateSaleProceeds);
document.getElementById("adjustments").addEventListener("input", calculateSaleProceeds);
