import { useState, useEffect } from "react";
import { Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  BarElement,
  CategoryScale,
  LinearScale,
} from "chart.js";
import LoadingSkeliton from "../Components/Utils/LoadingSkeleton";

ChartJS.register(BarElement, CategoryScale, LinearScale);

const BarChart = () => {
  const [chartData, setChartData] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("/api/survey/responses");
        const jsonData = await response.json();

        // Transform data into Chart.js format
        const questions = Object.keys(jsonData[0]).filter((key) =>
          key.startsWith("question")
        ); // Extract question keys
        const labels = questions; // Use question keys as labels
        const values = questions.map((question) => {
          const answers = jsonData.map((entry) => entry[question]);
          return answers.length; // Count responses (or customize as needed)
        });

        setChartData({
          labels,
          datasets: [
            {
              label: "Responses",
              data: values,
              backgroundColor: "rgba(75, 192, 192, 0.2)",
              borderColor: "rgba(75, 192, 192, 1)",
              borderWidth: 1,
            },
          ],
        });
      } catch (error) {
        console.error("Error fetching survey data:", error);
      }
    };

    fetchData();
  }, []);

  const options = {
    responsive: true,
    plugins: {
      legend: { display: true },
    },
  };

  return chartData ? (
    <div style={{ width: "600px", height: "400px" }}>
      {" "}
      {/* Adjust width and height */}
      <Bar data={chartData} options={options} />
    </div>
  ) : (
    <LoadingSkeliton />
  );
};

export default BarChart;
