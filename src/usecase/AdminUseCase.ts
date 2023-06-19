import { CampusInterface } from '../interface/CampusInterface';
import { IAdminRepository } from '../repository/AdminRepository';
import { ICampusRepository } from '../repository/CampusRepository';
import { RestError } from '../services/error/error';
export class AdminUseCase {
  constructor(private adminRepository: IAdminRepository) {}
}
