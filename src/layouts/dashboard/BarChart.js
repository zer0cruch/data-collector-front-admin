import React from "react";

const data = {
  film: 5,
  drama: 6,
  comique: 1,
};

function BarChart() {
  // Convert object data to array for easier manipulation
  const dataArray = Object.keys(data).map((key) => ({
    name: key,
    value: data[key],
  }));

  const totalHeight = 300;
  const barWidth = 50;
  const barSpacing = 20;

  const maxValue = Math.max(...dataArray.map(item => item.value));

  return (
    <svg width={600} height={totalHeight + 50} viewBox="0 0 400 350" style={{marginTop:"30px"}}>
      {/* Render bars */}
      {dataArray.map((item, index) => {
        const barHeight = (item.value / maxValue) * totalHeight;
        const x = index * (barWidth + barSpacing) + 50;
        const y = totalHeight - barHeight;
        return (
          <rect
            key={index}
            x={x}
            y={y}
            width={barWidth}
            height={barHeight}
            fill="steelblue"
          />
        );
      })}

      {/* Add labels */}
      {dataArray.map((item, index) => {
        const x = index * (barWidth + barSpacing) + 50;
        const y = totalHeight + 15;
        return (
          <text
            key={index}
            x={x + barWidth / 2}
            y={y}
            fill="black"
            fontSize="14px"
            textAnchor="middle"
          >
            {item.name}
          </text>
        );
      })}

      {/* Add value labels on top of the bars */}
      {dataArray.map((item, index) => {
        const barHeight = (item.value / maxValue) * totalHeight;
        const x = index * (barWidth + barSpacing) + 50;
        const y = totalHeight - barHeight - 10;
        return (
          <text
            key={index}
            x={x + barWidth / 2}
            y={y}
            fill="black"
            fontSize="12px"
            textAnchor="middle"
          >
            {item.value}
          </text>
        );
      })}
    </svg>
  );
}

export default BarChart;
