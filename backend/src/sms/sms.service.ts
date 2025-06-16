import { Injectable } from '@nestjs/common';
import { CreateSmDto } from './dto/create-sm.dto';
import { UpdateSmDto } from './dto/update-sm.dto';
import { SendOtpDto } from './dto/send-otp.dto';
import { SendOtpCommand } from './commands/send-otp.command';
import { CommandBus } from '@nestjs/cqrs';

@Injectable()
export class SmsService {
  constructor(private readonly commandBus: CommandBus) {}

  create(createSmDto: CreateSmDto) {
    return 'This action adds a new sm';
  }

  findAll() {
    return `This action returns all sms`;
  }

  findOne(id: number) {
    return `This action returns a #${id} sm`;
  }

  update(id: number, updateSmDto: UpdateSmDto) {
    return `This action updates a #${id} sm`;
  }

  remove(id: number) {
    return `This action removes a #${id} sm`;
  }

  async sendOtp(sendOtpDto: SendOtpDto) {
    return this.commandBus.execute(new SendOtpCommand(sendOtpDto));
  }
}
