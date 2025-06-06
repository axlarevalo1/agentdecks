// public/sale-vs-refinance.js

// Function to calculate Refinance Proceeds
function calculateRefinance() {
    const propertyValue = parseFloat(document.getElementById("propertyValue").value);
    const ltv = parseFloat(document.getElementById("ltv").value) / 100;
    const term = parseInt(document.getElementById("mortgageTerm").value);
    const interestRate = parseFloat(document.getElementById("interestRate").value) / 100;
    const currentMortgage = parseFloat(document.getElementById("currentMortgage").value) || 0;
    const mortgagePenalty = parseFloat(document.getElementById("mortgagePenalty").value) || 0;

    // Calculate Maximum Loan Amount
    const maxLoanAmount = propertyValue * ltv;
    document.getElementById("maxLoanAmount").value = maxLoanAmount.toFixed(2);

    // Calculate Proceeds upon Refinance
    const refinanceProceeds = maxLoanAmount - currentMortgage - mortgagePenalty;
    document.getElementById("refinanceProceeds").innerText = `$${refinanceProceeds.toLocaleString('en-US', { maximumFractionDigits: 2 })}`;

    // Calculate Monthly Payment based on user-selected Interest Rate
    const monthlyRate = interestRate / 12;
    let monthlyPayment = 0;

    if (term === 0) {
        // Interest Only Calculation
        monthlyPayment = maxLoanAmount * monthlyRate;
    } else {
        // Standard Amortized Payment
        const totalPayments = term * 12;
        monthlyPayment = maxLoanAmount * monthlyRate / (1 - Math.pow(1 + monthlyRate, -totalPayments));
    }

    document.getElementById("monthlyPayment").innerText = `$${monthlyPayment.toFixed(2)}`;
}

// Function to Update Term Options Based on LTV
function updateTermOptions() {
    const ltv = parseFloat(document.getElementById("ltv").value);
    const termSelect = document.getElementById("mortgageTerm");

    termSelect.innerHTML = `
        <option value="15">15 Years</option>
        <option value="20">20 Years</option>
        <option value="25" selected>25 Years</option>
        <option value="30">30 Years</option>
    `;

    // If LTV is 65%, add Interest Only Option
    if (ltv === 0.65) {
        termSelect.innerHTML += `<option value="0">Interest Only</option>`;
    }

    calculateRefinance();
}

// Function to Sync Property Value and Projected Sale Price
function syncValues(event) {
    const source = event.target.id;
    const value = parseFloat(event.target.value) || 0;

    if (source === "propertyValue") {
        document.getElementById("salePrice").value = value;
        calculateSaleProceeds();
    } else if (source === "salePrice") {
        document.getElementById("propertyValue").value = value;
        calculateRefinance();
    }
}

// Function to Sync Mortgage Balance and Penalties
function syncMortgageDetails(event) {
    const source = event.target.id;
    const value = parseFloat(event.target.value) || 0;

    if (source === "currentMortgage") {
        document.getElementById("saleMortgage").value = value;
        calculateSaleProceeds(); // Existing call
    } else if (source === "saleMortgage") {
        document.getElementById("currentMortgage").value = value;
        calculateRefinance();
        calculateSaleProceeds(); // Added this line
    }

    if (source === "mortgagePenalty") {
        document.getElementById("salePenalty").value = value;
        calculateSaleProceeds(); // Existing call
    } else if (source === "salePenalty") {
        document.getElementById("mortgagePenalty").value = value;
        calculateRefinance();
        calculateSaleProceeds(); // Added this line
    }
}

// Add direct listeners for sale-side mortgage inputs
document.getElementById("saleMortgage").addEventListener("input", calculateSaleProceeds);
document.getElementById("salePenalty").addEventListener("input", calculateSaleProceeds);

// Function to update Realty Fees
function updateRealtyFees() {
  const preset = document.getElementById('realtyFeePreset').value;
  const realtyFeesInput = document.getElementById('realtyFees');
  const salePrice = parseFloat(document.getElementById('salePrice').value) || 0;

  if (preset === 'other') {
    realtyFeesInput.disabled = false;
    realtyFeesInput.classList.remove('bg-gray-100');
    realtyFeesInput.value = '';
    realtyFeesInput.placeholder = 'Enter custom fees';
  } else {
    realtyFeesInput.disabled = true;
    realtyFeesInput.classList.add('bg-gray-100');
    let fees = 0;

    switch(preset) {
      case '7+3':
        fees = salePrice <= 100000 ? 
          salePrice * 0.07 : 
          7000 + (salePrice - 100000) * 0.03;
        break;
      case '6':
        fees = salePrice * 0.06;
        break;
      case '5':
        fees = salePrice * 0.05;
        break;
      case '4':
        fees = salePrice * 0.04;
        break;
      case '2':
        fees = salePrice * 0.02;
        break;
    }

    realtyFeesInput.value = fees.toFixed(2);
  }
  calculateSaleProceeds();
}

// Update event listeners to include realty fee updates
document.getElementById("salePrice").addEventListener("input", function(e) {
  syncValues(e);
  updateRealtyFees();
});

// Initialize realty fees on first load
updateRealtyFees();

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
    document.getElementById("saleProceeds").innerText = `$${netProceeds.toLocaleString('en-US', { maximumFractionDigits: 2 })}`;
}

// Event Listeners for Auto-Calculation
document.getElementById("propertyValue").addEventListener("input", syncValues);
document.getElementById("salePrice").addEventListener("input", syncValues);

document.getElementById("ltv").addEventListener("change", updateTermOptions);
document.getElementById("mortgageTerm").addEventListener("change", calculateRefinance);
document.getElementById("interestRate").addEventListener("input", calculateRefinance);

// Syncing Mortgage Balances and Penalties
document.getElementById("currentMortgage").addEventListener("input", syncMortgageDetails);
document.getElementById("saleMortgage").addEventListener("input", syncMortgageDetails);
document.getElementById("mortgagePenalty").addEventListener("input", syncMortgageDetails);
document.getElementById("salePenalty").addEventListener("input", syncMortgageDetails);

// Listeners for Sale Calculator
document.getElementById("realtyFees").addEventListener("input", calculateSaleProceeds);
document.getElementById("legalFees").addEventListener("input", calculateSaleProceeds);
document.getElementById("adjustments").addEventListener("input", calculateSaleProceeds);
document.getElementById("saleMortgage").addEventListener("input", calculateSaleProceeds);
document.getElementById("salePenalty").addEventListener("input", calculateSaleProceeds);
