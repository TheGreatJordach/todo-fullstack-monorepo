import { Body, Controller, Post, Res } from '@nestjs/common';
import { AuthService } from './auth.service';
import { CreateUserDTO, LogInDto } from '@todo-fullstack-monorepo/shared';
import {Response} from 'express';
@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post("login")
  async logIn(
    @Body() logInDto: LogInDto,
    @Res({passthrough:true}) response:Response) {
    const accessToken = await this.authService.signIn(logInDto)
    response.cookie('accessToken',accessToken,{
      secure:true,
      httpOnly:true,
      sameSite:true
    })
  }

  @Post("register")
  async signIn(
    @Res({passthrough:true}) response:Response,
    @Body() createUserDto: CreateUserDTO) {
    const accessToken = await this.authService.singUp(createUserDto)
    response.cookie('accessToken',accessToken,{
      secure:true,
      httpOnly:true,
      sameSite:true
    })

  }
}
