import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateUserDTO, IAMIdentifier, LogInDto } from '@todo-fullstack-monorepo/shared';
import { UsersService } from '@todo-fullstack-monorepo/users';
import { User } from '@prisma/client';
import { PasswordService } from './password/password.service';

@Injectable()
export class AuthService {

  constructor(private readonly userService: UsersService,
              private readonly passwordService: PasswordService) {
  }


  async signIn(logInDto:LogInDto){

    const identifier = {email: logInDto.email} as IAMIdentifier
    // Search user by email
    const storedUser: User | null = await this.verityUser(identifier)
    // If User not found -> throw an Exception
    if(!storedUser){
      throw new HttpException({
        error: "AuthError",
        success:false,
        data: null,
        message :`No user with email ${identifier.email} found` }, HttpStatus.UNAUTHORIZED)
    }
    // if User exist -> compare the password
    const isMatch : boolean = await this.passwordService.comparePassword(logInDto.password,storedUser.password)
    // if !isMatch -> throw an Exception
    if(!isMatch){
      throw new HttpException({
        error:"AuthError",
        success:false,
        data: null,
        message: "Access denied - wrong email or password "
      }, HttpStatus.UNAUTHORIZED)
    }
    // TODO : if isMatch --> return jwt token
  return {
    success: true,
    data:storedUser,
    message: "You are successfully logIn"
  }

  }
  async singUp(createUserDto:CreateUserDTO){
    // Search user by email
    const identifier = {email: createUserDto.email} as IAMIdentifier
    const storedUser: User | null = await this.verityUser(identifier)
    // If User not found -> throw an Exception
    if(storedUser){
      throw new HttpException({
        error: "AuthError",
        success:false,
        data: null,
        message :`Email ${identifier.email} is already used` }, HttpStatus.UNAUTHORIZED)
    }

    const hashPassword = await this.passwordService.encryptPassword(createUserDto.password)
    if(!hashPassword){
      throw new HttpException({
        error: "AuthError",
        success:false,
        data: null,
        message :`Failed to store password, HttpStatus.UNAUTHORIZED)`
        }, HttpStatus.UNAUTHORIZED)
  }
    
    const createdUser = await this.userService.create({...createUserDto, password:hashPassword})

    if(!createdUser){
      throw new HttpException({
        error: "AuthError",
        success:false,
        data: null,
        message :`Failed to store new User ${createUserDto.name})`
      }, HttpStatus.UNAUTHORIZED)
    }
    return {
      success: true,
      data:createdUser,
      message:"New user created"
    }
 }
  async verityUser(identifier:IAMIdentifier): Promise<User | null>{
    // Search user by email
    return  await this.userService.findByIdentifier(identifier.email as IAMIdentifier)
    }
}
