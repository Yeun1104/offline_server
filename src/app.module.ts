import { Module, NestModule } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import mongoose from 'mongoose';
import { UsersModule } from './users/users.module';

@Module({
  //imports: [
  //  ConfigModule.forRoot(),
  //  MongooseModule.forRoot(process.env.MONGODB_URI),
  //  UsersModule,
  //],
  imports: [MongooseModule.forRoot('mongodb://localhost:27017/'), UsersModule],
  controllers: [],
  providers: [],
})
export class AppModule implements NestModule {
  private readonly isDev: boolean =
    process.env.NODE_ENV === 'dev' ? true : false;
  configure() {
    mongoose.set('debug', true); //mongoose 쿼리 logger
  }
}
