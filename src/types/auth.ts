export interface LoginResponse {
    access_token: string
    token_type: string
}

export interface RegisterResponse {
    message: string
}

export interface UserResponse {
    id: number
    username: string
    email: string
}