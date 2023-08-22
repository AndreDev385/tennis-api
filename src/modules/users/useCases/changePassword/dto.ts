export interface ChangeForgotterPasswordRequest {
    code: string;
    newPassword: string;
}

export interface ChangePasswordRequest {
    userId: string;
    newPassword: string;
}
