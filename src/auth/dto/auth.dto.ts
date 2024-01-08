import { IsEmail, IsNotEmpty, IsString, Length } from 'class-validator';

export class AuthDto {
  @IsNotEmpty()
  @IsString()
  public name: string;

  @IsEmail()
  public email: string;

  @IsNotEmpty()
  @IsString()
  @Length(5, 10, {
    message: 'Password has to be at between 5 and 10 characters',
  })
  public password: string;
}

export class AuthLoginDto {
  @IsEmail()
  public email: string;

  @IsNotEmpty()
  @IsString()
  public password: string;
}
