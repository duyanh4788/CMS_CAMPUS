import { SECRETKEY } from '../common/common.constants';
import { UserAttributes } from '../interface/UserInterface';
import * as JWT from 'jsonwebtoken';
import * as bcrypt from 'bcryptjs';

export const decryptTokenPassWord = (user: UserAttributes) => {
  const header = {
    userId: user.userId,
    name: user.name,
    roleId: user.roleId
  };
  const toKen = JWT.sign(header, SECRETKEY, { expiresIn: 86400 }); // 1 day
  return {
    ...header,
    toKen
  };
};

export const decryptPassWordInput = (passWord: string) => {
  const salt = bcrypt.genSaltSync(10);
  const hashPassWord = bcrypt.hashSync(passWord, salt);
  return hashPassWord;
};
