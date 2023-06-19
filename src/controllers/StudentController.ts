import { StudentUseCase } from '../usecase/StudentUseCase';
import { Request, Response } from 'express';
import { RestError } from '../services/error/error';
import { SendRespone } from '../services/success/success';
import { sequelize } from '../database/sequelize';
import { StudentMatchActivityUseCase } from '../usecase/StudentMatchActivityUseCase';
import { ProductUseCase } from '../usecase/ProductUseCase';
import { StudentManagementMatchActivityUseCase } from '../usecase/StudentManagementMatchActivityUseCase';
import { TypeClass } from '../interface/ClassInterface';
import { ClassFeedbackUseCase } from '../usecase/ClassFeedbackUseCase';

export class StudentController {
  constructor(
    private studentUseCase: StudentUseCase,
    private studentMatchActivityUseCase: StudentMatchActivityUseCase,
    private productUseCase: ProductUseCase,
    private studentManagementMatchActivityUseCase: StudentManagementMatchActivityUseCase,
    private classFeedbackUseCase: ClassFeedbackUseCase
  ) {}

  public createStudent = async (req: Request, res: Response) => {
    const transactionDb = await sequelize.transaction();
    try {
      const { productIds } = req.body;
      const { user } = req;
      const student = await this.studentUseCase.createStudentUseCase(req.body, user.campusId, transactionDb);
      if (!productIds || !productIds.length) {
        throw new RestError('please choice study product!', 404);
      }
      const listGroupsMatc = await this.productUseCase.matchProductMatchAcitivtyStudent(productIds);
      const studentMnAtc = await this.studentManagementMatchActivityUseCase.createStudentManagementMatchActivityUseCase(req.body, student.studentId, transactionDb);
      await this.studentMatchActivityUseCase.createStudentMatchActivityUseCase(
        { listGroupsMatc, studentMnMActivityId: studentMnAtc.studentMnMActivityId, studentId: student.studentId, type: TypeClass.OFFLINE },
        transactionDb
      );
      await transactionDb.commit();
      return new SendRespone({ message: 'created successfully!' }).send(res);
    } catch (error) {
      await transactionDb.rollback();
      return RestError.manageServerError(res, error, false);
    }
  };

  public updateStudent = async (req: Request, res: Response) => {
    const transactionDb = await sequelize.transaction();
    try {
      const { studentId, productIds } = req.body;
      await this.studentUseCase.updateStudentUseCase(req.body);
      if (productIds && productIds.length) {
        const listGroupsMatc = await this.productUseCase.matchProductMatchAcitivtyStudent(productIds);
        const studentMnAtc = await this.studentManagementMatchActivityUseCase.createStudentManagementMatchActivityUseCase(req.body, studentId, transactionDb);
        await this.studentMatchActivityUseCase.createStudentMatchActivityUseCase(
          { listGroupsMatc, studentMnMActivityId: studentMnAtc.studentMnMActivityId, studentId: studentId, type: TypeClass.OFFLINE },
          transactionDb
        );
      }
      await transactionDb.commit();
      return new SendRespone({ message: 'update successfully!' }).send(res);
    } catch (error) {
      await transactionDb.rollback();
      return RestError.manageServerError(res, error, false);
    }
  };

  public addNewProducts = async (req: Request, res: Response) => {
    const transactionDb = await sequelize.transaction();
    try {
      const { studentId, productIds } = req.body;
      const student = await this.studentUseCase.getStudentByIdUseCase(studentId);
      if (!productIds || !productIds.length) {
        throw new RestError('please choice study product!', 404);
      }
      const listGroupsMatc = await this.productUseCase.matchProductMatchAcitivtyStudent(productIds);
      const studentMnAtc = await this.studentManagementMatchActivityUseCase.createStudentManagementMatchActivityUseCase(req.body, studentId, transactionDb);
      await this.studentMatchActivityUseCase.createStudentMatchActivityUseCase(
        { listGroupsMatc, studentMnMActivityId: studentMnAtc.studentMnMActivityId, studentId: student.studentId, type: TypeClass.OFFLINE },
        transactionDb
      );
      await transactionDb.commit();
      return new SendRespone({ message: 'created successfully!' }).send(res);
    } catch (error) {
      await transactionDb.rollback();
      return RestError.manageServerError(res, error, false);
    }
  };

  public updateProducts = async (req: Request, res: Response) => {
    const transactionDb = await sequelize.transaction();
    try {
      const { studentMnMActivityId, studentId, productIds } = req.body;
      if (!productIds || !productIds.length) {
        throw new RestError('value update not available', 404);
      }
      const student = await this.studentUseCase.getStudentByIdUseCase(studentId);
      const studentMnAtc = await this.studentManagementMatchActivityUseCase.getStudentMatchActivityByIdUseCase(studentMnMActivityId);
      const productIdsCal = await this.studentManagementMatchActivityUseCase.caculatorValidateProductIds(studentMnAtc, student.studentId, productIds);
      await this.studentManagementMatchActivityUseCase.updateProductIdsByIdUseCase(studentMnAtc.studentMnMActivityId, productIdsCal, transactionDb);
      await Promise.all(
        studentMnAtc.productIds.map(async (item) => {
          await this.studentMatchActivityUseCase.deleteMatchActivityByIdUseCase(student.studentId, item, transactionDb);
        })
      );
      const listGroupsMatc = await this.productUseCase.matchProductMatchAcitivtyStudent(productIds);
      await this.studentMatchActivityUseCase.createStudentMatchActivityUseCase(
        { listGroupsMatc, studentMnMActivityId: studentMnAtc.studentMnMActivityId, studentId: student.studentId, type: TypeClass.OFFLINE },
        transactionDb
      );
      await transactionDb.commit();
      return new SendRespone({ message: 'update product successfully!' }).send(res);
    } catch (error) {
      await transactionDb.rollback();
      return RestError.manageServerError(res, error, false);
    }
  };

  public updateMultiActivate = async (req: Request, res: Response) => {
    try {
      const { studentIds } = req.body;
      await this.studentUseCase.updateMultiActivateUseCase(studentIds);
      return new SendRespone({ message: 'update successfully!' }).send(res);
    } catch (error) {
      return RestError.manageServerError(res, error, false);
    }
  };

  public getListStudents = async (req: Request, res: Response) => {
    try {
      const { user } = req;
      const students = await this.studentUseCase.getListStudentsUseCase(user.campusId);
      return new SendRespone({ data: students }).send(res);
    } catch (error) {
      return RestError.manageServerError(res, error, false);
    }
  };

  public getStudentById = async (req: Request, res: Response) => {
    try {
      const { studentId } = req.params;
      if (!studentId) {
        throw new RestError('student id not available!', 404);
      }
      const student = await this.studentUseCase.getStudentByIdUseCase(parseInt(studentId));
      const studentMnAtc = await this.studentManagementMatchActivityUseCase.getListByStudentIdMatchActivityUseCase(parseInt(studentId));
      return new SendRespone({ data: { ...student, studentMnAtc } }).send(res);
    } catch (error) {
      return RestError.manageServerError(res, error, false);
    }
  };

  public getGroupsMatchActivityByStudentId = async (req: Request, res: Response) => {
    try {
      const { studentId } = req.params;
      if (!studentId) {
        throw new RestError('student id not available!', 404);
      }
      const listGroupsMatc = await this.studentManagementMatchActivityUseCase.getListByStudentIdMatchActivityUseCase(parseInt(studentId));
      return new SendRespone({ data: listGroupsMatc }).send(res);
    } catch (error) {
      return RestError.manageServerError(res, error, false);
    }
  };

  public createClassFeedback = async (req: Request, res: Response) => {
    try {
      await this.classFeedbackUseCase.createClassFeedbackUseCase(req.body);
      return new SendRespone({ message: 'created successfully!' }).send(res);
    } catch (error) {
      return RestError.manageServerError(res, error, false);
    }
  };
}
