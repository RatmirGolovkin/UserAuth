import { IsString } from 'class-validator';

export class LoginDto {
  @IsString()
  readonly firstname: string;

  @IsString()
  readonly lastname: string;

  @IsString()
  readonly email: string;

  @IsString()
  public password: string;
}
