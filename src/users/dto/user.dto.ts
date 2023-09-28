import { IsEmail, IsString } from 'class-validator';

export class CreateUserDto {
  @IsString()
  readonly firstname: string;

  @IsString()
  readonly lastname: string;

  @IsEmail()
  @IsString()
  readonly email: string;

  @IsString()
  public password: string;
}
