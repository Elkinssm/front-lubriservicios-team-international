import HttpClient from './HttpClient';

export const registerWorkMaterials = (patientData) => new Promise((resolve, reject) => {
  const headers = {
    'Content-Type': 'application/json',
  };
  HttpClient.post(
    'http://localhost:3000/api/lubrisernorte/v1/work-materials/',
    patientData,
    headers,
  )
    .then((response) => {
      resolve(response);
    })
    .catch((error) => {
      resolve(error.response);
    });
});

export const getAllWorkMaterials = () => new Promise((resolve, reject) => {
  const headers = {
    'Content-Type': 'application/json',
  };
  HttpClient.get(
    'http://localhost:3000/api/lubrisernorte/v1/work-materials/',
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

export const getWorkMaterialId = (id) => new Promise((resolve, reject) => {
  const headers = {
    'Content-Type': 'application/json',
  };
  HttpClient.get(
    `http://localhost:3000/api/lubrisernorte/v1/work-materials/${id}`,

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

export const deleteWorkMaterials = (id) => new Promise((resolve, reject) => {
  const headers = {
    'Content-Type': 'application/json',
  };
  HttpClient.delete(
    `http://localhost:3000/api/lubrisernorte/v1/work-materials/${id}`,
    headers,
  )
    .then((response) => {
      resolve(response);
    })
    .catch((error) => {
      resolve(error.response);
    });
});

export const updateWorkMaterials = (id, body) => new Promise((resolve, reject) => {
  const headers = {
    'Content-Type': 'application/json',
  };
  HttpClient.put(
    `http://localhost:3000/api/lubrisernorte/v1/work-materials/${id}`,
    body,
    headers``,
  )
    .then((response) => {
      resolve(response);
    })
    .catch((error) => {
      resolve(error.response);
    });
});
