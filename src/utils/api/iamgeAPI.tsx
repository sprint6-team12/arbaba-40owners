import axios from 'axios';
import { APIError, ErrorMessages } from './ApiError';
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
  // token = localStorage.getItem('token')
  token: string
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
    if (axios.isAxiosError(error)) {
      const status = error.response?.status || 500;
      const errorMessage = ErrorMessages[status] || ErrorMessages.default;
      throw new APIError(errorMessage, status);
    } else {
      throw new Error('서버에서 네트워크가 오지 않습니다.');
    }
  }
};

export default imageAPI;
