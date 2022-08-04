import HttpClient from "./HttpClient";

export const registerOrderWorkTypes = (patientData) => {
  return new Promise((resolve, reject) => {
    const headers = {
      "Content-Type": "application/json",
    };
    HttpClient.post(
      `"http://localhost:3000/api/lubrisernorte/v1/order-work-types/`,
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

export const getAllOrderWorkTypes = () =>
  new Promise((resolve, reject) => {
    const headers = {
      "Content-Type": "application/json",
    };
    HttpClient.get(
      "http://localhost:3000/api/lubrisernorte/v1/order-work-types/",
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

export const getOrderWorkTypesById = (id) =>
  new Promise((resolve, reject) => {
    const headers = {
      "Content-Type": "application/json",
    };
    HttpClient.get(
      `http://localhost:3000/api/lubrisernorte/v1/order-work-types/${id}`,

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

export const deleteOrderWorkTypes = (id) =>
  new Promise((resolve, reject) => {
    const headers = {
      "Content-Type": "application/json",
    };
    HttpClient.delete(
      `http://localhost:3000/api/lubrisernorte/v1/order-work-types/${id}`,
      headers
    )
      .then((response) => {
        resolve(response);
      })
      .catch((error) => {
        resolve(error.response);
      });
  });

export const updateOrderWorkTypes = (id, body) =>
  new Promise((resolve, reject) => {
    const headers = {
      "Content-Type": "application/json",
    };
    HttpClient.put(
      `http://localhost:3000/api/lubrisernorte/v1/order-work-types/${id}`,
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
