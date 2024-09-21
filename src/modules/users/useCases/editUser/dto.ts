export interface EditUserRequest {
  userId: string;
  firstName: string;
  lastName: string;
  email?: string;
  ci?: string;
  isPlayer?: boolean;
}
