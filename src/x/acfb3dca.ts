import axios, { AxiosInstance } from "axios";

export const AUTH_KEYS = {
  ACCESS_TOKEN: "authToken",
  REFRESH_TOKEN: "refreshToken",
  USER_DATA: "userData",
};

export const axiosInstance: AxiosInstance = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL,
  timeout: 120000,
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
      const isTimeout =
        error.code === "ECONNABORTED" ||
        error.message?.toLowerCase().includes("timeout") ||
        error.response?.status === 504;

      const is413 =
        error.response?.status === 413 ||
        (typeof error.response?.data === "string" &&
          (error.response.data.includes("413 Request Entity Too Large") ||
            error.response.data.toLowerCase().includes("entity too large")));

      if (isTimeout) {
        const timeoutMsg =
          "अनुरोध का समय समाप्त हो गया (Request timed out). कृपया इंटरनेट कनेक्शन जांचें और पुनः प्रयास करें।";
        error.message = timeoutMsg;
        if (error.response) {
          error.response.data = { message: timeoutMsg };
        }
      } else if (is413) {
        const largeMsg =
          "फ़ाइल का साइज़ बहुत बड़ा है (File size too large). कृपया छोटी फ़ोटो या दस्तावेज़ अपलोड करें।";
        error.message = largeMsg;
        if (error.response) {
          error.response.data = { message: largeMsg };
        }
      } else if (typeof error.response?.data === "string") {
        if (error.response.data.toLowerCase().includes("<html")) {
          const fallbackMsg =
            error.response.status === 502
              ? "सर्वर अस्थायी रूप से अनुपलब्ध है (502 Bad Gateway). कृपया कुछ क्षण बाद पुनः प्रयास करें।"
              : `सर्वर त्रुटि (${error.response.status}). कृपया पुनः प्रयास करें।`;
          error.message = fallbackMsg;
          error.response.data = { message: fallbackMsg };
        } else {
          error.message = error.response.data;
        }
      } else if (error.response?.data && typeof error.response.data === "object") {
        const payload = error.response.data as Record<string, unknown>;
        const errorObj = payload.error as Record<string, unknown> | undefined;
        const details = (errorObj?.details || payload.details) as
          | Record<string, string[] | string>
          | undefined;

        let msg = "";
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
