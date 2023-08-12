import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { PrismaClient } from '@prisma/client';
import { PrismaService } from 'src/prisma/prisma.service';
import { TaskDto } from './dto/task.dto';
const prisma = new PrismaClient();

@Injectable()
export class TaskService {
  constructor(
    private prisma: PrismaService,
    private jwtService: JwtService,
  ) {}

  async create(dto: TaskDto) {
    // creating a new task
    const newTask = await this.prisma.task.create({
      data: {
        author: dto.author,
        title: dto.title,
        description: dto.description,
        dueDate: dto.dueDate,
        status: dto.status,
      },
    });

    return newTask;
  }

  async getall() {
    const tasks = await this.prisma.task.findMany();

    return tasks;
  }
}
