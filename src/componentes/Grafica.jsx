import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { Bar } from "react-chartjs-2";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

// eslint-disable-next-line react/prop-types
const Grafica = ({ labels, data, titulo, item }) => {
  return (
    <div>
      <Bar
        options={{
          responsive: true,
          plugins: {
            legend: {
              position: "top",
            },
            title: {
              display: true,
              text: titulo,
            },
          },
          scales: {
            y: {
              grid: {
                drawTicks: true,
              },
            },
          },
        }}
        data={{
          labels,
          datasets: [
            {
              label: item,
              data,
              backgroundColor: "rgba(50, 50, 230, 1)",
            },
          ],
        }}
      />
    </div>
  );
};
export default Grafica;
