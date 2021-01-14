/* eslint-disable import/no-default-export */
import axios from "axios";

class HttpClient {
  constructor() {
    this.httpClient = axios.create({
      baseURL: process.env.REACT_APP_BACKEND_URL,
    });

    this.httpClient.interceptors.request.use(
      async (config) => {
        const token = localStorage.getItem("accessToken");
        if (token) config.headers.Authorization = `Bearer ${token}`;
        return Promise.resolve(config);
      },
      (error) => Promise.reject(error)
    );

    this.httpClient.interceptors.response.use(
      async (response) => Promise.resolve(response.data),
      async (error) => {
        const originalRequest = error.config;
        if (!error.response || originalRequest._retry) {
          return Promise.reject(error);
        }
        const status = error.response.status;
        if (status !== 401) return Promise.reject(error);

        originalRequest._retry = true;

        const accessToken = localStorage.getItem("accessToken");
        const refreshToken = localStorage.getItem("refreshToken");

        if (!refreshToken) return;

        return axios
          .post(
            `${process.env.REACT_APP_BACKEND_URL}/api/users/refresh-token`,
            {
              accessToken,
              refreshToken,
            }
          )
          .then((result) => {
            const { accessToken, refreshToken } = result.data;
            localStorage.setItem("accessToken", accessToken);
            localStorage.setItem("refreshToken", refreshToken);
            originalRequest.headers.Authorization = `Bearer ${accessToken}`;
            return axios(originalRequest);
          });
      }
    );
  }

  registerUser(payload) {
    return this.httpClient.post("/users/register", payload);
  }
}



export default new HttpClient();
