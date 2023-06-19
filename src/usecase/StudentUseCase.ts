import { Transaction } from 'sequelize';
import { StudentInterface } from '../interface/StudentInterface';
import { ICampusRepository } from '../repository/CampusRepository';
import { IStudentRepository } from '../repository/StudentRepository';
import { IUserRepository } from '../repository/UserRepository';
import { RestError } from '../services/error/error';
import { UserRole } from '../interface/UserInterface';
import { decryptPassWordInput } from '../utils/DecryptPassword';

export class StudentUseCase {
  constructor(private userRepository: IUserRepository, private studentRepository: IStudentRepository) {}
  async createStudentUseCase(reqBody: any, campusId: number, transactionDb: Transaction) {
    const { name, email, userName, password } = reqBody;
    let user = await this.userRepository.findByEmail(email);
    if (user && !user.activate) {
      throw new RestError('account is disabled!', 404);
    }
    if (user && user.studentId) {
      throw new RestError('student has register!', 404);
    }
    if (!user) {
      let userByUserName = await this.userRepository.findByUserName(userName);
      if (userByUserName && userByUserName.userName === userName) {
        throw new RestError('username has register!', 404);
      }
      user = await this.userRepository.createUser(name, userName, email, decryptPassWordInput(password), 0, UserRole.STUDENT, transactionDb);
    }
    const student = await this.studentRepository.createStudent(reqBody, user.userId, campusId, transactionDb);
    await this.userRepository.updateForienUser(user.userId, student.studentId, campusId, 'studentId', UserRole.STUDENT, name, decryptPassWordInput(password), transactionDb);
    return student;
  }

  async updateStudentUseCase(reqBody: StudentInterface) {
    return await this.studentRepository.updateStudent(reqBody);
  }

  async getListStudentsUseCase(campusId: number) {
    return this.studentRepository.findAllListsByCampusId(campusId);
  }

  async updateMultiActivateUseCase(studentdIds: number[]) {
    await Promise.all(
      studentdIds.map(async (item) => {
        await this.studentRepository.updateMultiActivateStudent(item);
      })
    );
    return;
  }

  async getStudentByIdUseCase(studentId: number) {
    const student = await this.studentRepository.findById(studentId);
    if (!student) throw new RestError('student not available!', 404);
    if (student && !student.activate) throw new RestError('student is disabled!', 404);
    return student;
  }
}
