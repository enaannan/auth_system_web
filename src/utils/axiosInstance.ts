import axios from "axios";
import Cookies from "js-cookie";
import { logout } from "./utils";

const apiUrl = process.env.REACT_APP_API_URL;
const axiosInstance = axios.create({
  baseURL: apiUrl,
  headers: {
    "Content-Type": "application/json",
  },
});

let isRefreshing = false;
let failedQueue: {
  resolve: (value?: unknown) => void;
  reject: (reason?: any) => void;
}[]=[];

const refreshAccessToken = async () => {
  try {
    const refreshAcessToken = Cookies.get("refresh_token");

    if (!refreshAcessToken) {
      throw new Error("Refresh token not found");
    }

    const response = await axiosInstance.post("/users/token/refresh/", {
      refresh: refreshAcessToken,
    },{ timeout: 3000 });

    const { access, refresh } = response.data;

    Cookies.set("access_token", access, {
      expires: 15 / (60 * 24),
      secure: true,
      sameSite: "strict",
    });

    Cookies.set("refresh_token", refresh, {
      expires: 7,
      secure: true,
      sameSite: "strict",
    });
    return {access,refresh};
  } catch (error) {
    console.error("Failed to refresh token:", error);
    throw error;
  }
};

axiosInstance.interceptors.request.use((config) => {
  const token = Cookies.get("access_token");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

axiosInstance.interceptors.response.use(
    (response) => response,
    async (error) => {

      const originalRequest = error.config;
      console.log("nii refresh",!originalRequest._retry,error.response,error.response.status)

    
      if (error.response && error.response.status === 401 && !originalRequest._retry) {
        if (isRefreshing) {
            
          return new Promise((resolve, reject) => {
            failedQueue.push({ resolve, reject });
          })
            .then((token) => {
              originalRequest.headers.Authorization = `Bearer ${token}`;
              return axiosInstance(originalRequest);
            })
            .catch((err) => {
              return Promise.reject(err);
            });
        }
        originalRequest._retry = true;
        isRefreshing = true;
  
        try {
          const { access } = await refreshAccessToken();

          failedQueue.forEach((req) => req.resolve(access));
          failedQueue = [];
  
          originalRequest.headers.Authorization = `Bearer ${access}`;
          return axiosInstance(originalRequest);
        } catch (error) {
          failedQueue.forEach((req) => req.reject(error));
          failedQueue = [];

        
          logout();
          
          return Promise.reject(error);
        } finally {
          isRefreshing = false;
        }
      }
  
      return Promise.reject(error);
    }
  );

export default axiosInstance;
