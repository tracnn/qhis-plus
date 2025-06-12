import { Injectable, CanActivate, ExecutionContext, ForbiddenException } from '@nestjs/common';
import { QueryBus } from '@nestjs/cqrs';
import { GetTreatmentByTreatmentIdQuery } from '../../his-rs-module/queries/get-treatment-by-treatment-id.query';
import { ERROR_403 } from '../error-messages/error-403';
import { GetFamilyMembersByUserIdQuery } from '../../family-members/queries/get-family-members-by-user-id.query';

@Injectable()
export class TreatmentAccessGuard implements CanActivate {
  constructor(
    private readonly queryBus: QueryBus,
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const req = context.switchToHttp().getRequest();
    const { treatmentId } = req.body;
    const user = req.user;
    const identityNumber = user.identityNumber;
    const insuranceNumber = user.insuranceNumber;

    if(process.env.ENABLE_CHECK_OWNER_TREATMENT !== 'true') {
      return true;
    }  

    const treatment = await this.queryBus.execute(new GetTreatmentByTreatmentIdQuery(treatmentId));
    if (!treatment) throw new ForbiddenException(ERROR_403.TREATMENT_NOT_FOUND);

    if (
      treatment.identityNumber === identityNumber ||
      treatment.insuranceNumber === insuranceNumber
    ) {
      return true;
    }

    const familyMembers = await this.queryBus.execute(
      new GetFamilyMembersByUserIdQuery(user.userId)
    );
    
    const canAccessAsFamily = (familyMembers || []).some((fm: any) =>
      (fm.identityNumber && fm.identityNumber === treatment.identityNumber) ||
      (fm.insuranceNumber && fm.insuranceNumber === treatment.insuranceNumber)
    );
    if (canAccessAsFamily) return true;

    throw new ForbiddenException(ERROR_403.TREATMENT_ACCESS_DENIED);
  }
}