import React from "react";
import { ResponsiveContainer, PieChart, Pie, Cell, Legend } from "recharts";

const data = [
  { name: "Group A", value: 11 },
  { name: "Group C", value: 39 },
  { name: "Group D", value: 26 },
  { name: "Group B", value: 24 },
];

const COLORS = ["#5574fa", "#fda134", "#17ab93", "#fe9678"];

const ManagementChart = () => {
  const minValueIndex = data.reduce(
    (minIndex, currentValue, currentIndex, arr) =>
      currentValue.value < arr[minIndex].value ? currentIndex : minIndex,
    0
  );

  return (
    <ResponsiveContainer>
      <PieChart>
        <Pie
          data={data}
          innerRadius={55}
          outerRadius={90}
          paddingAngle={5}
          dataKey="value"
          label={({ cx, cy, midAngle, innerRadius, outerRadius, index }) => {
            const RADIAN = Math.PI / 180;
            const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
            const x = cx + radius * Math.cos(-midAngle * RADIAN);
            const y = cy + radius * Math.sin(-midAngle * RADIAN);

            return (
              <text
                x={x}
                y={y}
                fill="white"
                textAnchor="middle"
                dominantBaseline="central"
                fontSize={10}
                fontWeight={"bold"}
              >
                {`${data[index].value}%`}
              </text>
            );
          }}
          labelLine={false}
        >
          {data.map((entry, index) => (
            <Cell
              key={`cell-${index}`}
              fill={COLORS[index % COLORS.length]}
              strokeWidth={index === minValueIndex ? 3 : 0}
              stroke={index === minValueIndex ? "none" : "none"}
              offset={index === minValueIndex ? 12 : 0}
            />
          ))}
        </Pie>

        <text x="50%" y="50%" textAnchor="middle" dominantBaseline="central">
          <tspan
            x="50%"
            dy="-0.4em"
            style={{ fill: "#0e2b54", fontSize: "20px", fontWeight: "bold" }}
          >
            98%
          </tspan>
          <tspan
            x="50%"
            dy="1.2em"
            style={{ fill: "gray", fontSize: "14px", fontWeight: "semi-bold" }}
          >
            Management
          </tspan>
        </text>
      </PieChart>
    </ResponsiveContainer>
  );
};

export default ManagementChart;
