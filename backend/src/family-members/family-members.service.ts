import { Inject, Injectable } from '@nestjs/common';
import { CreateFamilyMemberDto } from './dto/create-family-member.dto';
import { UpdateFamilyMemberDto } from './dto/update-family-member.dto';
import { FamilyMemberRepository } from './repositories/family-member.repository';
import { CreateFamilyMemberCommand } from './commands/create-family-member.command';
import { CommandBus, QueryBus } from '@nestjs/cqrs';
import { UpdateFamilyMemberCommand } from './commands/update-family-member.command';
import { CanCreateFamilyMemberQuery } from './queries/can-create-family-member.query';
import { CanCreateFamilyMemberDto } from './dto/can-create-family-member.dto';

@Injectable()
export class FamilyMembersService {
  constructor(
    @Inject('FamilyMemberRepository')
    private readonly familyMemberRepository: ReturnType<typeof FamilyMemberRepository>,
    private readonly commandBus: CommandBus,
    private readonly queryBus: QueryBus,
  ) {}

  async canCreate(req: any, dto: CanCreateFamilyMemberDto) {
    return await this.queryBus.execute(new CanCreateFamilyMemberQuery(req, dto));
  }

  async create(userId: string, dto: CreateFamilyMemberDto) {
    return await this.commandBus.execute(new CreateFamilyMemberCommand(userId, dto));
  }

  async findAllByUser(userId: string) {
    return await this.familyMemberRepository.findAllByUser(userId);
  }

  async findOne(userId: string, id: string) {
    return await this.familyMemberRepository.findOneByUser(userId, id);
  }

  async update(userId: string, id: string, updateFamilyMemberDto: UpdateFamilyMemberDto) {
    return await this.commandBus.execute(new UpdateFamilyMemberCommand(userId, id, updateFamilyMemberDto));
  }

  async remove(userId: string, id: string) {
    return await this.familyMemberRepository.deleteByUser(userId, id);
  }
}
