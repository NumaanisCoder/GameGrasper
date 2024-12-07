// components/MyChart.js
import { Line, Bar } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  Title,
  Tooltip,
  Legend,
  LineElement,
  BarElement,
  CategoryScale,
  LinearScale,
  PointElement,
} from 'chart.js';

// Register Chart.js components
ChartJS.register(
  Title,
  Tooltip,
  Legend,
  LineElement,
  BarElement,
  CategoryScale,
  LinearScale,
  PointElement
);

const MyChart = ({ blogs, label, color, type = 'line' }) => {
  // Prepare data for the chart
  const chartData = {
    labels: blogs.map(blog => blog.title.substring(0, 14)),
    datasets: [
      {
        label: label,
        data: blogs.map(blog => blog.views),
        borderColor: color,
        backgroundColor: color,
        fill: type === 'line', // Fill area only for line chart
        tension: type === 'line' ? 0.1 : 0, // Smooth line for line chart
      },
    ],
  };

  // Chart options
  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top',
      },
      tooltip: {
        callbacks: {
          label: function (tooltipItem) {
            return `Views: ${tooltipItem.raw}`;
          },
        },
      },
    },
    scales: {
      x: {
        ticks: {
          color: '#ffffff', // X-axis label color
          font: {
            size: 10,       // Font size for X-axis labels
            weight: 'bold', // Font weight for X-axis labels
          }},
        beginAtZero: true,
      },
      y: {
        ticks: {
          color: '#ffffff', // Y-axis label color
          font: {
            size: 12,       // Font size for Y-axis labels
            weight: 'bold', // Font weight for Y-axis labels
          }},
        beginAtZero: true,
      },
    },
  };

  // Render the appropriate chart type
  return (
    <>
      {type === 'line' && <Line data={chartData} options={options} />}
      {type === 'bar' && <Bar data={chartData} options={options} />}
    </>
  );
};

export default MyChart;
