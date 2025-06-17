import { Injectable, CanActivate, ExecutionContext, ForbiddenException } from '@nestjs/common';
import { QueryBus } from '@nestjs/cqrs';
import { ERROR_403 } from '../error-messages/error-403';
import { GetFamilyMembersByUserIdQuery } from '../../family-members/queries/get-family-members-by-user-id.query';
import { GetPatientByTreatmentCodeQuery } from '../../his-rs-module/queries/get-patient-by-treatment-code.query';
import { GetTransactionByIdQuery } from '../../his-rs-module/queries/get-transaction-by-id.query';
import { ERROR_404 } from '@common/error-messages/error-404';

@Injectable()
export class TransactionAccessGuard implements CanActivate {
  constructor(
    private readonly queryBus: QueryBus,
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const req = context.switchToHttp().getRequest();
    const { transactionId } = req.query;
    const user = req.user;
    const identityNumber = user.identityNumber;
    const insuranceNumber = user.insuranceNumber;

    if(process.env.ENABLE_CHECK_OWNER_TRANSACTION !== 'true') {
      return true;
    }  
    
    const transaction = await this.queryBus.execute(new GetTransactionByIdQuery(transactionId));

    if (!transaction) throw new ForbiddenException(ERROR_404.NOT_FOUND_TRANSACTION);

    const patient = await this.queryBus.execute(new GetPatientByTreatmentCodeQuery(transaction.treatmentCode));
    
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
      (fm.identityNumber && fm.identityNumber === patient?.[0]?.identityNumber) ||
      (fm.insuranceNumber && fm.insuranceNumber === patient?.[0]?.insuranceNumber)
    );
    if (canAccessAsFamily) return true;

    throw new ForbiddenException(ERROR_403.TREATMENT_ACCESS_DENIED);
  }
}