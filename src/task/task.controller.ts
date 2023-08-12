import {
  Body,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
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
    return this.taskService.getall();
  }

  @Put('/edit')
  @HttpCode(HttpStatus.OK)
  async edit(@Body('id') id: number, @Body() dto: any, @Res() res: Response) {
    const editedTask = await this.taskService.edit(id, dto);
    res.status(201).send({ msg: 'Task edited', editedTask });
  }

  // @Delete('/delete')
  // @HttpCode(HttpStatus.OK)
  // Delete(@Req() req: Request) {
  //     const user = req.user;
  //     return this.taskService.Delete();
  // }
}
