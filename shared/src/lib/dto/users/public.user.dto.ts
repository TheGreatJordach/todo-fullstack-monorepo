import { Expose } from 'class-transformer';

export class PublicUserDto{
  @Expose()
  id!:string
  @Expose()
  name!:string
  @Expose()
  email!:string
  @Expose()
  lastname!:string
  @Expose()
  image!:string
}
