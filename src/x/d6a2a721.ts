
export interface ApiSuccessResponse<T = unknown> {
  success: true;
  data: T;
  message?: string;
  meta?: PaginationMeta;
}

export interface ApiErrorResponse {
  success: false;
  error: {
    code: string;
    message: string;
    details?: unknown;
  };
}

export type ApiResponse<T = unknown> = ApiSuccessResponse<T> | ApiErrorResponse;

export interface PaginationMeta {
  page: number;
  limit: number;
  total: number;
  totalPages: number;
  hasNext: boolean;
  hasPrev: boolean;
}

export interface PaginationQuery {
  page?: number;
  limit?: number;
}

export interface JwtPayload {
  sub: string; 
  email: string;
  role: UserRole_2;
  iat?: number;
  exp?: number;
}

export interface AuthTokens_2 {
  accessToken: string;
  refreshToken: string;
  expiresIn: number;
}

export type UserRole_2 =
  "STUDENT" | "INSTRUCTOR" | "IMMERSION_USER" | "SUPER_ADMIN" | "RECRUIT_USER";

export interface UserPublic_2 {
  id: string;
  email: string;
  name: string | null;
  role: UserRole_2;
  createdAt: Date;
  updatedAt: Date;
}

export interface RequestContext {
  userId: string;
  email: string;
  role: UserRole_2;
}

export interface AppConfig {
  nodeEnv: "development" | "production" | "test";
  port: number;
  jwtSecret: string;
  jwtExpiresIn: string;
  jwtRefreshSecret: string;
  jwtRefreshExpiresIn: string;
  allowedOrigins: string[];
  bcryptRounds: number;
  databaseUrl: string;
  smtpHost: string;
  smtpPort: number;
  smtpUser: string;
  smtpPass: string;
  smtpSenderEmail: string;
  smtpSenderName: string;
  clientUrl: string;
  razorpayKeyId: string;
  razorpayKeySecret: string;
  razorpayWebhookSecret: string;
}
