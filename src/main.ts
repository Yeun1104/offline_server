import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import mongoose from 'mongoose';

mongoose.Promise = global.Promise;

const MONGO_HOST = 'localhost';
const MONGO_URI = `mongodb://${MONGO_HOST}:27017/`;

mongoose
  .connect(MONGO_URI)
  .then(() => console.log('Successfully connected to mongodb'))
  .catch((error) => console.error(error));
console.log('Starting nest server port: 3000');

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(
    new ValidationPipe({
      // express 의 middleware 역할
      whitelist: true, // 인자로 받는 것만 들어오게 함
      forbidNonWhitelisted: true, // 메세지로 해당 인자는 사용할 수 없다고 안내
      transform: true, // 우리가 원하는 타입으로 변환
    }),
  );
  //const PORT = process.env.PORT;
  //await app.listen(PORT);
  await app.listen(3000);
  console.log(`Application is running on: ${await app.getUrl()}`);
}
bootstrap();
