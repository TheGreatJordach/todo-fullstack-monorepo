import { HttpException, HttpStatus } from '@nestjs/common';

export class AuthExceptions extends HttpException{
  constructor(email:string) {
    super({
      error: "ServerError",
      status: HttpStatus.CONFLICT,
      where: "AuthService",
      success:false,
      data:null,
      message:`Email ${email} is already used`
    }, HttpStatus.CONFLICT);
  }
}

export class InternalServerErrorException extends HttpException {
  constructor(errorContext: string, message: string) {
    super({
      error: "ServError",
      status: HttpStatus.INTERNAL_SERVER_ERROR,
      where: errorContext,
      success: false,
      data: null,
      message: message,
    }, HttpStatus.INTERNAL_SERVER_ERROR);
  }
}
