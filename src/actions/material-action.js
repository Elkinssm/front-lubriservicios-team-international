import HttpClient from './HttpClient';

export const registerMaterial = (materialtData) => new Promise((resolve, reject) => {
  const headers = {
    'Content-Type': 'application/json',
  };
  HttpClient.post(
    'http://localhost:3000/api/lubrisernorte/v1/materials/',
    materialtData,
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

export const getAllMaterials = () => new Promise((resolve, reject) => {
  const headers = {
    'Content-Type': 'application/json',
  };
  HttpClient.get(
    'http://localhost:3000/api/lubrisernorte/v1/materials/',
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

export const getMaterialById = (id) => new Promise((resolve, reject) => {
  const headers = {
    'Content-Type': 'application/json',
  };
  HttpClient.get(
    `http://localhost:3000/api/lubrisernorte/v1/materials/${id}`,

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

export const deleteMaterials = (id) => new Promise((resolve, reject) => {
  const headers = {
    'Content-Type': 'application/json',
  };
  HttpClient.delete(
    `http://localhost:3000/api/lubrisernorte/v1/materials/${id}`,
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

export const updateMaterials = (id, body) => new Promise((resolve, reject) => {
  const headers = {
    'Content-Type': 'application/json',
  };
  HttpClient.patch(
    `http://localhost:3000/api/lubrisernorte/v1/materials/${id}`,
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
