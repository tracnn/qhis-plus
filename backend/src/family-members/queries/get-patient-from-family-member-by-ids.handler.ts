import { IQueryHandler, QueryHandler } from "@nestjs/cqrs";
import { GetPatientFromFamilyMemberByIdsQuery } from "./get-patient-from-family-member-by-ids.query";
import { In, Repository } from "typeorm";
import { FamilyMember } from "../entities/family-member.entity";
import { InjectRepository } from "@nestjs/typeorm";

@QueryHandler(GetPatientFromFamilyMemberByIdsQuery)
export class GetPatientFromFamilyMemberByIdsQueryHandler implements IQueryHandler<GetPatientFromFamilyMemberByIdsQuery> {
  constructor(@InjectRepository(FamilyMember) private readonly familyMemberRepository: Repository<FamilyMember>) {}

  async execute(query: GetPatientFromFamilyMemberByIdsQuery): Promise<any> {
    const familyMembers = await this.familyMemberRepository.find({ where: { id: In(query.ids) } });
    return familyMembers.map((familyMember) => ({
      patientId: familyMember.id,
      patientName: familyMember.fullName,
      patientPhoneNumber: familyMember.phoneNumber,
      patientEmail: familyMember.email,
      patientAddress: familyMember.address,
      patientGender: familyMember.genderCode === 2 ? "Nam" : "Nữ",
      patientBirthDate: familyMember.birthDate,
    }));
  }
}