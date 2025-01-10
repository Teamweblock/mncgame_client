import { useState, useEffect } from "react";
import { AgCharts } from "ag-charts-react"; // Correct import for AgCharts

export default function SkillsOverview() {
  const [selectedFilter, setSelectedFilter] = useState("leadership");

  const months = ["Jan", "Feb", "Mar", "Apr", "Jun", "July"];
  const [data1, setData1] = useState([20, 21, 22, 24, 32, 35]);
  const [data2, setData2] = useState([10, 12, 14, 15, 20, 25]);
  const [data3, setData3] = useState([5, 10, 15, 20, 25, 30]); // New data

  // Dynamically calculate maxValue from all data arrays
  const maxValue = Math.max(...data1, ...data2, ...data3);

  // Define chart options
  const options = {
    title: {
      text: "Monthly Data Comparison",
    },
    data: months.map((month, index) => ({
      month,
      data1: data1[index],
      data2: data2[index],
      data3: data3[index], // Add data3
    })),
    series: [
      {
        type: "line",
        xKey: "month",
        yKey: "data1",
        yName: "Problem Pilot", // Label for the first series
        stroke: "#4F46E5", // Color for line 1
        marker: {
          enabled: true, // Show markers
          fill: "#4F46E5",
        },
      },
      {
        type: "line",
        xKey: "month",
        yKey: "data2",
        yName: "Entrepreneurial Edge", // Label for the second series
        stroke: "#06B6D4", // Color for line 2
        marker: {
          enabled: true, // Show markers
          fill: "#06B6D4",
        },
      },
      {
        type: "line",
        xKey: "month",
        yKey: "data3",
        yName: "Strategy Trial", // Label for the third series
        stroke: "#38B2AC", // Color for line 3
        marker: {
          enabled: true, // Show markers
          fill: "#38B2AC", 
        },
      },
    ],
    axes: [
      {
        type: "category",
        position: "bottom",
        title: {
          text: "Month",
        },
      },
      {
        type: "number",
        position: "left",
        title: {
          text: "Value",
        },
      },
    ],
  };

  return (
    <div className="bg-white rounded-lg shadow-sm">
      <div className="p-4" style={{ width: "100%" }}>
        {/* AG Chart using your data */}
        <AgCharts
          options={options}
          style={{
            width: "100%", // Make chart take full width of the parent container
            height: "450px", // Set a fixed height or use vh for responsiveness
          }}
        />
      </div>
    </div>
  );
}


// import { useState } from "react";

// export default function SkillsOverview() {
//   const [selectedFilter, setSelectedFilter] = useState("leadership");

//   const months = ["Jan", "Feb", "Mar", "Apr", "Jun", "July"];
//   const data1 = [20, 21, 22, 24, 32, 35];
//   const data2 = [10, 12, 14, 15, 20, 25];

//   const maxValue = 40;
//   const width = 600;
//   const height = 300;
//   const padding = 40;

//   const xStep = (width - padding * 2) / (months.length - 1);
//   const yScale = (height - padding * 2) / maxValue;

//   const marchIndex = 2;

//   const line1Points = data1
//     .map((value, index) => {
//       const x = index * xStep + padding;
//       const y = height - (value * yScale + padding);
//       return `${x},${y}`;
//     })
//     .join(" ");

//   const line2Points = data2
//     .map((value, index) => {
//       const x = index * xStep + padding;
//       const y = height - (value * yScale + padding);
//       return `${x},${y}`;
//     })
//     .join(" ");

//   const marchData1 = data1[marchIndex];
//   const marchData2 = data2[marchIndex];
//   const marchX = marchIndex * xStep + padding;
//   const marchY1 = height - (marchData1 * yScale + padding);
//   const marchY2 = height - (marchData2 * yScale + padding);

//   return (
//     <div className=" bg-white rounded-lg shadow-sm">
//       <div className="relative">
//         <svg
//           width="100%"
//           height="100%"
//           viewBox={`0 0 ${width} ${height}`}
//           className="overflow-visible"
//         >
//           {[...Array(5)].map((_, i) => (
//             <line
//               key={i}
//               x1={padding}
//               y1={(i * (height - padding * 2)) / 4 + padding}
//               x2={width - padding}
//               y2={(i * (height - padding * 2)) / 4 + padding}
//               stroke="#f0f0f0"
//               strokeWidth="1"
//             />
//           ))}

//           {months.map((_, i) => (
//             <line
//               key={i}
//               x1={i * xStep + padding}
//               y1={padding}
//               x2={i * xStep + padding}
//               y2={height - padding}
//               stroke="#f0f0f0"
//               strokeWidth="1"
//               strokeDasharray="4"
//             />
//           ))}

      
//           {[0, 10, 20, 30, 40].map((value, i) => (
//             <text
//               key={i}
//               x={padding - 10}
//               y={height - (value * yScale + padding)}
//               textAnchor="end"
//               alignmentBaseline="middle"
//               className="text-xs fill-gray-500"
//             >
//               {value}
//             </text>
//           ))}

//           {months.map((month, i) => (
//             <text
//               key={i}
//               x={i * xStep + padding}
//               y={height - padding / 2}
//               textAnchor="middle"
//               className="text-xs fill-gray-500"
//             >
//               {month}
//             </text>
//           ))}

       
//           {/* <polygon
//             points={`${padding},${height} ${marchX},${marchY1} ${marchX},${marchY2} ${padding},${height}`}
//             fill="#E0E7FF" 
//             opacity="0.3"
//           /> */}

//           <polyline
//             points={line1Points}
//             fill="none"
//             stroke="#4F46E5"
//             strokeWidth="2"
//             className="transition-all duration-300"
//           />
//           <polyline
//             points={line2Points}
//             fill="none"
//             stroke="#06B6D4"
//             strokeWidth="2"
//             className="transition-all duration-300"
//           />

//           <circle
//             cx={marchX}
//             cy={marchY1}
//             r="6"
//             fill="#4F46E5"
//             className="transition-all duration-300"
//           />
//           <circle
//             cx={marchX}
//             cy={marchY2}
//             r="6"
//             fill="#06B6D4"
//             className="transition-all duration-300"
//           />
//         </svg>
//       </div>
//     </div>
//   );
// }
