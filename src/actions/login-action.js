import axios from 'axios';

export const login = (loginData) => new Promise((resolve, reject) => {
  const headers = {
    'Content-Type': 'application/json',
  };
  axios
    .post(
      'http://localhost:3000/api/lubrisernorte/v1/auth/login',
      loginData,
      headers,
    )
    .then((response) => {
      resolve(response);
    })
    .catch((error) => {
      resolve(error.response);
    });
});

export const register = (registertData) => new Promise((resolve, reject) => {
  const headers = {
    'Content-Type': 'application/json',
  };
  axios
    .post(
      'http://localhost:3000/api/lubrisernorte/v1/users/',
      registertData,
      headers,
    )
    .then((response) => {
      resolve(response);
    })
    .catch((error) => {
      resolve(error.response);
    });
});
