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
        id: dto.id || undefined,
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

  async edit(id: number, dto: TaskDto) {
    return this.prisma.task.update({
      where: { id: Number(id) },
      data: {
        author: dto.author || undefined,
        title: dto.title || undefined,
        description: dto.description || undefined,
        dueDate: dto.dueDate || undefined,
        status: dto.status || undefined,
      },
    });
  }

  async delete(id: number) {
    try {
      await this.prisma.task.delete({
        where: { id: Number(id) },
      });
      return true;
    } catch (err) {
      return false;
    }
  }
}
