import axios from "axios";
import { handleError } from "./apiutil";

const instance = axios.create({
  // baseURL: process.env.APITestServer
});

instance.interceptors.request.use((config:any) => {
  const token = localStorage.getItem("access-token");
  if (token !== null) {
    config.headers["x-acc-op"] = token;
  }

  return config;
}, (error) => {
  return Promise.reject(error);
});

instance.interceptors.response.use(
    (response) => {
      return response;
    },
    (error) => {
      if (error?.response) {
        handleError(error.response);
        return Promise.reject(error.response);
      }
    }
  );
  
  export function get(url:any, params = {}) {
    return new Promise((resolve, reject) => {
      instance({
        url: url,
        params: params,
      })
        .then((res) => resolve(res.data))
        .catch((err) => reject(err));
    });
  }
  
  export function post(url:any, data = {}) {
    return new Promise((resolve, reject) => {
      instance({
        url: url,
        method: "post",
        data: data,
      })
        .then((res) => resolve(res.data))
        .catch((err) => reject(err));
    });
  }
  
  export function postUpload(url:any, formData:any) {
    return new Promise((resolve, reject) => {
      instance({
        url: url,
        method: "post",
        data: formData,
      })
        .then((res) => resolve(res.data))
        .catch((err) => reject(err));
    });
  }

export default instance;