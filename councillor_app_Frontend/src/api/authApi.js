import axios from "axios";

export const loginApi = (payload) => {
  console.log("API BASE URL =", import.meta.env.VITE_API_BASE_URL);

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
