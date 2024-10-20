import { OmitType } from '@nestjs/mapped-types';
import { CreateUserDTO } from '../users/create.user.dto';

export class LogInDto extends OmitType(CreateUserDTO, ["lastName","image","name"]){}
