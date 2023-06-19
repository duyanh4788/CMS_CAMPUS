export interface TeacherInterface {
  teacherId?: number;
  name?: string;
  email?: string;
  userName?: string;
  password?: string;
  gender?: string;
  dateOfBirth?: Date;
  country?: string;
  timeZone?: string;
  startDate?: Date;
  status?: string;
  activate?: boolean;
  resignation?: boolean;
  resume?: string;
  certificate?: string;
  contract?: string;
  basicPoint?: number;
  campusId?: number;
  campusName?: string;
  userId?: number;
  type?: string;
  talkSamId?: string;
  role?: string;
  memo?: string;
  createdAt?: Date;
}

export enum TeacherRole {
  CAMPUS_MANAGER = 'Campus Manager',
  ONLINE_TEACHER = 'Online Teacher',
  COACHING_TEACHER = 'Coaching Teacher',
  LAB_TEACHER = 'LAB Teacher'
}
