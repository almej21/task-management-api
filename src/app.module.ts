import { Module } from '@nestjs/common';
import { AuthModule } from './auth/auth.module';
import { PrismaModule } from './prisma/prisma.module';
import { TaskModule } from './task/task.module';

@Module({
  imports: [AuthModule, TaskModule, PrismaModule],
})
export class AppModule {}
