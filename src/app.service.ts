import { Injectable, OnModuleDestroy, OnModuleInit } from '@nestjs/common';

@Injectable()
export class AppService implements OnModuleInit, OnModuleDestroy {
  constructor() {}

  async onModuleInit() {}

  onModuleDestroy() {}
}
