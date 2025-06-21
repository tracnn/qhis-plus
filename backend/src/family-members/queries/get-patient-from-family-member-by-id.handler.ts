import { IQueryHandler, QueryHandler } from "@nestjs/cqrs";
import { GetPatientFromFamilyMemberByIdQuery } from "./get-patient-from-family-member-by-id.query";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { FamilyMember } from "../entities/family-member.entity";

@QueryHandler(GetPatientFromFamilyMemberByIdQuery)
export class GetPatientFromFamilyMemberByIdQueryHandler implements IQueryHandler<GetPatientFromFamilyMemberByIdQuery> {
  constructor(@InjectRepository(FamilyMember) private readonly familyMemberRepository: Repository<FamilyMember>) {}

  async execute(query: GetPatientFromFamilyMemberByIdQuery): Promise<any> {
    const familyMember = await this.familyMemberRepository.findOne({ where: { id: query.id } });
    if (!familyMember) {
        return {
            patientId: null,
            patientName: null,
            patientPhoneNumber: null,
            patientEmail: null,
            patientAddress: null,
            patientGender: null,
            patientBirthDate: null,
        };
    }
    return {
        patientId: familyMember.id,
        patientName: familyMember.fullName,
        patientPhoneNumber: familyMember.phoneNumber,
        patientEmail: familyMember.email,
        patientAddress: familyMember.address,
        patientGender: familyMember.genderCode === 2 ? "Nam" : "Nữ",
        patientBirthDate: familyMember.birthDate,
    };
  }
}