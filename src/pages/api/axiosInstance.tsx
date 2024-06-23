// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import axios from 'axios';

export const axiosInstance = axios.create({
  baseURL: 'https://bootcamp-api.codeit.kr/api/6-12/the-julge',
});
