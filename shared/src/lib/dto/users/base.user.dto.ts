import { IsEmail, IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class BaseUserDto{
  @IsNotEmpty()
  @IsString()
  readonly name!:string
  @IsEmail()
  @IsNotEmpty()
  readonly email!:string
  @IsNotEmpty()
  @IsOptional()
  readonly lastName?:string
  @IsNotEmpty()
  @IsOptional()
  image!:string
}
