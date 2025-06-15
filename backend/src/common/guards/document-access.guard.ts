import { Injectable, CanActivate, ExecutionContext, ForbiddenException } from '@nestjs/common';
import { QueryBus } from '@nestjs/cqrs';
import { ERROR_403 } from '../error-messages/error-403';
import { GetFamilyMembersByUserIdQuery } from '../../family-members/queries/get-family-members-by-user-id.query';
import { GetDocumentByIdQuery } from '../../emr-rs-module/queries/get-document-by-id.query';
import { GetPatientByTreatmentCodeQuery } from '../../his-rs-module/queries/get-patient-by-treatment-code.query';

@Injectable()
export class DocumentAccessGuard implements CanActivate {
  constructor(
    private readonly queryBus: QueryBus,
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const req = context.switchToHttp().getRequest();
    const { documentId } = req.body;
    const user = req.user;
    const identityNumber = user.identityNumber;
    const insuranceNumber = user.insuranceNumber;

    if(process.env.ENABLE_CHECK_OWNER_DOCUMENT !== 'true') {
      return true;
    }  
    
    const document = await this.queryBus.execute(new GetDocumentByIdQuery({ documentId }));
    if (!document) throw new ForbiddenException(ERROR_403.DOCUMENT_NOT_FOUND);
    
    const treatmentCode = document?.[0]?.treatmentCode;
    const patient = await this.queryBus.execute(new GetPatientByTreatmentCodeQuery(treatmentCode));
    
    if (!patient) throw new ForbiddenException(ERROR_403.TREATMENT_NOT_FOUND);

    if (
      patient?.[0]?.identityNumber === identityNumber ||
      patient?.[0]?.insuranceNumber === insuranceNumber
    ) {
      return true;
    }

    const familyMembers = await this.queryBus.execute(
      new GetFamilyMembersByUserIdQuery(user.userId)
    );
    
    const canAccessAsFamily = (familyMembers || []).some((fm: any) =>
      (fm.identityNumber && fm.identityNumber === patient.identityNumber) ||
      (fm.insuranceNumber && fm.insuranceNumber === patient.insuranceNumber)
    );
    if (canAccessAsFamily) return true;

    throw new ForbiddenException(ERROR_403.TREATMENT_ACCESS_DENIED);
  }
}