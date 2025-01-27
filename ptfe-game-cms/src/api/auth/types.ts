export interface LoginRequest {
  email: string;
  password: string;
}

export interface UpdateUserRequest {
  id: string,
  fullname: string;
  email: string;
  newPassword: string;
  repeatNewPassword: string;
}
export interface RegisterRequest {
  name: '',
  email: '',
  password: '',
  repeatPassword: ''
}
export interface ResetPasswodPayload {
  resetToken: string;
  newPassword: string;
  repeatNewPassword: string;
}
