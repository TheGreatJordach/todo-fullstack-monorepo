import { BcryptImplementation } from './hash/bcrypt.implementation.provider';
import { Injectable } from '@nestjs/common';
@Injectable()
export class PasswordService {
  constructor(private readonly hashAlgoProvider:BcryptImplementation) {}

  /**
   * Asynchronously encrypts the provided data using the bcrypt algorithm.
   *
   * @param data - The data (string or Buffer) to be encrypted.
   * @returns A Promise that resolves to the encrypted data.
   */
  async encryptPassword(data:string | Buffer):Promise<string> {
    return await this.hashAlgoProvider.hash(data)
  }

  /**
   * Asynchronously compares the provided data with the encrypted password using the bcrypt algorithm.
   *
   * @param data - The data (string or Buffer) to compare with the encrypted password.
   * @param encryptPassword - The encrypted password to compare the data with.
   * @returns A Promise that resolves to true if the data matches the encrypted password, false otherwise.
   */
  async comparePassword(data: string|Buffer, encryptPassword:string):Promise<boolean> {
    return await this.hashAlgoProvider.compare(data, encryptPassword)
  }
}
