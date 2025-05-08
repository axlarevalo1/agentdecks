let investmentChart;

function calculateInvestments() {
    const monthlyInvestment = parseFloat(document.getElementById("monthlyInvestment").value) || 0;
    const rateOfReturn = parseFloat(document.getElementById("rateOfReturn").value) / 100;
    const years = parseFloat(document.getElementById("investmentYears").value) || 0;

    // Monthly Investment Calculation
    let monthlyBalance = 0;
    for (let i = 0; i < years * 12; i++) {
        monthlyBalance = (monthlyBalance + monthlyInvestment) * (1 + rateOfReturn / 12);
    }

    // Lump Sum Investment Calculation
    const lumpSumInvestment = monthlyInvestment * 12 * years;
    const lumpSumBalance = lumpSumInvestment * Math.pow(1 + rateOfReturn, years);

    // Update the Chart
    updateChart(monthlyBalance, lumpSumBalance);
}

function updateChart(monthlyBalance, lumpSumBalance) {
    const ctx = document.getElementById('investmentChart').getContext('2d');
    if (investmentChart) {
        investmentChart.destroy();
    }

    investmentChart = new Chart(ctx, {
        type: 'bar',
        data: {
            labels: ['Monthly Investment', 'Lump-Sum Investment'],
            datasets: [{
                label: 'Final Value ($)',
                data: [monthlyBalance, lumpSumBalance],
                backgroundColor: ['#4A90E2', '#50E3C2']
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            scales: {
                y: {
                    beginAtZero: true,
                    ticks: {
                        callback: function(value) {
                            return '$' + value.toLocaleString();
                        }
                    }
                }
            },
            plugins: {
                tooltip: {
                    enabled: true,
                    callbacks: {
                        label: function(context) {
                            return 'Final Value: $' + context.raw.toFixed(2).toLocaleString();
                        }
                    }
                },
                legend: {
                    display: false
                }
            }
        }
    });
}
