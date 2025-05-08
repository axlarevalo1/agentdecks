// public/compound-interest.js
function calculateCompoundInterest() {
    const principal = parseFloat(document.getElementById("principal").value);
    const rate = parseFloat(document.getElementById("rate").value) / 100;
    const compounds = parseInt(document.getElementById("compounds").value);
    const years = parseFloat(document.getElementById("years").value);
    const contribution = parseFloat(document.getElementById("contribution").value) || 0;
    const frequency = parseInt(document.getElementById("contributionFrequency").value);
    const stopYear = parseFloat(document.getElementById("stopYear").value) || years;

    if (isNaN(principal) || isNaN(rate) || isNaN(compounds) || isNaN(years)) {
        document.getElementById("result").innerText = "Please fill in all fields correctly.";
        return;
    }

    let balance = principal;
    const table = document.createElement("table");
    table.innerHTML = "<tr><th>Year</th><th>Starting Balance</th><th>Contributions</th><th>Interest</th><th>Ending Balance</th></tr>";

    for (let i = 1; i <= years; i++) {
        const startBalance = balance;
        const annualContrib = (i <= stopYear) ? contribution * frequency : 0;
        balance += annualContrib;

        const interest = balance * Math.pow((1 + rate / compounds), compounds) - balance;
        balance += interest;

        table.innerHTML += `<tr>
            <td>${i}</td>
            <td>$${startBalance.toFixed(2)}</td>
            <td>$${annualContrib.toFixed(2)}</td>
            <td>$${interest.toFixed(2)}</td>
            <td>$${balance.toFixed(2)}</td>
        </tr>`;
    }

    document.getElementById("result").innerText = `Final Value: $${balance.toFixed(2)}`;
    document.getElementById("amortizationTable").innerHTML = "";
    document.getElementById("amortizationTable").appendChild(table);
}
