import axios from 'axios';

const axiosInstance = axios.create({
  // TODO: Use environment variable for base URL
  baseURL: process.env.NEXT_PUBLIC_API_BASE_URL || 'http://localhost:3001', // Assuming backend runs on 3001
  headers: {
    'Content-Type': 'application/json',
  },
});

// Request interceptor to add the auth token to headers
axiosInstance.interceptors.request.use(
  (config) => {
    let token: string | null = null;
    // Ensure this runs only client-side where localStorage is available
    if (typeof window !== 'undefined') {
      token = localStorage.getItem('authToken'); // Use the same key as in authSlice
    }

    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    // Do something with request error
    return Promise.reject(error);
  }
);

// Response interceptor to handle errors, e.g., 401 Unauthorized
axiosInstance.interceptors.response.use(
  (response) => response, // Simply return successful responses
  (error) => {
    // Check if the error is a 401 Unauthorized response
    if (error.response && error.response.status === 401) {
      console.error('Axios Interceptor: Unauthorized access (401). Token might be invalid or expired.');
      // Remove the invalid token from storage
      if (typeof window !== 'undefined') {
         localStorage.removeItem('authToken');
         // Optionally dispatch logout action or redirect the user to login
         // This might require access to the store or router, which can be complex here.
         // A simple redirect might be the easiest approach if direct store access is hard.
         // Example: window.location.href = '/login'; // Force reload/redirect
         // TODO: Implement a cleaner logout mechanism if possible (e.g., custom event or context)
      }
      // Optionally, you could reject the promise with a custom error message
      // return Promise.reject(new Error('Session expired. Please log in again.'));
    }
    // Return the error promise for other errors
    return Promise.reject(error);
  }
);

export default axiosInstance;