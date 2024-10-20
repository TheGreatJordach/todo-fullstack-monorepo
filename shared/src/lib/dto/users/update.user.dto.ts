import { PartialType } from '@nestjs/mapped-types';
import { BaseUserDto } from './base.user.dto';

export class UpdateUserDTO extends PartialType(BaseUserDto){}
