import {
  IsDateString,
  IsEmail,
  IsNotEmpty,
  IsStrongPassword,
} from 'class-validator';

export class CreateUserDto {
  @IsNotEmpty()
  name: string;

  @IsEmail()
  email: string;

  @IsNotEmpty()
  cpf: string;

  @IsStrongPassword()
  password: string;

  @IsDateString()
  birthAt: Date;
}
