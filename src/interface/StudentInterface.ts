export interface StudentInterface {
  studentId?: number;
  name?: string;
  enrollmentCount?: number;
  email?: string;
  userName?: string;
  password?: string;
  gender?: string;
  dateOfBirth?: Date;
  country?: string;
  timeZone?: string;
  status?: string;
  joinedDate?: Date;
  withDrawal?: Date;
  activate?: boolean;
  introduction?: string;
  talkSamId?: string;
  basicPoint?: number;
  campusId?: number;
  parentId?: number;
  userId?: number;
  type?: string;
  createdAt?: Date;
}

export enum StudentRole {
  ONLINE_STUDENT = 'Online Student',
  OFFLINE_STUDENT = 'Offline Student'
}
