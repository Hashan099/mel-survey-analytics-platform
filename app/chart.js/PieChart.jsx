// components/SurveyChart.js
import { useState, useEffect } from "react";
import { Pie } from "react-chartjs-2";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import LoadingSkeliton from "../Components/Utils/LoadingSkeleton";

ChartJS.register(ArcElement, Tooltip, Legend);

const PieChart = () => {
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
              backgroundColor: [
                "rgba(255, 99, 132, 0.2)",
                "rgba(54, 162, 235, 0.2)",
                "rgba(255, 206, 86, 0.2)",
                "rgba(75, 192, 192, 0.2)",
                "rgba(153, 102, 255, 0.2)",
              ],
              borderColor: [
                "rgba(255, 99, 132, 1)",
                "rgba(54, 162, 235, 1)",
                "rgba(255, 206, 86, 1)",
                "rgba(75, 192, 192, 1)",
                "rgba(153, 102, 255, 1)",
              ],
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
      legend: { display: true, position: "top" },
      tooltip: { enabled: true },
    },
  };

  return chartData ? (
    <div style={{ width: "600px", height: "400px" }}>
      <Pie data={chartData} options={options} />
    </div>
  ) : (
    <LoadingSkeliton />
  );
};

export default PieChart;
