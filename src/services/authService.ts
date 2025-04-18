import axios from "axios";

const API_URL = "https://s-libraries.uz/api/v1/auth/";

export interface LoginData {
  email: string;
  password: string;
}

export const loginUser = async (data: LoginData) => {
  const response = await axios.post(`${API_URL}login/`, data);
  return response.data;
};
