import { BaseUserDto } from './base.user.dto';
import { IsNotEmpty, IsStrongPassword } from 'class-validator';

export class CreateUserDTO extends BaseUserDto{
  @IsStrongPassword()
  readonly password!: string;
}
