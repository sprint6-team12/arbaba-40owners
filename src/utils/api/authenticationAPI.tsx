import { axiosInstance } from './axiosInstance';

interface LoginData {
  email: string;
  password: string;
}

const authenticationAPI = {
  post: (body: LoginData) => {
    return axiosInstance.post(`/token`, body);
  },
};

export default authenticationAPI;
