import axios from 'axios';
import { config } from '../config';
const { baseUrl } = config;
export const axiosInstance = axios.create({
  baseURL: baseUrl,
});
export const axiosPost = async (
  url,
  data,
  contentType = 'application/json',
  params = null,
) => {
  let response = {};
  let headers = {
    'Content-Type': contentType,
  };
  try {
    const result = await axiosInstance.post(url, data, {
      headers: headers,
      params: params,
      validateStatus: (status) => status >= 200 && status < 500,
    });
    response = result?.data;
    response.status = result?.data?.status;
    response.message = result?.data?.message;
  } catch (e) {
    if (e.response && e.response.status === 400) {
      response = e.response.data;
      response.status = e.response.data.status;
      response.message = e.response.data.message;
    } else {
      response.status = false;
      response.message = e?.response?.data?.message
        ? e?.response?.data?.message
        : e?.message
        ? e?.message
        : 'something went wrong';
      response.data = e;
    }
  }
  return response;
};


export const axiosPatch = async (url, data, contentType = 'application/json') => {
  let response = {};
  try {
    const result = await axiosInstance.patch(url, data);
    response = result.data;
    response.status = result?.data?.status || result?.data?.[0]?.status || result.status;
    response.message = result?.data?.message || result?.data?.[0]?.status;
  } catch (e) {
    response.status = false;
    response.message = 'something went wrong';
    response.data = e;
  }
  return response;
};