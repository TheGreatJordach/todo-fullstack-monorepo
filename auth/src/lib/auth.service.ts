import {
  ConflictException,
  HttpException,
  HttpStatus,
  Injectable,
  InternalServerErrorException,
  Logger
} from '@nestjs/common';
import { CreateUserDTO, IAMIdentifier, LogInDto } from '@todo-fullstack-monorepo/shared';
import { UsersService } from '@todo-fullstack-monorepo/users';
import { User } from '@prisma/client';
import { PasswordService } from './password/password.service';
import { JwtTokenProvider } from './jwt/jwt.token.provider';

@Injectable()
export class AuthService {
private readonly logger = new Logger('AuthService');
  constructor(private readonly userService: UsersService,
              private readonly passwordService: PasswordService,
              private readonly tokenProvider: JwtTokenProvider,) {
  }


  async signIn(logInDto:LogInDto){

    const identifier = {email: logInDto.email} as IAMIdentifier
    // Search user by email
    const storedUser: User | null = await this.getUserByIdentifier(identifier)
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
    //if isMatch --> return jwt token

  return await this.tokenProvider.generateToken(storedUser)

  }
  async singUp(createUserDto:CreateUserDTO){
    // Search user by email
    const identifier = {email: createUserDto.email} as IAMIdentifier
    const storedUser: User | null = await this.getUserByIdentifier(identifier)
    // If User not found -> throw an Exception
    if(storedUser){
      throw new ConflictException(identifier.email)
    }

    const hashPassword = await this.passwordService.encryptPassword(createUserDto.password)
    if(!hashPassword){
      throw new InternalServerErrorException('AuthService', 'Failed to encrypt password');
  }

    const createdUser = await this.userService.create({...createUserDto, password:hashPassword})

    if(!createdUser){
      this.logger.error('Failed to create user', { identifier, error: 'User creation failed' });

      throw new InternalServerErrorException('AuthService', 'Failed to create new User')
    }

   return await this.tokenProvider.generateToken(createdUser)
 }
  async getUserByIdentifier(identifier:IAMIdentifier): Promise<User | null>{
    // Search user by email
    return  await this.userService.findByIdentifier(identifier.email as IAMIdentifier)
    }
}
