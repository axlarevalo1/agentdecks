// public/BTID.js
let btidChart;

// Automatically calculate "Invest the Difference" as the user types
document.getElementById("totalBudget").addEventListener("input", calculateInvestDifference);
document.getElementById("termPremium").addEventListener("input", calculateInvestDifference);

function calculateInvestDifference() {
    const totalBudget = parseFloat(document.getElementById("totalBudget").value);
    const termPremium = parseFloat(document.getElementById("termPremium").value);

    if (!isNaN(totalBudget) && !isNaN(termPremium)) {
        const investDifference = totalBudget - termPremium;
        document.getElementById("investDifference").value = investDifference >= 0 ? investDifference.toFixed(2) : "0.00";
    } else {
        document.getElementById("investDifference").value = "0.00";
    }
}

function calculateBTID() {
    const termDuration = parseInt(document.getElementById("termDuration").value);
    const investDifference = parseFloat(document.getElementById("investDifference").value);
    const annualReturn = parseFloat(document.getElementById("annualReturn").value) / 100;

    if (isNaN(investDifference) || isNaN(annualReturn)) {
        document.getElementById("result").innerText = "Please fill in all fields correctly.";
        return;
    }

    // Calculate Projected Investment Value
    const monthlyRate = annualReturn / 12;
    const totalMonths = termDuration * 12;
    let futureValue = 0;
    const monthsArray = [];
    const valuesArray = [];

    for (let month = 1; month <= totalMonths; month++) {
        futureValue = (futureValue + investDifference) * (1 + monthlyRate);
        if (month % 12 === 0) {
            monthsArray.push(month / 12);
            valuesArray.push(futureValue);
        }
    }

    // Display Results
    document.getElementById("result").innerHTML = `
        <p>Projected Total Investment Value at Term Expiry: <strong>$${futureValue.toFixed(2)}</strong></p>
    `;

    // Render Graph
    renderBTIDGraph(monthsArray, valuesArray);
}

// Function to Render the Graph - Fixed for Stability
function renderBTIDGraph(months, values) {
    const ctx = document.getElementById("btidChart").getContext("2d");

    // Properly clear the existing chart to avoid glitching
    if (btidChart) {
        btidChart.destroy();
    }

    // Create a new chart cleanly
    btidChart = new Chart(ctx, {
        type: 'line',
        data: {
            labels: months,
            datasets: [{
                label: 'Investment Growth Over Term',
                data: values,
                backgroundColor: 'rgba(54, 162, 235, 0.2)',
                borderColor: 'rgba(54, 162, 235, 1)',
                borderWidth: 2,
                pointRadius: 3,
                tension: 0.3,
                fill: true
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
                        text: 'Investment Value ($)'
                    },
                    beginAtZero: true
                }
            },
            plugins: {
                tooltip: {
                    callbacks: {
                        label: (context) => `$${context.raw.toFixed(2)}`
                    }
                }
            }
        }
    });
}
