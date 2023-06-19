import { StudentMatchActivityInterface } from './StudentMatchActivityInterface';

export interface StudentManagementMatchActivityInterface {
  studentMnMActivityId?: number;
  studentId?: number;
  productIds?: number[];
  dateTimeSlot?: string[];
  classId?: number;
  createdAt?: Date;
  studentMatchActivity?: StudentMatchActivityInterface[];
}
