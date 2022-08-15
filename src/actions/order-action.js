import HttpClient from './HttpClient';

export const registerOrder = (patientData) => new Promise((resolve, reject) => {
  const headers = {
    'Content-Type': 'application/json',
  };
  HttpClient.post(
    'http://localhost:3000/api/lubrisernorte/v1/orders/',
    patientData,
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

export const getAllOrders = () => new Promise((resolve, reject) => {
  const headers = {
    'Content-Type': 'application/json',
  };
  HttpClient.get(
    'http://localhost:3000/api/lubrisernorte/v1/orders/',
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

export const getOrderById = (id) => new Promise((resolve, reject) => {
  const headers = {
    'Content-Type': 'application/json',
  };
  HttpClient.get(
    `http://localhost:3000/api/lubrisernorte/v1/orders/${id}`,

    headers,
  )
    .then((response) => {
      if (response.data.result) {
        resolve(response);
      }
      resolve(response);
    })
    .catch((error) => {
      reject(error.response);
      resolve(error.response);
    });
});

export const deleteOrders = (id) => new Promise((resolve, reject) => {
  const headers = {
    'Content-Type': 'application/json',
  };
  HttpClient.delete(
    `http://localhost:3000/api/lubrisernorte/v1/orders/${id}`,
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

export const updateOrders = (id, body) => new Promise((resolve, reject) => {
  const headers = {
    'Content-Type': 'application/json',
  };
  HttpClient.patch(
    `http://localhost:3000/api/lubrisernorte/v1/orders/${id}`,
    body,
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
