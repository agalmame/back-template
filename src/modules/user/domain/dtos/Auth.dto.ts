export interface RegisterUserDTO {
    email: string;
    password: string;
    name: string;
  }
  
  export interface SignInUserDTO {
    email: string;
    password: string;
  }
  
  export interface AuthResponseDTO {
    accessToken: string;
  }
  
  export interface UserDTO {
    id: string;
    email: string;
    name: string;
    verified: boolean;
    createdAt?: Date;
    updatedAt?: Date;
  }
  