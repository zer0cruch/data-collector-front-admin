import React, { useState, useEffect } from "react";
import axios from "axios";
import Grid from "@mui/material/Grid";
import Icon from "@mui/material/Icon";
import PieChart from "./Chart"; // Assuming this is another chart component
import SoftBox from "components/SoftBox";
import SoftTypography from "components/SoftTypography";
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import Footer from "examples/Footer";
import { Card } from "@mui/material";
import CountryPieChart from "./CountryChart"; // Your CountryPieChart component
import BarChart from "./BarChart"; // Assuming you have another BarChart component
import GradientLineChart from "examples/Charts/LineCharts/GradientLineChart";
import typography from "assets/theme/base/typography";
import reportsBarChartData from "layouts/dashboard/data/reportsBarChartData";
import gradientLineChartData from "layouts/dashboard/data/gradientLineChartData";
import { useNavigate } from "react-router-dom"; // React Router v6 for navigation

function Dashboard() {
  const { size } = typography;
  const [DataSets, setDataSets] = useState([]);
  const [error, setError] = useState(null);
  const navigate = useNavigate(); // useNavigate for redirection

  useEffect(() => {

    const fetchData = async () => {
  const token = localStorage.getItem("authToken");

      try {
        if (!token) {
          navigate("/authentication/sign-up"); // Redirect to the sign-up page
          return; // Prevent further execution
        }

        if (token) {
          const response = await axios.get("https://data-collect-nu.vercel.app/stats", {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          });

          console.log("API Response:", response.data);

          // Group the data by title (for pie chart rendering)
          const groupedData = groupDataByTitle(response.data.payload.stats);
          setDataSets(groupedData);
        }
      } catch (err) {
        setError("Failed to load data.");
        console.error("API Error:", err);
      }
    };

    fetchData();
  }, [navigate]); // Added isRedirected to the dependency array

  const groupDataByTitle = (data) => {
    const grouped = {};
    data.forEach((item) => {
      const title = item.title || "Unknown Title";
      if (!grouped[title]) {
        grouped[title] = {};
      }
      grouped[title] = item.data;
    });
    return grouped;
  };

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <DashboardLayout>
      <DashboardNavbar />
      <SoftBox py={3}>
        <SoftBox mb={3}>
          {/* Group Pie Charts in Pairs */}
          <Grid container spacing={3} sx={{ marginTop: "20px" }}>
            {Object.keys(DataSets).map((title, index) => {
              if (index % 2 === 0) {
                return (
                  <Grid container spacing={3} key={index}>
                    <Grid item xs={12} sm={6} lg={6}>
                      <Card sx={{ padding: "20px", height: "100%" }}>
                        <CountryPieChart title={title} data={DataSets[title]} />
                      </Card>
                    </Grid>
                    <Grid item xs={12} sm={6} lg={6}>
                      <Card sx={{ padding: "20px", height: "100%" }}>
                        {Object.keys(DataSets)[index + 1] && (
                          <CountryPieChart
                            title={Object.keys(DataSets)[index + 1]}
                            data={DataSets[Object.keys(DataSets)[index + 1]]}
                          />
                        )}
                      </Card>
                    </Grid>
                  </Grid>
                );
              }
              return null;
            })}
          </Grid>

          {/* Bar Chart */}
          <Grid container spacing={3}></Grid>
        </SoftBox>
      </SoftBox>
      <Footer />
    </DashboardLayout>
  );
}

export default Dashboard;
  