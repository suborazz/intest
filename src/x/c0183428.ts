export type UserRole =
  | "STUDENT"
  | "INSTITUTE"
  | "INSTRUCTOR"
  | "IMMERSION_USER"
  | "SUPER_ADMIN"
  | "RECRUIT_USER";

export interface UserPublic {
  id: string;
  email: string;
  mobile?: string;
  name: string | null;
  registrationNo?: string | null;
  role: UserRole;
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
  studentRegistration?: { id: string; deletedAt: string | null } | null;
  instructorRegistration?: { id: string; deletedAt: string | null } | null;
  immersionParticipantProfile?: { id: string } | null;
  recruitProfile?: { id: string } | null;
}

export interface AuthTokens {
  accessToken: string;
  refreshToken: string;
  expiresIn: number;
}

export interface GenericApiResponse<T = undefined> {
  success: boolean;
  message?: string;
  data?: T;
}

export interface LoginPayload {
  email: string;
  password: string;
}

export interface LoginResponseData {
  user: UserPublic;
  tokens: AuthTokens;
}

export type LoginResponse = GenericApiResponse<LoginResponseData>;

export interface RegisterPayload {
  email: string;
  password: string;
  name?: string;
  role?: UserRole;
}

export interface RegisterResponseData {
  user: UserPublic;
  tokens: AuthTokens;
}

export type RegisterResponse = GenericApiResponse<RegisterResponseData>;

export interface ProfileResponseData {
  user: UserPublic;
}

export type ProfileResponse = GenericApiResponse<ProfileResponseData>;

export interface RefreshPayload {
  refreshToken: string;
}

export interface RefreshResponseData {
  accessToken: string;
  expiresIn: number;
}

export type RefreshResponse = GenericApiResponse<RefreshResponseData>;

export interface ForgotPasswordPayload {
  email: string;
}

export type ForgotPasswordResponse = GenericApiResponse;

export interface ResetPasswordPayload {
  token: string;
  password: string;
}

export type ResetPasswordResponse = GenericApiResponse;

export interface ChangePasswordPayload {
      currentPassword?: string;
  newPassword: string;
}

export type ChangePasswordResponse = GenericApiResponse;

export type LogoutResponse = GenericApiResponse;
