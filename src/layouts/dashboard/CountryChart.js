import React from "react";
import PropTypes from "prop-types"; // Importation de PropTypes

function CountryPieChart({ title, data }) {
  const dataArray = Object.keys(data).map((key) => ({
    name: key,
    value: data[key],
  }));

  const total = dataArray.reduce((sum, item) => sum + item.value, 0);

  // To store the ocean shades of blue for each slice
  const oceanBlueShades = [
    "#006994", // Deep blue
    "#00A9D4", // Sky blue
    "#0099B9", // Ocean blue
    "#1E90FF", // Dodger blue
    "#87CEEB", // Light sky blue
    "#4682B4", // Steel blue
    "#5F9EA0", // Cadet blue
    "#00BFFF", // Deep sky blue
  ];

  // To make sure we don't run out of shades, repeat the ocean palette if necessary
  const colors = dataArray.map((_, index) => oceanBlueShades[index % oceanBlueShades.length]);

  const generatePieSlices = () => {
    let cumulativeValue = 0;

    return dataArray.map((item, index) => {
      const startAngle = (cumulativeValue / total) * 360;
      const endAngle = ((cumulativeValue + item.value) / total) * 360;
      cumulativeValue += item.value;

      const largeArc = endAngle - startAngle > 180 ? 1 : 0;

      const x1 = 200 + 150 * Math.cos((startAngle * Math.PI) / 180);
      const y1 = 200 + 150 * Math.sin((startAngle * Math.PI) / 180);

      const x2 = 200 + 150 * Math.cos((endAngle * Math.PI) / 180);
      const y2 = 200 + 150 * Math.sin((endAngle * Math.PI) / 180);

      return (
        <path
          key={index}
          d={`M200,200 L${x1},${y1} A150,150 0 ${largeArc},1 ${x2},${y2} Z`}
          fill={colors[index]} // Use the ocean color
        />
      );
    });
  };

  // Generate annotations (percentage and names) based on the color of each slice
  const generateAnnotations = () => {
    let cumulativeValue = 0;

    return dataArray.map((item, index) => {
      const percentage = ((item.value / total) * 100).toFixed(0); // Calculate percentage

      // Calculate the angle for placing the label
      const startAngle = (cumulativeValue / total) * 360;
      const endAngle = ((cumulativeValue + item.value) / total) * 360;
      cumulativeValue += item.value;

      const midAngle = (startAngle + endAngle) / 2; // Middle angle of the slice

      const x = 200 + 120 * Math.cos((midAngle * Math.PI) / 180); // X position of the label
      const y = 200 + 120 * Math.sin((midAngle * Math.PI) / 180); // Y position of the label

      return (
        <text
          key={index}
          x={x}
          y={y}
          textAnchor="middle"
          alignmentBaseline="middle"
          fill="#fff" // White color for text (contrast with the pie)
          fontSize="14px"
        >
          {percentage}% {/* Display the percentage inside the pie */}
        </text>
      );
    });
  };

  // Generate the legend (key names with colors)
  const generateLegend = () => {
    return dataArray.map((item, index) => {
      return (
        <div key={index} style={{ display: "flex", alignItems: "center", marginBottom: "8px" }}>
          <div
            style={{
              width: "20px",
              height: "20px",
              backgroundColor: colors[index], // Color of the pie slice
              marginRight: "10px",
            }}
          />
          <span>{item.name}</span> {/* Display the name of the key */}
        </div>
      );
    });
  };

  return (
    <div style={{ textAlign: "center" }}>
      <h3>{title}</h3>
      <div style={{ display: "flex", justifyContent: "center" }}>
        <svg width={400} height={400} viewBox="0 0 400 400">
          {generatePieSlices()}
          {generateAnnotations()} {/* Render percentage labels inside the chart */}
        </svg>
        <div style={{ marginLeft: "20px", textAlign: "left" }}>
          {generateLegend()} {/* Display the legend with the names and colors */}
        </div>
      </div>
    </div>
  );
}

// Validation des props
CountryPieChart.propTypes = {
  title: PropTypes.string,  // 'title' doit être une chaîne de caractères
  data: PropTypes.object,   // 'data' doit être un objet
};

export default CountryPieChart;
