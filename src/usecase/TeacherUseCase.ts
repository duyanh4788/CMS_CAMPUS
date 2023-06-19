import { Transaction } from 'sequelize';
import { TeacherInterface, TeacherRole } from '../interface/TeacherInterface';
import { ICampusRepository } from '../repository/CampusRepository';
import { ITeacherRepository } from '../repository/TeacherRepository';
import { IUserRepository } from '../repository/UserRepository';
import { RestError } from '../services/error/error';
import { UserRole } from '../interface/UserInterface';
import { decryptPassWordInput } from '../utils/DecryptPassword';
import { TypeClass } from '../interface/ClassInterface';

export class TeacherUseCase {
  constructor(private userRepository: IUserRepository, private campusRepository: ICampusRepository, private teacherRepository: ITeacherRepository) {}
  async createTeacherUseCase(userToken: any, reqBody: TeacherInterface, transactionDb: Transaction) {
    const { name, email, userName, password, role, campusId } = reqBody;
    const campus = await this.campusRepository.getCampusById(campusId);
    if (!campus) {
      throw new RestError('Campus not available', 404);
    }
    if (userToken.roleId === UserRole.ADMIN && campus.teacherId) {
      throw new RestError('Campus have Campus Manager', 404);
    }
    let user = await this.userRepository.findByEmail(email);
    if (user && !user.activate) {
      throw new RestError('account is disabled!', 404);
    }
    if (userToken.roleId === UserRole.ADMIN && user && user.campusManagerId) {
      throw new RestError('user has register campus orther!', 404);
    }
    if (userToken.roleId === UserRole.CAMPUS_MANAGER && user && user.teacherId) {
      throw new RestError('user has register campus!', 404);
    }
    const roleId = role === TeacherRole.CAMPUS_MANAGER ? UserRole.CAMPUS_MANAGER : UserRole.TEACHER;
    const type = role === TeacherRole.CAMPUS_MANAGER ? 'campusManagerId' : 'teacherId';
    if (!user) {
      let userWithUserName = await this.userRepository.findByUserName(userName);
      if (userWithUserName && userWithUserName.userName === userName) {
        throw new RestError('username has exist!', 404);
      }
      user = await this.userRepository.createUser(name, userName, email, decryptPassWordInput(password), 0, roleId, transactionDb);
    }
    const teacher = await this.teacherRepository.createTeacher(reqBody, user.userId, transactionDb);
    if (userToken.roleId === UserRole.ADMIN && !campus.teacherId) {
      await this.campusRepository.updateTeacherId(campus.campusId, teacher.teacherId, transactionDb);
    }
    await this.userRepository.updateForienUser(user.userId, teacher.teacherId, campus.campusId, type, roleId, name, decryptPassWordInput(password), transactionDb);
    return;
  }
  async updateTeacherUseCase(reqBody: TeacherInterface) {
    return await this.teacherRepository.updateTeacher(reqBody);
  }
  async updateMultiActivateUseCase(teacherIds: number[]) {
    await Promise.all(
      teacherIds.map(async (item) => {
        await this.teacherRepository.updateMultiActivateTeacher(item);
      })
    );
    return;
  }
  async getAllListTeachersUseCase() {
    return await this.teacherRepository.findAllLists(TypeClass.ONLINE, null, null);
  }
  async getListTeachersOfflineUseCase(campusId: number, userId: number) {
    return await this.teacherRepository.findAllLists(TypeClass.OFFLINE, campusId, userId);
  }
  async getTeacherByIdUseCase(campusId: number, teacherId: number) {
    const teacher = await this.teacherRepository.findById(campusId, teacherId);
    if (!teacher) {
      throw new RestError('teacher not found!', 404);
    }
    return teacher;
  }

  async getTeacherByUserIdUseCase(userId: number) {
    const teacher = await this.teacherRepository.findByUserId(userId);
    if (!teacher) {
      throw new RestError('class not found!', 404);
    }
    return teacher;
  }
}
