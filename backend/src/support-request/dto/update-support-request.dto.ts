import { PickType } from '@nestjs/swagger';
import { CreateSupportRequestDto } from './create-support-request.dto';

export class UpdateSupportRequestDto extends PickType(CreateSupportRequestDto, ['requestContent', 'requestType']) {}
