import { Inject, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import jwtConfig from './jwt.config';
import { ConfigType } from '@nestjs/config';
import { User } from '@prisma/client';

@Injectable()
export class JwtTokenProvider {

  constructor(private readonly jwtService: JwtService,
              @Inject(jwtConfig.KEY)
              private readonly jwtConfiguration:ConfigType<typeof jwtConfig>) {}


  async generateToken(user:User){
    const accessToken = await this.jwtService.signAsync({
      sub:user.id,
      email:user.email,
    },{
      audience: this.jwtConfiguration.audience,
      issuer: this.jwtConfiguration.issuer,
      secret: this.jwtConfiguration.secret,
      expiresIn: this.jwtConfiguration.accessTokenTtl
    });

    return {
      token: accessToken,
    }
  }

}
