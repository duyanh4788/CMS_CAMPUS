import { Request, Response, NextFunction } from 'express';
import { TypeOfValue, isCheckedTypeValues } from '../../utils/validate';
import { SendRespone } from '../../services/success/success';
import { UserRole } from '../../interface/UserInterface';
import { TeacherRole } from '../../interface/TeacherInterface';

export class ValidateValuesMiddleware {
  constructor() {}

  public async validateCreateCampus(req: Request, res: Response, next: NextFunction) {
    const { campusId, name, indicated, contact, activate } = req.body;
    if (
      (campusId && !isCheckedTypeValues(campusId, TypeOfValue.NUMBER)) ||
      !isCheckedTypeValues(name, TypeOfValue.STRING) ||
      !isCheckedTypeValues(indicated, TypeOfValue.STRING) ||
      !isCheckedTypeValues(contact, TypeOfValue.STRING) ||
      !isCheckedTypeValues(activate, TypeOfValue.BOOLEAN)
    ) {
      return new SendRespone({ status: 'error', code: 404, message: 'Please input full information!' }).send(res);
    }
    next();
  }

  public async validateUpdateMultiCampus(req: Request, res: Response, next: NextFunction) {
    const { campusIds, activate } = req.body;
    if (!isCheckedTypeValues(campusIds, TypeOfValue.ARRAY) || !isCheckedTypeValues(activate, TypeOfValue.BOOLEAN)) {
      return new SendRespone({ status: 'error', code: 404, message: 'Please input full information!' }).send(res);
    }
    next();
  }

  public async validateCreateTeacher(req: Request, res: Response, next: NextFunction) {
    const { user } = req;
    const { teacherId, name, email, gender, dateOfBirth, country, timeZone, resignation, campusId, role, type, memo, password } = req.body;
    if (
      (teacherId && !isCheckedTypeValues(teacherId, TypeOfValue.NUMBER)) ||
      !isCheckedTypeValues(name, TypeOfValue.STRING) ||
      !isCheckedTypeValues(email, TypeOfValue.STRING) ||
      !isCheckedTypeValues(gender, TypeOfValue.STRING) ||
      !isCheckedTypeValues(dateOfBirth, TypeOfValue.STRING) ||
      !isCheckedTypeValues(country, TypeOfValue.STRING) ||
      !isCheckedTypeValues(timeZone, TypeOfValue.STRING) ||
      !isCheckedTypeValues(resignation, TypeOfValue.STRING) ||
      !isCheckedTypeValues(campusId, TypeOfValue.NUMBER) ||
      !isCheckedTypeValues(role, TypeOfValue.STRING) ||
      !isCheckedTypeValues(type, TypeOfValue.STRING) ||
      !isCheckedTypeValues(memo, TypeOfValue.STRING) ||
      !isCheckedTypeValues(password, TypeOfValue.STRING)
    ) {
      return new SendRespone({ status: 'error', code: 404, message: 'Please input full information!' }).send(res);
    }
    if (user.roleId === UserRole.ADMIN && role !== TeacherRole.CAMPUS_MANAGER) {
      return new SendRespone({ status: 'error', code: 404, message: 'role is wrong, you only create for Campus Manager!' }).send(res);
    }
    if (user.roleId === UserRole.CAMPUS_MANAGER && role === TeacherRole.CAMPUS_MANAGER) {
      return new SendRespone({ status: 'error', code: 404, message: 'role is wrong, you only create for Teacher!' }).send(res);
    }
    next();
  }

  public async validateUpdateMultiTeacher(req: Request, res: Response, next: NextFunction) {
    const { teacherIds } = req.body;
    if (!isCheckedTypeValues(teacherIds, TypeOfValue.ARRAY)) {
      return new SendRespone({ status: 'error', code: 404, message: 'Please input full information!' }).send(res);
    }
    next();
  }

  public async validateCreateStudent(req: Request, res: Response, next: NextFunction) {
    const { studentId, name, email, gender, dateOfBirth, country, timeZone, enrollmentCount, joinedDate, withDrawal, introduction, campusId, basicPoint, type, password } = req.body;
    if (
      (studentId && !isCheckedTypeValues(studentId, TypeOfValue.NUMBER)) ||
      !isCheckedTypeValues(name, TypeOfValue.STRING) ||
      !isCheckedTypeValues(email, TypeOfValue.STRING) ||
      !isCheckedTypeValues(gender, TypeOfValue.STRING) ||
      !isCheckedTypeValues(dateOfBirth, TypeOfValue.STRING) ||
      !isCheckedTypeValues(country, TypeOfValue.STRING) ||
      !isCheckedTypeValues(timeZone, TypeOfValue.STRING) ||
      !isCheckedTypeValues(enrollmentCount, TypeOfValue.NUMBER) ||
      !isCheckedTypeValues(joinedDate, TypeOfValue.STRING) ||
      !isCheckedTypeValues(withDrawal, TypeOfValue.STRING) ||
      !isCheckedTypeValues(introduction, TypeOfValue.STRING) ||
      !isCheckedTypeValues(campusId, TypeOfValue.NUMBER) ||
      // !isCheckedTypeValues(talkSamId, TypeOfValue.STRING) ||
      !isCheckedTypeValues(basicPoint, TypeOfValue.NUMBER) ||
      !isCheckedTypeValues(type, TypeOfValue.STRING) ||
      !isCheckedTypeValues(password, TypeOfValue.STRING)
    ) {
      return new SendRespone({ status: 'error', code: 404, message: 'Please input full information!' }).send(res);
    }
    next();
  }
}
