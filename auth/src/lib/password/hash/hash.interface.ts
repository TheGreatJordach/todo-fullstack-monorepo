export interface IHash {
  hash(data: string | Buffer): Promise<string>;
  compare(data:string | Buffer, encrypted:string):Promise<boolean>;
}
