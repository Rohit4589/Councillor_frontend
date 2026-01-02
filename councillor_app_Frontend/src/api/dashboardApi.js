// src/Api/dashboardApi.js
import { faker } from "@faker-js/faker";
import axiosInstance from "./axiosInstance";

/* ================================
   TOGGLE THIS FLAG
   true  -> use faker data
   false -> use real backend API
================================ */
const USE_FAKE_DATA = false;

export const getDashboardData = async () => {
  if (USE_FAKE_DATA) {
    // ---------- FAKE DATA ----------
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve({
          success: true,
          message: "Dashboard data fetched successfully",
          data: {
            total_complaints: faker.number.int({ min: 1000, max: 2000 }),
            total_categories: faker.number.int({ min: 5, max: 20 }),
            pending_review: faker.number.int({ min: 10, max: 100 }),
            recent_complaints: Array.from({ length: 5 }).map(() => ({
              complaint_id: `CMP${faker.number.int({ min: 200000, max: 999999 })}`,
              category: faker.helpers.arrayElement([
                "Street Lights",
                "Garbage Collection",
                "Water Supply",
                "Roads & Potholes",
                "Drainage",
              ]),
              status: faker.helpers.arrayElement([
                "IN_PROGRESS",
                "COMPLETED",
                "SUBMITTED",
              ]),
              time: faker.helpers.arrayElement([
                "5 min ago",
                "12 min ago",
                "30 min ago",
                "1 hour ago",
                "2 hours ago",
              ]),
            })),
          },
        });
      }, 800);
    });
  }

  // ---------- REAL API ----------
  const response = await axiosInstance.get(
    "/api/admin/dashboard-stats"
  );

  return response.data;
};
