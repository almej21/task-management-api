import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  Post,
  Put,
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
  getall() {
    console.log('get all tasks endpoint request');
    return this.taskService.getall();
  }

  @Put('/edit')
  @HttpCode(HttpStatus.OK)
  async edit(@Body('id') id: number, @Body() dto: any, @Res() res: Response) {
    const editedTask = await this.taskService.edit(id, dto);
    res.status(201).send({ msg: 'Task edited', editedTask });
  }

  @Delete('/delete/:id')
  @HttpCode(HttpStatus.OK)
  async Delete(@Param('id') id: number, @Res() res: Response) {
    console.log('delete task request');
    if (await this.taskService.delete(id)) {
      return res.status(200).send({ msg: 'Task deleted' });
    } else {
      return res.status(501).send({ msg: 'Task is not deleted' });
    }
  }
}
