import { useState } from "react";

export default function SkillsOverview() {
  const [selectedFilter, setSelectedFilter] = useState("leadership");

  const months = ["Jan", "Feb", "Mar", "Apr", "Jun", "July"];
  const data1 = [20, 21, 22, 24, 32, 35];
  const data2 = [10, 12, 14, 15, 20, 25];

  const maxValue = 40;
  const width = 600;
  const height = 300;
  const padding = 40;

  const xStep = (width - padding * 2) / (months.length - 1);
  const yScale = (height - padding * 2) / maxValue;

  const marchIndex = 2;

  const line1Points = data1
    .map((value, index) => {
      const x = index * xStep + padding;
      const y = height - (value * yScale + padding);
      return `${x},${y}`;
    })
    .join(" ");

  const line2Points = data2
    .map((value, index) => {
      const x = index * xStep + padding;
      const y = height - (value * yScale + padding);
      return `${x},${y}`;
    })
    .join(" ");

  const marchData1 = data1[marchIndex];
  const marchData2 = data2[marchIndex];
  const marchX = marchIndex * xStep + padding;
  const marchY1 = height - (marchData1 * yScale + padding);
  const marchY2 = height - (marchData2 * yScale + padding);

  return (
    <div className=" bg-white rounded-lg shadow-sm">
      <div className="relative">
        <svg
          width="100%"
          height="100%"
          viewBox={`0 0 ${width} ${height}`}
          className="overflow-visible"
        >
          {[...Array(5)].map((_, i) => (
            <line
              key={i}
              x1={padding}
              y1={(i * (height - padding * 2)) / 4 + padding}
              x2={width - padding}
              y2={(i * (height - padding * 2)) / 4 + padding}
              stroke="#f0f0f0"
              strokeWidth="1"
            />
          ))}

          {months.map((_, i) => (
            <line
              key={i}
              x1={i * xStep + padding}
              y1={padding}
              x2={i * xStep + padding}
              y2={height - padding}
              stroke="#f0f0f0"
              strokeWidth="1"
              strokeDasharray="4"
            />
          ))}

      
          {[0, 10, 20, 30, 40].map((value, i) => (
            <text
              key={i}
              x={padding - 10}
              y={height - (value * yScale + padding)}
              textAnchor="end"
              alignmentBaseline="middle"
              className="text-xs fill-gray-500"
            >
              {value}
            </text>
          ))}

          {months.map((month, i) => (
            <text
              key={i}
              x={i * xStep + padding}
              y={height - padding / 2}
              textAnchor="middle"
              className="text-xs fill-gray-500"
            >
              {month}
            </text>
          ))}

       
          {/* <polygon
            points={`${padding},${height} ${marchX},${marchY1} ${marchX},${marchY2} ${padding},${height}`}
            fill="#E0E7FF" 
            opacity="0.3"
          /> */}

          <polyline
            points={line1Points}
            fill="none"
            stroke="#4F46E5"
            strokeWidth="2"
            className="transition-all duration-300"
          />
          <polyline
            points={line2Points}
            fill="none"
            stroke="#06B6D4"
            strokeWidth="2"
            className="transition-all duration-300"
          />

          <circle
            cx={marchX}
            cy={marchY1}
            r="6"
            fill="#4F46E5"
            className="transition-all duration-300"
          />
          <circle
            cx={marchX}
            cy={marchY2}
            r="6"
            fill="#06B6D4"
            className="transition-all duration-300"
          />
        </svg>
      </div>
    </div>
  );
}
