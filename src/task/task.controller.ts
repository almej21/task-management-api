import {
  Body,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Post,
  Res,
  UseGuards,
} from '@nestjs/common';
import { Response } from 'express';
import { AtGuard } from 'src/common/guards';
import { TaskDto } from './dto/task.dto';
import { TaskService } from './task.service';

@Controller('task')
@UseGuards(AtGuard)
export class TaskController {
  constructor(private taskService: TaskService) {}

  @Post('/create')
  @HttpCode(HttpStatus.CREATED)
  async create(@Body() dto: TaskDto, @Res() res: Response) {
    const newTask = await this.taskService.create(dto);
    if (newTask) {
      res.status(201).send({ msg: 'Task created', newTask });
    }
  }

  @Get('/getall')
  @HttpCode(HttpStatus.OK)
  read() {
    return this.taskService.getall();
  }

  // @Post('/edit')
  // @HttpCode(HttpStatus.OK)
  // edit(@Body() dto: TaskDto): Promise<Task> {
  //     return this.taskService.edit(dto);
  // }

  // @Delete('/delete')
  // @HttpCode(HttpStatus.OK)
  // Delete(@Req() req: Request) {
  //     const user = req.user;
  //     return this.taskService.Delete();
  // }
}
