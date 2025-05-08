// public/compound-interest.js
function calculateCompoundInterest() {
    const principal = parseFloat(document.getElementById("principal").value);
    const rate = parseFloat(document.getElementById("rate").value) / 100;
    const compounds = parseInt(document.getElementById("compounds").value);
    const years = parseFloat(document.getElementById("years").value);

    if (isNaN(principal) || isNaN(rate) || isNaN(compounds) || isNaN(years)) {
        document.getElementById("result").innerText = "Please fill in all fields correctly.";
        return;
    }

    // Compound Interest Formula
    const amount = principal * Math.pow((1 + rate / compounds), compounds * years);
    const interest = amount - principal;

    document.getElementById("result").innerText = 
        `Future Value: $${amount.toFixed(2)}\nTotal Interest Earned: $${interest.toFixed(2)}`;
}
