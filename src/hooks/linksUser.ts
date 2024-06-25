import authenticationAPI from '@/pages/api/authenticationAPI';
import userAPI from '@/pages/api/userAPI';

interface UserInfo {
  name: string;
  phone: string;
  address: string;
  bio: string;
}

export const getUserData = async (user_Id: string) => {
  try {
    const userData = await userAPI.getUserData(user_Id);
    return userData;
  } catch (error) {
    //console.error('Failed to fetch user data:', error);
  }
};

export const postUserData = async (
  email: string,
  password: string,
  type: string
) => {
  try {
    const userData = await userAPI.postUserData({ email, password, type });
    return userData;
  } catch (error) {
    // console.error('Failed to fetch user data:', error);
  }
};

export const putUserData = async (
  user_id: string,
  token = localStorage.getItem('token'),
  body: UserInfo
) => {
  try {
    const userData = await userAPI.putUserData(user_id, token, body);
    return userData;
  } catch (error) {
    //  console.error('Failed to fetch user data:', error);
  }
};

export const postLogin = async (email: string, password: string) => {
  try {
    const userData = await authenticationAPI.post({ email, password });
    return userData;
  } catch (error) {
    //  console.error('Failed to fetch user data:', error);
  }
};
