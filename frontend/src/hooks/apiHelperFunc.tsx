import axios from 'axios';

const baseUrl = 'http://142.93.161.127:3000/api'; // Replace with actual base URL


// Assuming JSON response format
interface LoginResponse {
    token: string;
    user: {
     
      id: number;
      username: string;
      email: string;

    };
  }
  
  interface RegistrationResponse {
    message: string;
  }
  

export const login = async (username: string, password: string) => {
  try {
    const response = await axios.post(`${baseUrl}/login`, {
      username,
      password,
    });
    const loginData: LoginResponse = response.data; // Cast to LoginResponse
    return loginData;
  } catch (error) {
    console.error('Login error:', error);
    throw error; // Or handle the error differently (e.g., return a specific error message)
  }
};

export const register = async (username: string, password: string) => {
  try {
    const response = await axios.post(`${baseUrl}/register`, {
      username,
      email,
      password,
    });
    const registrationData: RegistrationResponse = response.data; // Cast to RegistrationResponse
    return registrationData;
  } catch (error) {
    console.error('Registration error:', error);
    throw error; // Or handle the error differently (e.g., return a specific error message)
  }
};
