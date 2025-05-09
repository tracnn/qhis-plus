export interface IBhxhAuthService {
  getToken(): Promise<string>;
  getIdToken(): Promise<string>;
} 