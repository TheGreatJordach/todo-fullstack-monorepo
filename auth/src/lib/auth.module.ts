import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { UsersModule } from '@todo-fullstack-monorepo/users';
import { PasswordService } from './password/password.service';
import { BcryptImplementation } from './password/hash/bcrypt.implementation.provider';
import { JwtModule } from '@nestjs/jwt';
import jwtConfig from './jwt/jwt.config';
import { ConfigModule } from '@nestjs/config';
import { JwtTokenProvider } from './jwt/jwt.token.provider';


@Module({
  imports:[UsersModule,JwtModule.registerAsync(jwtConfig.asProvider()),
  ConfigModule.forFeature(jwtConfig)],
  controllers: [AuthController],
  providers: [AuthService,PasswordService,BcryptImplementation,JwtTokenProvider],
  exports: [AuthService],
})
export class AuthModule {}
