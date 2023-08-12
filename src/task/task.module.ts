import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { AtStrategy, RtStrategy } from 'src/auth/strategies';
import { TaskController } from './task.controller';
import { TaskService } from './task.service';


@Module({
  imports: [JwtModule.register({})],
  controllers: [TaskController],
  providers: [TaskService, AtStrategy, RtStrategy]
})
export class TaskModule {}
