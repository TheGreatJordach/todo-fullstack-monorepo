import { Body, Controller, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { CreateUserDTO, LogInDto } from '@todo-fullstack-monorepo/shared';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post("login")
  async logIn(@Body() logInDto: LogInDto) {
    return await this.authService.signIn(logInDto)
  }

  @Post("register")
  async signIn(@Body() createUserDto: CreateUserDTO) {
    return await this.authService.singUp(createUserDto)
  }
}
