import { UserAttributes, UserRole } from '../interface/UserInterface';
import { IUserRepository } from '../repository/UserRepository';
import * as bcrypt from 'bcryptjs';
import { RestError } from '../services/error/error';
import { decryptPassWordInput, decryptTokenPassWord } from '../utils/DecryptPassword';
export class UserUseCase {
  constructor(private userRepository: IUserRepository) {}

  async userLoginUseCase(userName: string, password: string): Promise<any> {
    let splitUserName = userName.split('@');
    let user: UserAttributes;
    if (splitUserName.length === 1) {
      user = await this.userRepository.findByUserName(userName);
      if (!user) throw new RestError('account not found!', 404);
      if (!user.activate) throw new RestError('account is disabled!', 404);
    }
    if (splitUserName.length > 1) {
      user = await this.userRepository.findByEmail(userName);
      if (!user) throw new RestError('account not found!', 404);
      if (!user.activate) throw new RestError('account is disabled!', 404);
    }
    const isPassWord = bcrypt.compareSync(password, user.password);
    if (!isPassWord) throw new RestError('Password is wrong!', 400);
    return decryptTokenPassWord(user);
  }

  async parentSginUpUseCase(reqBody: any): Promise<any> {
    const { name, userName, email, phone, password } = reqBody;
    await this.validataEmailAndUserName(email, userName);
    await this.userRepository.createUser(name, userName, email, decryptPassWordInput(password), phone, UserRole.PARENT);
    return;
  }

  async createByAdminOrCampusUseCase(reqBody: any): Promise<any> {
    const { name, userName, email, password, roleId, option } = reqBody;
    await this.validataEmailAndUserName(email, userName);
    await this.userRepository.createUser(name, userName, email, decryptPassWordInput(password), roleId, option);
    return;
  }

  async getUserByIdUseCase(userId: string): Promise<any> {
    const user = await this.userRepository.findById(userId);
    if (!user) {
      throw new RestError('user not found!', 404);
    }
    if (!user.activate) {
      throw new RestError('user is disabled!', 404);
    }
    delete user.password;
    return user;
  }

  private async validataEmailAndUserName(email: string, userName: string) {
    const findEmail = await this.userRepository.findByEmail(email);
    if (findEmail) {
      throw new RestError('email has exits!', 404);
    }
    const findUserName = await this.userRepository.findByUserName(userName);
    if (findUserName) {
      throw new RestError('user name has exits!', 404);
    }
  }
}
