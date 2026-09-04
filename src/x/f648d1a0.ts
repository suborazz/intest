import { ENDPOINTS } from "@/x/51415e35";
import { AUTH_KEYS, axiosInstance } from "@/x/acfb3dca";
import {
  ChangePasswordPayload,
  ChangePasswordResponse,
  ForgotPasswordPayload,
  ForgotPasswordResponse,
  LoginPayload,
  LoginResponse,
  LogoutResponse,
  ProfileResponse,
  RefreshPayload,
  RefreshResponse,
  RegisterPayload,
  RegisterResponse,
  ResetPasswordPayload,
  ResetPasswordResponse,
} from "@/x/c0183428";

export interface IAuthService {
    login: (payload: LoginPayload) => Promise<LoginResponse>;

    register: (payload: RegisterPayload) => Promise<RegisterResponse>;

    getUserProfile: () => Promise<ProfileResponse>;

    logout: () => Promise<LogoutResponse>;

    forgotPassword: (
    payload: ForgotPasswordPayload,
  ) => Promise<ForgotPasswordResponse>;

    resetPassword: (
    payload: ResetPasswordPayload,
  ) => Promise<ResetPasswordResponse>;

    changePassword: (
    payload: ChangePasswordPayload,
  ) => Promise<ChangePasswordResponse>;

    refresh: (payload: RefreshPayload) => Promise<RefreshResponse>;
}

function setCookie(name: string, value: string, days = 7) {
  if (typeof window === "undefined") return;
  const expires = new Date(Date.now() + days * 864e5).toUTCString();
  const secure = typeof window !== "undefined" && window.location.protocol === "https:" ? "; Secure" : "";
  document.cookie = `${name}=${encodeURIComponent(value)}; expires=${expires}; path=/; SameSite=Lax${secure}`;
}

function removeCookie(name: string) {
  if (typeof window === "undefined") return;
  document.cookie = `${name}=; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT`;
}

function persistSession(resData: LoginResponse | RegisterResponse) {
  if (!resData.success || !resData.data) return;
  if (typeof window === "undefined") return;

  localStorage.setItem(AUTH_KEYS.ACCESS_TOKEN, resData.data.tokens.accessToken);
  localStorage.setItem(
    AUTH_KEYS.REFRESH_TOKEN,
    resData.data.tokens.refreshToken,
  );
  localStorage.setItem(AUTH_KEYS.USER_DATA, JSON.stringify(resData.data.user));

    setCookie("access_token", resData.data.tokens.accessToken);
  setCookie("user_role", resData.data.user.role);
}

export const AuthService: IAuthService = {
    async login(payload) {
    const response = await axiosInstance.post<LoginResponse>(
      ENDPOINTS.AUTH.LOGIN,
      payload,
    );
    const resData = response.data;

    persistSession(resData);
    return resData;
  },

    async register(payload) {
    const response = await axiosInstance.post<RegisterResponse>(
      ENDPOINTS.AUTH.REGISTER,
      payload,
    );
    const resData = response.data;

    persistSession(resData);
    return resData;
  },

    async getUserProfile() {
    const response = await axiosInstance.get<ProfileResponse>(
      ENDPOINTS.AUTH.ME,
    );
    return response.data;
  },

    async logout() {
    const response = await axiosInstance.post<LogoutResponse>(
      ENDPOINTS.AUTH.LOGOUT,
    );
    if (typeof window !== "undefined") {
      localStorage.removeItem(AUTH_KEYS.ACCESS_TOKEN);
      localStorage.removeItem(AUTH_KEYS.REFRESH_TOKEN);
      localStorage.removeItem(AUTH_KEYS.USER_DATA);

            removeCookie("access_token");
      removeCookie("user_role");
    }
    return response.data;
  },

    async forgotPassword(payload) {
    const response = await axiosInstance.post<ForgotPasswordResponse>(
      ENDPOINTS.AUTH.FORGOT_PASSWORD,
      payload,
    );
    return response.data;
  },

    async resetPassword(payload) {
    const response = await axiosInstance.post<ResetPasswordResponse>(
      ENDPOINTS.AUTH.RESET_PASSWORD,
      payload,
    );
    return response.data;
  },

    async changePassword(payload) {
    const response = await axiosInstance.post<ChangePasswordResponse>(
      ENDPOINTS.AUTH.CHANGE_PASSWORD,
      payload,
    );
    return response.data;
  },

    async refresh(payload) {
    const response = await axiosInstance.post<RefreshResponse>(
      ENDPOINTS.AUTH.REFRESH,
      payload,
    );
    return response.data;
  },
};
