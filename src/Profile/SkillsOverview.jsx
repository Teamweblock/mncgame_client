import { useState, useEffect } from "react";
import { AgCharts } from "ag-charts-react"; // Correct import for AgCharts
import { getSkillsOverview } from "../utils/axiosInstance";

export default function SkillsOverview() {
  const [skillOverview, setSkillOverview] = useState(null);
  const [loading, setLoading] = useState(true); // Track loading state

  useEffect(() => {
    const fetchSkillsOverview = async () => {
      try {
        const skilloverview = await getSkillsOverview(); // Fetch API data
        console.log("skilloverview", skilloverview);

        if (skilloverview) {
          setSkillOverview(skilloverview); // Store API response in state
        }
      } catch (error) {
        console.error("Error fetching skill overview", error);
      } finally {
        setLoading(false); // Stop loading after data is fetched
      }
    };

    fetchSkillsOverview();
  }, []);

  // Handle loading or missing data
  if (loading) {
    return <div>Loading...</div>;
  }
  if (!skillOverview) {
    return <div>No data available</div>;
  }

  // Extract data from API response
  const { labels, datasets } = skillOverview;
  const [problemPilot, entrepreneurialEdge, strategyTrial] = datasets;

  // Map API response to chart data
  const options = {
    title: {
      text: "Monthly Data Comparison",
    },
    data: labels.map((month, index) => ({
      month,
      data1: problemPilot.data[index] || 0,
      data2: entrepreneurialEdge.data[index] || 0,
      data3: strategyTrial.data[index] || 0,
    })),
    series: [
      {
        type: "line",
        xKey: "month",
        yKey: "data1",
        yName: problemPilot?.label, // Use label from API
        stroke: "#4F46E5",
        marker: {
          enabled: true,
          fill: "#4F46E5",
        },
      },
      {
        type: "line",
        xKey: "month",
        yKey: "data2",
        yName: entrepreneurialEdge?.label, // Use label from API
        stroke: "#06B6D4",
        marker: {
          enabled: true,
          fill: "#06B6D4",
        },
      },
      {
        type: "line",
        xKey: "month",
        yKey: "data3",
        yName: strategyTrial?.label, // Use label from API
        stroke: "#38B2AC",
        marker: {
          enabled: true,
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
