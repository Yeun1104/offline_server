import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import mongoose from 'mongoose';
import { UsersModule } from './users/users.module';
import { AuthModule } from './auth/auth.module';
import { LoggerMiddleware } from './common/middlewares/logger/logger.middleware';

@Module({
  //imports: [
  //  ConfigModule.forRoot(),
  //  MongooseModule.forRoot(process.env.MONGODB_URI),
  //  UsersModule,
  //],
  imports: [
    MongooseModule.forRoot('mongodb://localhost:27017/'),
    UsersModule,
    AuthModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule implements NestModule {
  private readonly isDev: boolean =
    process.env.NODE_ENV === 'dev' ? true : false;
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(LoggerMiddleware).forRoutes('*');
    mongoose.set('debug', true); //mongoose 쿼리 logger
  }
}
