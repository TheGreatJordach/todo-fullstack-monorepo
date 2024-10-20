import { Module, ValidationPipe } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { APP_PIPE } from '@nestjs/core';
@Module({
  imports:[ConfigModule.forRoot({isGlobal: true, envFilePath: '.env'})],
  providers:[{
    provide: APP_PIPE,
    useValue: new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted:true,
      transform:true,
      transformOptions:{
        enableImplicitConversion:true
      }
    })
  }]
})
export class AppConfiguration {}
