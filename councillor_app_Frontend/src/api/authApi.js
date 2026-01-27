import axios from "axios";

export const loginApi = (payload) => {
  

  return axios.post(
    `${import.meta.env.VITE_API_BASE_URL}/api/auth/login`,
    payload,
    {
      headers: {
        "Content-Type": "application/json",
      },
      
    }
    
  );
  
  
};

export const saveAuth = (data) => {
  localStorage.setItem("token", data.token);
  localStorage.setItem("user", JSON.stringify(data.user));
};

export const getLoggedInUser = () => {
  const user = localStorage.getItem("user");
  return user ? JSON.parse(user) : null;
};

