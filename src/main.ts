import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
// var redis = require('redis');

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors();
  app.useGlobalPipes(new ValidationPipe());
  await app.listen(4000);
}

// const client1 = redis.createClient();
// const client2 = redis.createClient();
// // Subscribe to a channel
// client1.subscribe('channel1');
// // Listen for messages on the channel
// client1.on('message', (channel, message) => {
//   console.log(`Received message on channel ${channel}: ${message}`);
// });
// // Publish a message to the channel
// client2.publish('channel1', 'Hello, world!');

bootstrap();
