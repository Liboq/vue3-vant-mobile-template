import axios, {
  Axios,
  AxiosError,
  AxiosRequestConfig,
  AxiosResponse,
} from "axios";
import type { Response } from "./types";
import { Toast } from "vant";
import router from "@/router";
axios.defaults.timeout = 1000 * 60;
axios.defaults.headers.post["content-Type"] =
  "application/x-www-form-urlencoded;charset=UTF-8";

//   创建 axios 实例
const service = axios.create({
  baseURL: import.meta.env.VITE_APP_API_BASE_URL,
});

// 请求拦截器
service.interceptors.request.use(
  (config: AxiosRequestConfig) => {
    config.headers = {
      ...config.headers,
      // 自定义headers 比如 token
    };
    return config;
  },
  (error: AxiosError) => {
    return Promise.reject(error);
  }
);
// 响应拦截器
service.interceptors.response.use(
  (response: AxiosResponse<Response>) => {
    const { code, message } = response.data;
    let errMsg = "";
    switch (code) {
      case 0:
        break;
      case 1: // token过期
        errMsg = "Token expired";
        router.push("/login");
        break;
      case 2:
        errMsg = "No permission";
        break;
      default:
        errMsg = message;
        break;
    }
    if (errMsg) Toast.fail(errMsg);
    return response;
  },
  (err: AxiosError) => {
    Toast.fail("Network Error...");
    return Promise.reject(err);
  }
);
export type { AxiosRequestConfig, AxiosResponse };

export default service;
