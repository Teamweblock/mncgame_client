import React, { useState, useEffect } from "react";
import { ResponsiveContainer, PieChart, Pie, Cell, Legend } from "recharts";
import { managementSkills } from "../utils/axiosInstance";

const COLORS = ["#5574fa", "#fda134", "#17ab93", "#fe9678", "#fda134"];

const ManagementChart = ({ startDate, endDate }) => {
  const [data, setData] = useState([]);
  const [total, setTotal] = useState(0);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchSkillsOverview = async () => {
      try {
        if (startDate && endDate) {
          const skillOverview = await managementSkills({ startDate, endDate }); // Fetch API data
          if (skillOverview?.totalAverageScore)
            setTotal(skillOverview?.totalAverageScore);

          if (skillOverview?.percentageBreakdown) {
            if (skillOverview?.percentageBreakdown) {
              const transformedData = Object.entries(
                skillOverview.percentageBreakdown
              ).map(([key, value]) => ({
                name: key,
                value,
              }));
              setData(transformedData);
            }
          }
        }
      } catch (error) {
        console.error("Error fetching skill overview", error);
      } finally {
        setLoading(false);
      }
    };

    fetchSkillsOverview();
  }, [startDate, endDate]);

  if (loading) {
    return <p>Loading...</p>;
  }

  if (!data.length) {
    return <p>No data available</p>;
  }

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
                fontWeight="bold"
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
            {total}%
          </tspan>
          <tspan
            x="50%"
            dy="1.2em"
            style={{ fill: "gray", fontSize: "14px", fontWeight: "semi-bold" }}
          >
            Well Done!
          </tspan>
        </text>
      </PieChart>
    </ResponsiveContainer>
  );
};

export default ManagementChart;
