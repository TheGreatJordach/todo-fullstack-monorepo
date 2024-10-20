import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { UsersModule } from '@todo-fullstack-monorepo/users';
import { PasswordService } from './password/password.service';
import { BcryptImplementation } from './password/hash/bcrypt.implementation.provider';

@Module({
  imports:[UsersModule],
  controllers: [AuthController],
  providers: [AuthService,PasswordService,BcryptImplementation],
  exports: [AuthService],
})
export class AuthModule {}
