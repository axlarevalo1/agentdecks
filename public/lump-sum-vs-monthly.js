<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Lump-Sum vs. Monthly Investment Calculator - AgentDecks</title>
  <script src="https://cdn.tailwindcss.com"></script>
  <script src="https://cdn.jsdelivr.net/npm/chart.js"></script>
  <style>
    /* Fixed chart container style */
    .chart-container {
        position: relative;
        width: 100%;
        max-width: 600px;
        height: 400px;
        margin: 0 auto;
    }
  </style>
</head>
<body class="bg-gray-50 font-sans">

<!-- Site Header with AgentDecks Branding -->    
<header class="bg-blue-600 py-4 px-6 flex justify-between items-center text-white">
    <div class="text-2xl font-bold">
        <a href="index.html" class="text-white hover:text-gray-200">AgentDecks</a>
    </div>
</header>

<!-- Back to Home Button -->
<div class="text-left px-6 mt-4">
    <a href="index.html" class="text-blue-600 hover:text-blue-800 font-semibold">&larr; Back to Home</a>
</div>

<!-- Calculator Section -->
<section class="bg-white py-12 px-4 text-center max-w-3xl mx-auto mt-8">
    <h2 class="text-3xl font-bold text-blue-600 mb-4">Lump-Sum vs. Monthly Investment Calculator</h2>
    
    <!-- Monthly Investment Section -->
    <h3 class="text-2xl font-bold text-gray-700 mt-6">Monthly Investment</h3>
    <div class="space-y-4 mt-4 text-left">
        <label class="block text-gray-700 font-semibold">Monthly Investment Amount ($)</label>
        <input type="number" id="monthlyInvestment" class="border rounded-md w-full p-2" placeholder="Enter monthly amount" required>

        <label class="block text-gray-700 font-semibold">Projected Rate of Return (%)</label>
        <input type="number" id="rateOfReturn" class="border rounded-md w-full p-2" value="5" required>

        <label class="block text-gray-700 font-semibold">Number of Years</label>
        <input type="number" id="investmentYears" class="border rounded-md w-full p-2" value="10" required>
    </div>

    <!-- Lump Sum Investment Section -->
    <h3 class="text-2xl font-bold text-gray-700 mt-8">Lump Sum Investment</h3>
    <div class="space-y-4 mt-4 text-left">
        <label class="block text-gray-700 font-semibold">Total Investment Loan (Auto-calculated)</label>
        <input type="number" id="investmentLoan" class="border rounded-md w-full p-2 bg-gray-100 text-gray-600" readonly>

        <label class="block text-gray-700 font-semibold">Monthly Loan Obligation (Synced)</label>
        <input type="number" id="monthlyLoan" class="border rounded-md w-full p-2 bg-gray-100 text-gray-600" readonly>
    </div>

    <!-- Calculate Button -->
    <button onclick="calculateInvestments()" class="bg-blue-600 text-white font-bold py-2 px-4 rounded-md hover:bg-blue-700 transition mt-6 w-full">
        Calculate
    </button>

    <!-- Chart Container -->
    <div class="chart-container mt-6">
        <canvas id="investmentChart"></canvas>
    </div>

    <!-- Disclaimer -->
    <p class="text-sm text-gray-600 mt-4">
        Disclaimer: Some rates may be variable. Be aware of your risk tolerance. Investments may drop lower than the loan value, resulting in negative equity.
        This tool is for informational purposes only. Consult your professional advisor.
    </p>
</section>

<!-- JavaScript for Calculation and Chart -->
<script>
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
                    beginAtZero: true
                }
            },
            plugins: {
                legend: {
                    display: false
                }
            }
        }
    });
}
</script>

</body>
</html>
