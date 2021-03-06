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

  loginUser(payload) {
    return this.httpClient.post("/users/login", payload);
  }

  getUserDetails(payload) {
    return this.httpClient.get("/users/get-user-details", payload);
  }

  changeUserDetails(payload) {
    return this.httpClient.post("/users/change-user-details", payload);
  }

  deleteUser(payload) {
    return this.httpClient.delete("/users/delete", payload);
  }

  addBoard(payload) {
    return this.httpClient.post("/boards/create-board", payload);
  }

  getUserBoards(payload) {
    return this.httpClient.get("/boards/get-user-boards", payload);
  }

  getBoard( params ) {
    return this.httpClient.get("/boards/get-board", { params });
  }

  editBoard(payload) {
    return this.httpClient.post("boards/edit-board", payload);
  }

  addCollaborator(payload) {
    return this.httpClient.post("boards/add-user", payload);
  }

  deleteBoard(params) {
    return this.httpClient.delete("boards/delete-board", { params });
  }

  addColumn(payload) {
    return this.httpClient.post("boards/create-column", payload);
  }

  deleteColumn(params) {
    return this.httpClient.delete("boards/delete-column", { params })
  }

  addTask(payload) {
    return this.httpClient.post("boards/create-task", payload);
  }

  deleteTask(params) {
    return this.httpClient.delete("boards/delete-task", { params })
  }

  editColumn(payload) {
    return this.httpClient.post("boards/edit-column", payload);
  }

  changeTaskColumn(payload) {
    return this.httpClient.post("boards/change-task-column", payload);
  }

  editTask(payload) {
    return this.httpClient.post("boards/edit-task", payload);
  }

}

export default new HttpClient();
