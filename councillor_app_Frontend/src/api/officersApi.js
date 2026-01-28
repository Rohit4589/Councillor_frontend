import axiosInstance from "./axiosInstance";

/* ===============================
   GET ALL OFFICERS (ADMIN)
================================ */
export const getOfficers = async () => {
  const response = await axiosInstance.get("/admin/officers");

  return response.data.data.map((item) => ({
    id: item.officer_id,
    name: item.name,
    designation: item.designation,
    department: item.department,
    phone: item.phone_number,
  }));
};

/* ===============================
   ADD OFFICER (ADMIN)
================================ */
export const addOfficer = async (officer) => {
  const response = await axiosInstance.post(
    "/admin/create-admin-employee",
    {
      name: officer.name,
      phone_number: officer.phone,
      designation: officer.designation,
      department: officer.department,
    }
  );

  const d = response.data.data;

  return {
    id: d.officer_id,
    name: d.name,
    designation: d.designation,
    department: d.department,
    phone: d.phone_number,
  };
};
