import HttpClient from "./HttpClient";

export const registerWorkTypes = (patientData) => {
  return new Promise((resolve, reject) => {
    const headers = {
      "Content-Type": "application/json",
    };
    HttpClient.post(
      `"http://localhost:3000/api/lubrisernorte/v1/work-types/`,
      patientData,
      headers
    )
      .then((response) => {
        resolve(response);
      })
      .catch((error) => {
        resolve(error.response);
      });
  });
};

export const getAllWorkTypes = () =>
  new Promise((resolve, reject) => {
    const headers = {
      "Content-Type": "application/json",
    };
    HttpClient.get(
      "http://localhost:3000/api/lubrisernorte/v1/work-types/",
      headers
    )
      .then((response) => {
        resolve(response);
      })
      .catch((error) => {
        resolve(error.response);
        reject(error.response);
      });
  });

export const getWorkTypesById = (id) =>
  new Promise((resolve, reject) => {
    const headers = {
      "Content-Type": "application/json",
    };
    HttpClient.get(
      `http://localhost:3000/api/lubrisernorte/v1/work-types/${id}`,

      headers
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

export const deleteWorkTypes = (id) =>
  new Promise((resolve, reject) => {
    const headers = {
      "Content-Type": "application/json",
    };
    HttpClient.delete(
      `http://localhost:3000/api/lubrisernorte/v1/work-types/${id}`,
      headers
    )
      .then((response) => {
        resolve(response);
      })
      .catch((error) => {
        resolve(error.response);
      });
  });

export const updateWorkTypes = (id, body) =>
  new Promise((resolve, reject) => {
    const headers = {
      "Content-Type": "application/json",
    };
    HttpClient.put(
      `http://localhost:3000/api/lubrisernorte/v1/work-types/${id}`,
      body,
      headers``
    )
      .then((response) => {
        resolve(response);
      })
      .catch((error) => {
        resolve(error.response);
      });
  });
