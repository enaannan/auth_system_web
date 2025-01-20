import axiosInstance from "../utils/axiosInstance";
import Cookies from "js-cookie";

const jsonHeaders = {
  "Content-Type": "application/json",
};

export const loginService = async (email: string, password: string) => {
  try {
    const response = await axiosInstance.post(
      "users/login/",
      { email, password },
      { headers: jsonHeaders }
    );
    const { access_token, refresh_token } = response.data;
    Cookies.set("access_token", access_token, {
        expires: 15 / (60 * 24),
      secure: true,
      sameSite: "strict",
    });

    Cookies.set("refresh_token", refresh_token, {
      expires: 7,
      secure: true,
      sameSite: "strict",
    });
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const registerService = async (
  username: string,
  email: string,
  password: string
) => {
  try {
    const response = await axiosInstance.post(
      "users/register/",
      {
        username,
        email,
        password,
      },
      { headers: jsonHeaders }
    );
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const fetchUserProfile = async () => {
  try {
    const response = await axiosInstance.get("users/me/");
    return response.data;
  } catch (error) {
    throw error;
  }
};
