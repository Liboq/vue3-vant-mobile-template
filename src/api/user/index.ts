// src/api/user/index.ts

import { Response } from "@/utils/http/types";
import http from "@/utils/http";

export interface LoginParams {
  username: string;
  password: string;
}

interface UserInfo {
  id: number;
  username: string;
  mobile: number;
  email: string;
}

export default {
  async login(params: LoginParams) {
    return await http.post<Response<UserInfo>>("/user/login", params);
  },
};
