export enum UserRole {
  TEACHER = 'RL00001',
  STUDENT = 'RL00002',
  PARENT = 'RL00003',
  CAMPUS_MANAGER = 'RL00004',
  ADMIN = 'RL00005'
}

export interface UserAttributes {
  userId?: number;
  name: string;
  userName: string;
  email: string;
  password: string;
  phone?: number;
  roleId: UserRole | string;
  teacherId?: number | null;
  studentId?: number | null;
  parentId?: number | null;
  campusManagerId?: number | null;
  campusId?: number | null;
  activate?: boolean;
  checkLogin?: boolean;
  createdAt?: Date;
}
