import { Module } from '@nestjs/common';
import { FamilyMembersService } from './family-members.service';
import { FamilyMembersController } from './family-members.controller';
import { CqrsModule } from '@nestjs/cqrs';
import { TypeOrmModule } from '@nestjs/typeorm';
import { FamilyMember } from './entities/family-member.entity';
import { BASE_SCHEMA } from '../constant/common.constant';
import { SdaModuleModule } from '../catalog-module/sda-module/sda-module.module';
import { CreateFamilyMemberHandler } from './commands/create-family-member.handler';
import { registerExtendedRepo } from '../common/base.repository.provider';
import { FamilyMemberRepository } from './repositories/family-member.repository';
import { HealthInsuranceCardModule } from '../health-insurance-card/health-insurance-card.module';
import { UserModule } from '../user/user.module';
import { UpdateFamilyMemberHandler } from './commands/update-family-member.handler';
import { GetFamilyMembersByUserIdHandler } from './queries/get-family-members-by-user-id.handler';
import { CanCreateFamilyMemberHandler } from './queries/can-create-family-member.handler';
import { AddressLocationResolverService } from '../user/services/address-location-resolver.service';
import { GetPatientFromFamilyMemberByIdsQueryHandler } from './queries/get-patient-from-family-member-by-ids.handler';
import { GetPatientFromFamilyMemberByIdQueryHandler } from './queries/get-patient-from-family-member-by-id.handler';

const CommandHandlers = [
  CreateFamilyMemberHandler,
  UpdateFamilyMemberHandler,
  GetFamilyMembersByUserIdHandler,
  CanCreateFamilyMemberHandler,
];

const QueryHandlers = [
  GetPatientFromFamilyMemberByIdsQueryHandler,
  GetPatientFromFamilyMemberByIdQueryHandler,
];

@Module({
  imports: [
    TypeOrmModule.forFeature([FamilyMember], BASE_SCHEMA.DEFAULT), 
    CqrsModule,
    SdaModuleModule,
    HealthInsuranceCardModule,
    UserModule,
  ],
  controllers: [FamilyMembersController],
  providers: [FamilyMembersService, ...CommandHandlers, ...QueryHandlers,
    AddressLocationResolverService,
    registerExtendedRepo(FamilyMember, FamilyMemberRepository, 'FamilyMemberRepository', BASE_SCHEMA.DEFAULT)
  ],
  exports: [CqrsModule],
})
export class FamilyMembersModule {}
