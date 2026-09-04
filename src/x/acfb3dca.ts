import axios, { AxiosInstance } from "axios";

export const AUTH_KEYS = {
  ACCESS_TOKEN: "authToken",
  REFRESH_TOKEN: "refreshToken",
  USER_DATA: "userData",
};

export const axiosInstance: AxiosInstance = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL,
  timeout: 60000,
  headers: {
    "Content-Type": "application/json",
  },
  withCredentials: true,
});

let isRefreshing = false;
let failedQueue: Array<{
  resolve: (token: string) => void;
  reject: (err: unknown) => void;
}> = [];

const processQueue = (error: unknown, token: string | null = null) => {
  failedQueue.forEach((prom) => {
    if (error) {
      prom.reject(error);
    } else if (token) {
      prom.resolve(token);
    }
  });
  failedQueue = [];
};

axiosInstance.interceptors.request.use(
  (config) => {
    try {
      if (typeof window !== "undefined") {
        const token = localStorage.getItem(AUTH_KEYS.ACCESS_TOKEN);
        if (token && config.headers) {
          config.headers.Authorization = `Bearer ${token}`;
        }
      }
    } catch (e) {
      console.warn("Axios Interceptor: Could not fetch auth token", e);
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  },
);

axiosInstance.interceptors.response.use(
  (response) => response,
  async (error) => {
    if (axios.isAxiosError(error)) {
      if (error.code === "ECONNABORTED" || error.message?.includes("timeout")) {
        error.message =
          "Request timed out. Please check your internet connection or upload smaller files and try again.";
      } else if (error.response?.status === 413) {
        error.message =
          "Uploaded file size is too large. Please make sure documents are under 500 KB each.";
      } else if (error.response?.data) {
        const data = error.response.data;
        let msg = "";
        if (typeof data === "string") {
          if (
            data.includes("413 Request Entity Too Large") ||
            data.toLowerCase().includes("<html")
          ) {
            msg =
              "Uploaded file size is too large for the server. Please ensure each file is under 500 KB.";
          } else {
            msg = data;
          }
        } else if (data && typeof data === "object") {
          const payload = data as Record<string, unknown>;
          const errorObj = payload.error as Record<string, unknown> | undefined;
          const details = (errorObj?.details || payload.details) as
            | Record<string, string[] | string>
            | undefined;

          if (details && typeof details === "object") {
            const firstKey = Object.keys(details)[0];
            if (firstKey) {
              const val = details[firstKey];
              const detailMsg = Array.isArray(val) ? val[0] : String(val);
              if (detailMsg) {
                msg = detailMsg;
              }
            }
          }

          if (!msg) {
            if (payload.message) {
              msg = Array.isArray(payload.message)
                ? payload.message.join(", ")
                : String(payload.message);
            } else if (payload.error) {
              msg =
                typeof payload.error === "string"
                  ? payload.error
                  : String(
                      (payload.error as Record<string, unknown>)?.message || "",
                    );
            } else if (typeof payload.msg === "string") {
              msg = payload.msg;
            } else if (typeof payload.code === "string") {
              msg = payload.code.replace(/_/g, " ");
            }
          }
        }
        if (msg) error.message = msg;
      }
    }

    const originalRequest = error.config;

        if (!originalRequest) {
      return Promise.reject(error);
    }

        const url = originalRequest.url || "";
    const isAuthRoute =
      url.includes("/auth/login") ||
      url.includes("/auth/register") ||
      url.includes("/auth/refresh-token");

        if (
      error.response?.status === 401 &&
      !originalRequest._retry &&
      !isAuthRoute
    ) {
      if (isRefreshing) {
                return new Promise((resolve, reject) => {
          failedQueue.push({
            resolve: (token: string) => {
              if (originalRequest.headers) {
                originalRequest.headers.Authorization = `Bearer ${token}`;
              }
              resolve(axiosInstance(originalRequest));
            },
            reject: (err: unknown) => {
              reject(err);
            },
          });
        });
      }

      originalRequest._retry = true;
      isRefreshing = true;

      try {
        let refreshToken: string | null = null;
        if (typeof window !== "undefined") {
          refreshToken = localStorage.getItem(AUTH_KEYS.REFRESH_TOKEN);
        }

        if (!refreshToken) {
          throw new Error("No refresh token available");
        }

                const response = await axios.post(
          "/auth/refresh-token",
          { refreshToken },
          { baseURL: axiosInstance.defaults.baseURL },
        );

        const { token, newRefreshToken } = response.data;

        if (token) {
          if (typeof window !== "undefined") {
            localStorage.setItem(AUTH_KEYS.ACCESS_TOKEN, token);
            if (newRefreshToken) {
              localStorage.setItem(AUTH_KEYS.REFRESH_TOKEN, newRefreshToken);
            }
          }

                    if (originalRequest.headers) {
            originalRequest.headers.Authorization = `Bearer ${token}`;
          }

          processQueue(null, token);
          return axiosInstance(originalRequest);
        } else {
          throw new Error("Invalid token response from refresh endpoint");
        }
      } catch (refreshError) {
        processQueue(refreshError, null);

                if (typeof window !== "undefined") {
          localStorage.removeItem(AUTH_KEYS.ACCESS_TOKEN);
          localStorage.removeItem(AUTH_KEYS.REFRESH_TOKEN);
          localStorage.removeItem(AUTH_KEYS.USER_DATA);

          window.location.replace("/login");
        }
        return Promise.reject(refreshError);
      } finally {
        isRefreshing = false;
      }
    }

    return Promise.reject(error);
  },
);
