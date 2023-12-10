// Configuração do gráfico usando Chart.js
const ctx = document.getElementById('grafico').getContext('2d');
const myChart = new Chart(ctx, {
  type: 'bar',
  data: {
    labels: meses,
    datasets: [
      {
        label: 'Receitas',
        data: receitas,
        backgroundColor: 'rgba(54, 162, 235, 0.5)',
        borderColor: 'rgba(54, 162, 235, 1)',
        borderWidth: 1
      },
      {
        label: 'Despesas',
        data: despesas,
        backgroundColor: 'rgba(255, 99, 132, 0.5)',
        borderColor: 'rgba(255, 99, 132, 1)',
        borderWidth: 1
      }
    ]
  },
  options: {
    scales: {
      y: {
        beginAtZero: true
      }
    }
  }
});