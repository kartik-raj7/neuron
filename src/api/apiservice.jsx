import axios from 'axios';
import { config } from '../config';

// Get the base URL from the configuration
const { baseUrl } = config;

// Create an Axios instance with the base URL
export const axiosInstance = axios.create({
  baseURL: baseUrl,
});

// Function for making a POST request using Axios
export const axiosPost = async (
  url,              // API endpoint URL
  data,             // Request payload data
  contentType = 'application/json',  // Content type for the request
  params = null,    // Optional URL parameters
) => {
  // Initialize an empty response object
  let response = {};

  // Set request headers
  let headers = {
    'Content-Type': contentType,
  };

  try {
    // Make the POST request using Axios
    const result = await axiosInstance.post(url, data, {
      headers: headers,
      params: params,
      validateStatus: (status) => status >= 200 && status < 500,
    });

    // Extract data from the response
    response = result?.data;
    response.status = result?.data?.status;
    response.message = result?.data?.message;
  } catch (e) {
    // Handle errors and populate the response object accordingly
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

  // Return the response object
  return response;
};

// Function for making a PATCH request using Axios
export const axiosPatch = async (url, data, contentType = 'application/json') => {
  // Initialize an empty response object
  let response = {};

  try {
    // Make the PATCH request using Axios
    const result = await axiosInstance.patch(url, data);

    // Extract data from the response
    response = result.data;
    response.status = result?.data?.status || result?.data?.[0]?.status || result.status;
    response.message = result?.data?.message || result?.data?.[0]?.status;
  } catch (e) {
    // Handle errors and populate the response object accordingly
    response.status = false;
    response.message = 'something went wrong';
    response.data = e;
  }

  // Return the response object
  return response;
};
