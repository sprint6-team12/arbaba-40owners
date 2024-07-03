import axios from 'axios';
import { handleAxiosError } from './ApiError';
import { axiosInstance } from './axiosInstance';

const uploadImageToS3 = async (url: string, fileObject: File) => {
  await axios.put(url, fileObject, {
    headers: {
      'Content-Type': fileObject.type, // 파일 타입을 지정
    },
  });
};

const imageAPI = async (
  fileObject: File,
<<<<<<< HEAD
  token = localStorage.getItem('token')
=======
  token = localStorage.getItem('userJWT')
>>>>>>> cc5127c41a23d9d1c5dff02ec7276f1a14e22fec
) => {
  try {
    const response = await axiosInstance.post(
      `/images`,
      { name: fileObject.name },
      {
        headers: {
          'Content-Type': 'application/json',
          authorization: `Bearer ${token}`,
        },
      }
    );
    const result = response.data;
    await uploadImageToS3(result.item.url, fileObject);

    const instanceUrl = new URL(result.item.url);
    const urlWithoutQueryString = instanceUrl.origin + instanceUrl.pathname;
    return urlWithoutQueryString;
  } catch (error) {
    handleAxiosError(error);
  }
};

export default imageAPI;
