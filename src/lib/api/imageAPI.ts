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

const imageAPI = async (fileObject: File) => {
  try {
    const response = await axiosInstance.post(`/images`, {
      name: fileObject.name,
    });
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
