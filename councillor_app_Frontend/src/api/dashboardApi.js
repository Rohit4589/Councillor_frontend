// src/api/dashboardApi.js

export const getDashboardData = async () => {
  const response = await fetch("http://localhost:5000/api/dashboard");

  if (!response.ok) {
    throw new Error("Failed to fetch dashboard data");
  }

  return response.json();
};
