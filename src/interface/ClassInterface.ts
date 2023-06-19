import { StudentInterface } from './StudentInterface';
import { StudentManagementMatchActivityInterface } from './StudentManagementMatchActivityInterface';
import { TeacherInterface } from './TeacherInterface';

export interface ClassInterface {
  studentList?: any[];
  classId?: number;
  campusId?: number;
  teacherId?: number;
  productIds?: number[];
  name?: string;
  level?: string;
  numberOfStudent?: number;
  availableNumStudent?: number;
  classStartDate?: Date;
  classEndDate?: Date;
  dateTimeSlot?: any[];
  durationWeek?: number;
  statusUnit?: string;
  typeOfClass?: string;
  initialTextbook?: string;
  category?: string;
  expired?: boolean;
  createdAt?: Date;
  teachers?: TeacherInterface;
  studentManagementMatchActivity?: StudentManagementMatchActivityInterface[];
  students?: StudentInterface[];
  studentIds?: number[];
}

export enum TypeClass {
  ONLINE = 'online',
  OFFLINE = 'offline'
}
