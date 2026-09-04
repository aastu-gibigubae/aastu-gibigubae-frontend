/**
 * 'visitor' isn't represented here — an unauthenticated request simply has
 * no User. These are the roles the backend SRS defines for authenticated
 * users (2.2 User Classes): Registered User, Sub-Admin, Admin.
 */
export type Role = 'registered' | 'sub_admin' | 'admin';

export interface User {
  id: string;
  firstName: string;
  lastName: string;
  phone: string;
  role: Role;
  department?: string;
  studentId?: string;
}

export interface AuthSession {
  user: User;
  accessToken: string;
}

export interface LoginPayload {
  phone: string;
  password: string;
}

export interface RegisterPayload {
  firstName: string;
  lastName: string;
  phone: string;
  gender: 'male' | 'female';
  department: string;
  studentId: string;
  password: string;
}
