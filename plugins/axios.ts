import axios from 'axios';

export default defineNuxtPlugin(() => {
  const axiosInstance = axios.create({
    baseURL: 'http://localhost:3000/api', // Set your API base URL
  });

  return {
    provide: {
      axios: axiosInstance,
    },
  };
});
