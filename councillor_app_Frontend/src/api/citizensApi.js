import axiosInstance from "./axiosInstance";

/* ===============================
   GET CITIZENS LIST
================================ */
export const getCitizens = async () => {
  const response = await axiosInstance.get(
    "/api/admin/users",
    {
      params: {
        "role-citizen": true,
      },
    }
  );

  const data = response.data?.data || [];

  return data.map((item) => ({
    id: item.citizen_id,
    name: item.name ?? "",
    phone: item.phone_number ?? "",
    ward: item.ward ?? "",
    email: item.email ?? "",
  }));
};

/* ===============================
   GET CITIZEN DETAILS
================================ */
export const getCitizenDetails = async (id) => {
  const response = await axiosInstance.get(
    "/api/admin/userdetalls",
    {
      params: { id },
    }
  );

  const d = response.data?.data || {};

  return {
    name: d.name ?? "",
    phone: d.phone_number ?? "",
    email: d.email ?? "",
    ward: d.ward ?? "",
    VoterId: d.Voter_id ?? "",
    city: d.city ?? "",
    state: d.state ?? "",
    bloodGroup: d.blood_group ?? "",
    disability: d.disability ?? "",
    language: d.language ?? "",
  };
};
