import { IHash } from './hash.interface';
import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { ConfigService } from '@nestjs/config';



/**
 * Asynchronously generates a bcrypt hash for the provided data.
 *
 * @param data - The data (string or Buffer) to be hashed.
 * @returns A Promise that resolves to the bcrypt hash of the data.
 * @throws HttpException with status code INTERNAL_SERVER_ERROR if an error occurs during the hashing process.
 */
@Injectable()
export class BcryptImplementation implements IHash{
  private readonly saltRound: number;
  constructor(private readonly configService: ConfigService){
    const saltRoundsEnv = this.configService.get<string>('SALT_ROUND');
    this.saltRound = saltRoundsEnv ? parseInt(saltRoundsEnv, 10) : 12; // Fallback to 12 if not set
  }


  /**
   * Asynchronously generates a bcrypt hash for the provided data.
   *
   * @param data - The data (string or Buffer) to be hashed.
   * @returns A Promise that resolves to the bcrypt hash of the data.
   * @throws HttpException with status code INTERNAL_SERVER_ERROR if an error occurs during the hashing process.
   */
  async hash(data:string | Buffer): Promise<string> {
    try{
      const salt = await bcrypt.genSalt(this.saltRound);
      return await bcrypt.hash(data, salt)
    } catch (error){
      throw new HttpException({
        error:"servError",
        success: false,
        data:undefined,
        message: `Error when trying to store password :${error}`
      },HttpStatus.INTERNAL_SERVER_ERROR)

    }
  }

  /**
   * Asynchronously compares the provided data with the encrypted string using bcrypt.
   *
   * @param data - The data (string or Buffer) to compare with the encrypted string.
   * @param encrypted - The encrypted string to compare the data with.
   * @returns A Promise that resolves to true if the data matches the encrypted string, false otherwise.
   * @throws HttpException with status code INTERNAL_SERVER_ERROR if an error occurs during the comparison process.
   */
  async compare(data: string | Buffer, encrypted: string): Promise<boolean> {
    try {
      return await bcrypt.compare(data,encrypted)
    } catch (error){
      throw new HttpException({
        error:"servError",
        success: false,
        data:undefined,
        message: `Error when trying to verify password :${error}`
      },HttpStatus.INTERNAL_SERVER_ERROR)
    }
  }

}
