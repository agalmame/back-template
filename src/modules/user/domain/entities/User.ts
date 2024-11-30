

export interface User {
    id: string;
    email: string;
    name: string;
    password: string;
    verified: boolean;
    refreshToken?: string;
    verifyToken?: string;
    resetToken?: string;
    resetExpirs?: Date;
    createdAt?: Date;
    updatedAt?: Date;
}

