const baseUrl = 'http://localhost:8080/api';
import { getCookie } from 'cookies-next';

export const customFetch = (endpoint, options = {}) => {
  const headers = {
    Authorization: 'Bearer ' + getCookie('jwtToken'),
    'Content-Type': 'application/json',
    ...options.headers
  };

  return fetch(`${baseUrl}${endpoint}`, {
    ...options,
    headers
  });
};
