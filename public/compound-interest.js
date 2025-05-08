// public/compound-interest.js
let compoundInterestChart;

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
    const yearsArray = [];
    const valuesArray = [];

    for (let i = 0; i <= years; i++) {
        const startBalance = balance;
        const annualContrib = (i <= stopYear) ? contribution * frequency : 0;
        balance += annualContrib;

        const interest = balance * Math.pow((1 + rate / compounds), compounds) - balance;
        balance += interest;

        yearsArray.push(i);
        valuesArray.push(balance);
    }

    document.getElementById("result").innerText = `Final Value: $${balance.toFixed(2)}`;
    renderChart(yearsArray, valuesArray);
}

// Function to Render the Chart
function renderChart(years, values) {
    const ctx = document.getElementById("compoundInterestChart").getContext("2d");

    if (compoundInterestChart) {
        compoundInterestChart.destroy();
    }

    compoundInterestChart = new Chart(ctx, {
        type: 'line',
        data: {
            labels: years,
            datasets: [{
                label: 'Investment Growth',
                data: values,
                backgroundColor: 'rgba(54, 162, 235, 0.2)',
                borderColor: 'rgba(54, 162, 235, 1)',
                borderWidth: 2,
                pointRadius: 3
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            scales: {
                x: {
                    title: {
                        display: true,
                        text: 'Years'
                    }
                },
                y: {
                    title: {
                        display: true,
                        text: 'Future Value ($)'
                    },
                    beginAtZero: true
                }
            }
        }
    });
}
