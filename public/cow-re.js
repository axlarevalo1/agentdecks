document.addEventListener("DOMContentLoaded", function() {
    const homePriceInput = document.getElementById("homePrice");
    const minDownPaymentInput = document.getElementById("minDownPayment");
    const cmhcPremiumInput = document.getElementById("cmhcPremium");
    const mortgageBalanceInput = document.getElementById("mortgageBalance");
    const interestRateInput = document.getElementById("interestRate");
    const monthlyPaymentInput = document.getElementById("monthlyPayment");

    const monthlySavingsInput = document.getElementById("monthlySavings");
    const homeValueIncreaseInput = document.getElementById("homeValueIncrease");
    const mortgageRateChangeInput = document.getElementById("mortgageRateChange");
    const rentInflationInput = document.getElementById("rentInflation");

    const futureHomePriceInput = document.getElementById("futureHomePrice");
    const futureDownPaymentInput = document.getElementById("futureDownPayment");
    const futureMonthlyPaymentInput = document.getElementById("futureMonthlyPayment");
    const totalRentPaidInput = document.getElementById("totalRentPaid");
    const totalInterestPaidInput = document.getElementById("totalInterestPaid");
    const totalCostInput = document.getElementById("totalCost");

    homePriceInput.addEventListener("input", calculateMinimumDownPayment);

    function calculateMinimumDownPayment() {
        const homePrice = parseFloat(homePriceInput.value);
        if (isNaN(homePrice)) return;

        let minDownPayment = homePrice <= 500000 ? homePrice * 0.05 : (500000 * 0.05) + ((homePrice - 500000) * 0.1);
        minDownPaymentInput.value = minDownPayment.toFixed(2);

        calculateCMHCPremium(minDownPayment, homePrice);
    }

    function calculateCMHCPremium(downPayment, homePrice) {
        const mortgageAmount = homePrice - downPayment;
        let premiumRate = downPayment / homePrice >= 0.2 ? 0 : downPayment / homePrice < 0.1 ? 0.04 : downPayment / homePrice < 0.15 ? 0.031 : 0.028;

        const premium = mortgageAmount * premiumRate;
        cmhcPremiumInput.value = premium.toFixed(2);

        calculateMortgageBalance(downPayment, premium);
    }

    function calculateMortgageBalance(downPayment, premium) {
        const homePrice = parseFloat(homePriceInput.value);
        const mortgageBalance = (homePrice - downPayment) + parseFloat(premium);
        mortgageBalanceInput.value = mortgageBalance.toFixed(2);

        calculateMonthlyPayment(mortgageBalance);
    }

    function calculateMonthlyPayment(mortgageBalance) {
        const interestRate = parseFloat(interestRateInput.value) / 100 / 12;
        const numPayments = 30 * 12;

        const monthlyPayment = (mortgageBalance * interestRate) / (1 - Math.pow(1 + interestRate, -numPayments));
        monthlyPaymentInput.value = monthlyPayment.toFixed(2);

        calculateFutureValues();
    }

    function calculateFutureValues() {
        const homePrice = parseFloat(homePriceInput.value);
        const yearsToSave = (0.2 * homePrice - parseFloat(minDownPaymentInput.value)) / parseFloat(monthlySavingsInput.value) / 12;

        const futureHomePrice = homePrice * Math.pow(1 + parseFloat(homeValueIncreaseInput.value) / 100, yearsToSave);
        futureHomePriceInput.value = futureHomePrice.toFixed(2);

        const futureDownPayment = futureHomePrice * 0.2;
        futureDownPaymentInput.value = futureDownPayment.toFixed(2);

        const futureMortgage = futureHomePrice - futureDownPayment;
        const futureInterestRate = parseFloat(interestRateInput.value) + parseFloat(mortgageRateChangeInput.value);
        const futureMonthlyPayment = (futureMortgage * (futureInterestRate / 100 / 12)) / (1 - Math.pow(1 + (futureInterestRate / 100 / 12), -360));

        futureMonthlyPaymentInput.value = futureMonthlyPayment.toFixed(2);
    }
});
