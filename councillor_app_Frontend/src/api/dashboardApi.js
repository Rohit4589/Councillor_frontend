import axiosInstance from "./axiosInstance";

export const getDashboardData = async () => {
  const response = await axiosInstance.get(
    "/api/admin/dashboard-stats"
  );

  return response.data;
};
