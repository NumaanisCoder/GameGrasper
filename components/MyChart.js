// components/MyChart.js
import { Line } from 'react-chartjs-2';
import { Chart as ChartJS, Title, Tooltip, Legend, LineElement, CategoryScale, LinearScale, PointElement } from 'chart.js';

// Register Chart.js components
ChartJS.register(Title, Tooltip, Legend, LineElement, CategoryScale, LinearScale, PointElement);

const MyChart = ({ blogs }) => {
  // Sort blogs by views and select top 7

  // Prepare data for the chart
  const chartData = {
    labels: blogs.map(blog => blog.title.substring(0,14)),
    datasets: [
      {
        label: 'Views',
        data: blogs.map(blog => blog.views),
        borderColor: '#eb0707',
        backgroundColor: '#eb0707',
        fill: true, // Fill the area under the line
        tension: 0.1, // Smooth the line
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
        beginAtZero: true,
      },
      y: {
        beginAtZero: true,
      },
    },
  };

  return <Line data={chartData} options={options} />;
};

export default MyChart;
