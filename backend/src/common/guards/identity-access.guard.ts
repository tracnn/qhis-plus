import { Injectable, CanActivate, ExecutionContext, ForbiddenException } from '@nestjs/common';
import { QueryBus } from '@nestjs/cqrs';
import { ERROR_403 } from '../error-messages/error-403';
import { GetFamilyMembersByUserIdQuery } from '../../family-members/queries/get-family-members-by-user-id.query';

@Injectable()
export class IdentityAccessGuard implements CanActivate {
  constructor(
    private readonly queryBus: QueryBus,
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const req = context.switchToHttp().getRequest();
    const user = req.user;
    const { identityNumber, insuranceNumber } = req.body || {};
  
    if(process.env.ENABLE_CHECK_OWNER_IDENTITY !== 'true') {
      return true;
    }

    if (
      user.identityNumber === identityNumber ||
      user.insuranceNumber === insuranceNumber
    ) {
      return true;
    }
  
    const familyMembers = await this.queryBus.execute(new GetFamilyMembersByUserIdQuery(user.userId));
    
    const familyMember = familyMembers.find((member: any) => member.identityNumber === identityNumber);
    if(familyMember) {
      return true;
    }
  
    throw new ForbiddenException(ERROR_403.IDENTITY_ACCESS_DENIED);
  }
}