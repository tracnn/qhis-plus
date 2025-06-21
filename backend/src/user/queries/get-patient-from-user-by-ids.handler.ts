import { IQueryHandler, QueryHandler } from "@nestjs/cqrs";
import { GetPatientFromUserByIdsQuery } from "./get-patient-from-user-by-ids.query";
import { InjectRepository } from "@nestjs/typeorm";
import { In, Repository } from "typeorm";
import { User } from "../entities/user.entity";

@QueryHandler(GetPatientFromUserByIdsQuery)
export class GetPatientFromUserByIdsQueryHandler implements IQueryHandler<GetPatientFromUserByIdsQuery> {
  constructor(@InjectRepository(User) private readonly userRepository: Repository<User>) {}

  async execute(query: GetPatientFromUserByIdsQuery): Promise<any> {
    const users = await this.userRepository.find({ where: { id: In(query.ids) } });
    return users.map((user) => ({
      patientId: user.id,
      patientName: user.fullName,
      patientPhoneNumber: user.phoneNumber,
      patientEmail: user.email,
      patientAddress: user.address,
      patientGender: user.genderCode === 2 ? "Nam" : "Nữ",
      patientBirthDate: user.birthDate,
    }));
  }
}