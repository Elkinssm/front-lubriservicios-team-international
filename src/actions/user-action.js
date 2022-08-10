import HttpClient from './HttpClient';

export const getAllUsers = () => new Promise((resolve, reject) => {
  const headers = {
    'Content-Type': 'application/json',
  };
  HttpClient.get('http://localhost:3000/api/lubrisernorte/v1/users', headers)
    .then((response) => {
      resolve(response);
    })
    .catch((error) => {
      resolve(error.response);
      reject(error.response);
    });
});

export const getUserById = (id) => new Promise((resolve, reject) => {
  const headers = {
    'Content-Type': 'application/json',
  };
  HttpClient.get(
    `http://localhost:3000/api/lubrisernorte/v1/users/${id}`,

    headers,
  )
    .then((response) => {
      resolve(response);
    })
    .catch((error) => {
      reject(error.response);
      resolve(error.response);
    });
});

export const deleteUsers = (id) => new Promise((resolve, reject) => {
  const headers = {
    'Content-Type': 'application/json',
  };
  HttpClient.delete(
    `http://localhost:3000/api/lubrisernorte/v1/users/${id}`,
    headers,
  )
    .then((response) => {
      resolve(response);
    })
    .catch((error) => {
      resolve(error.response);
      reject(error.response);
    });
});

export const updateUsers = (id, body) => new Promise((resolve, reject) => {
  const headers = {
    'Content-Type': 'application/json',
  };
  HttpClient.put(
    `http://localhost:3000/api/lubrisernorte/v1/users/${id}`,
    body,
    headers``,
  )
    .then((response) => {
      resolve(response);
    })
    .catch((error) => {
      resolve(error.response);
      reject(error.response);
    });
});
