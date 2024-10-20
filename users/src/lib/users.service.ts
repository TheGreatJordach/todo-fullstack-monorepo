import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { DatabaseService } from '@todo-fullstack-monorepo/database';
import { CreateUserDTO, IAMIdentifier } from '@todo-fullstack-monorepo/shared';
import { Prisma, User } from '@prisma/client';

@Injectable()
export class UsersService {

  constructor(private readonly prismaService: DatabaseService ) {}

  async findByIdentifier(identifier:IAMIdentifier):Promise<User | null>{
    const {id, email} = identifier;
    const user:User | null = await this.prismaService.user.findFirst({where:{
      OR :[
        {id:id ?? undefined},
        {email:email ?? undefined},
      ]
      }})
    if(!user) {
      return null

    }
    return user
  }

  async create(createUserDto:CreateUserDTO){
    try{
      return await this.prismaService.user.create({data:createUserDto})
    } catch (error){
      if (error instanceof Prisma.PrismaClientKnownRequestError) {
        // Handle specific error code for unique constraint violations
        if (error.code === 'P2002') {
          throw new HttpException({
            status: HttpStatus.CONFLICT,
            error: 'A user with this email already exists.',
            cause: error.meta, // This will provide details like which constraint was violated
          }, HttpStatus.CONFLICT);
        }

        // Handle other Prisma errors (e.g., P2003 for foreign key violations)
        if (error.code === 'P2003') {
          throw new HttpException({
            status: HttpStatus.BAD_REQUEST,
            error: 'Foreign key constraint failed.',
            cause: error.meta, // More details about the violation
          }, HttpStatus.BAD_REQUEST);
        }
       }

}
  }
}
