import React from "react";
import { Pie } from "react-chartjs-2";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";

ChartJS.register(ArcElement, Tooltip, Legend);

function PieChart() {
  // Données d'exemple
  const data = {
    labels: ["Device", "Computer", "Phone"],
    datasets: [
      {
        data: [2, 5, 3], // Les données brutes
        backgroundColor: ["#FF6384", "#36A2EB", "#FFCE56"], // Couleurs
        hoverBackgroundColor: ["#FF6384", "#36A2EB", "#FFCE56"],
      },
    ],
  };

  return (
    <div style={{ width: "70%", height: "80%" , marginLeft:"20%" , marginTop:"10px"}}>
      <Pie data={data} />
    </div>
  );
}

export default PieChart;
