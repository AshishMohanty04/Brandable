export interface UserDTO {
  id: string;
  name: string;
  email?: string;
  phone?: string;
  address?: string;
  createdAt?: string;
}

export interface AuthResponseDTO {
  success: boolean;
  message: string;
  token?: string;
  user?: UserDTO;
}

export interface LoginPayload {
  emailOrPhone: string;
  password?: string;
}

export interface SignupPayload {
  name: string;
  email?: string;
  phone?: string;
  password?: string;
  address?: string;
}
