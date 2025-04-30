import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import axiosInstance from '../../axios'; // Adjust path if necessary

// Define the shape of the user object based on your backend response
interface User {
  id: string;
  email: string;
  // Add other relevant user fields
}

// Define the shape of the authentication state
interface AuthState {
  user: User | null;
  token: string | null;
  isAuthenticated: boolean;
  loading: 'idle' | 'pending' | 'succeeded' | 'failed';
  error: string | null;
  isInitialized: boolean; // Added for initialization tracking
  // Add registration status if needed
  registrationLoading: 'idle' | 'pending' | 'succeeded' | 'failed';
  registrationError: string | null;
}

// Define the initial state
const initialState: AuthState = {
  user: null,
  token: null, // Initialize as null, will be loaded client-side
  isAuthenticated: false, // Initialize as false
  loading: 'idle',
  error: null,
  isInitialized: false, // Start as false
  registrationLoading: 'idle',
  registrationError: null,
};

// Define login credentials type
interface LoginCredentials {
  email: string;
  password: string;
}

// Define registration data type
interface RegistrationData {
  email: string;
  password: string;
  // Add other registration fields if required by your backend
}

// Async thunk for user login
export const loginUser = createAsyncThunk(
  'auth/loginUser',
  async (credentials: LoginCredentials, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.post<{ access_token: string }>('/auth/login', credentials);
      // Store the token in localStorage
      if (typeof window !== 'undefined') {
        localStorage.setItem('token', response.data.access_token);
      }
      // You might want to decode the token here to get user info or fetch it separately
      return response.data;
    } catch (error: any) {
      // Handle specific error responses from the backend if available
      const errorMessage = error.response?.data?.message || error.message || 'Login failed';
      return rejectWithValue(errorMessage);
    }
  }
);

// Async thunk for user registration
export const registerUser = createAsyncThunk(
  'auth/registerUser',
  async (userData: RegistrationData, { rejectWithValue }) => {
    try {
      // Assuming the backend returns the created user object (without sensitive data like password)
      const response = await axiosInstance.post<User>('/auth/register', userData);
      return response.data; // Return the created user data
    } catch (error: any) {
      // Handle specific error responses from the backend if available
      const errorMessage = error.response?.data?.message || error.message || 'Registration failed';
      return rejectWithValue(errorMessage);
    }
  }
);

// Create the auth slice
const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    // Reducer to handle initialization from localStorage (client-side only)
    initializeAuth(state) {
      if (typeof window !== 'undefined') { // Ensure this runs only client-side
        const token = localStorage.getItem('authToken');
        if (token) {
          // TODO: Decode token to get user info (or fetch profile)
          // For now, just set token and isAuthenticated
          state.token = token;
          state.isAuthenticated = true;
          // state.user = decodedUserInfo; // Add later
        }
      }
      state.isInitialized = true; // Mark as initialized
    },
    // Reducer to handle logout
    logout: (state) => {
      state.user = null;
      state.token = null;
      state.isAuthenticated = false;
      state.loading = 'idle';
      state.error = null;
      // Clear the token from localStorage
      if (typeof window !== 'undefined') {
        localStorage.removeItem('authToken'); // Use 'authToken' key
      }
    },
    // Potentially add other reducers like setting user info from decoded token
  },
  extraReducers: (builder) => {
    builder
      // Handle loginUser states
      .addCase(loginUser.pending, (state) => {
        state.loading = 'pending';
        state.error = null;
      })
      .addCase(loginUser.fulfilled, (state, action: PayloadAction<{ access_token: string }>) => {
        const token = action.payload.access_token;
        state.token = token;
        state.isAuthenticated = true;
        state.loading = 'succeeded';
        state.error = null;
        // TODO: Set user state - decode token or fetch user profile
        // Example: state.user = decodeToken(action.payload.access_token);
        // Save token to localStorage
        if (typeof window !== 'undefined') {
          localStorage.setItem('authToken', token); // Use 'authToken' key
        }
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.loading = 'failed';
        state.error = action.payload as string; // Error message from rejectWithValue
        state.isAuthenticated = false;
        state.token = null;
        state.user = null;
      })
      // Handle registerUser states
      .addCase(registerUser.pending, (state) => {
        state.registrationLoading = 'pending';
        state.registrationError = null;
      })
      .addCase(registerUser.fulfilled, (state, action: PayloadAction<User>) => {
        state.registrationLoading = 'succeeded';
        // Registration successful, but user is not automatically logged in.
        // You might want to show a success message or navigate the user.
        // state.user = action.payload; // Optionally store registered user info if needed immediately
        state.registrationError = null;
      })
      .addCase(registerUser.rejected, (state, action) => {
        state.registrationLoading = 'failed';
        state.registrationError = action.payload as string; // Error message from rejectWithValue
      });
  },
});

// Export the logout action
export const { logout, initializeAuth } = authSlice.actions; // Added initializeAuth

// Export the reducer
export default authSlice.reducer;