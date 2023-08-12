import { IsNotEmpty, IsString } from 'class-validator';

export class AuthDto {
  user_name?: string;

  @IsNotEmpty()
  @IsString()
  email: string;

  @IsNotEmpty()
  @IsString()
  password: string;
}
