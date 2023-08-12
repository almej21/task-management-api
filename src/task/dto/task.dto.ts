import { IsNotEmpty, IsString } from 'class-validator';

export class TaskDto {
  id?: number;

  @IsNotEmpty()
  @IsString()
  author: string;

  @IsNotEmpty()
  @IsString()
  title: string;

  @IsNotEmpty()
  @IsString()
  description: string;

  dueDate: string;

  status: string;
}
