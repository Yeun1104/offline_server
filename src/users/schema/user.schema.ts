import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { IsNotEmpty, IsString } from 'class-validator';
import { Document, SchemaOptions } from 'mongoose';

//스키마 옵션
const options: SchemaOptions = {
  timestamps: true,
  versionKey: false,
};

//스키마 정의
@Schema(options)
export class User extends Document {
  @Prop({
    required: true, // 반드시 존재해야함
    unique: true, // unique한 값이어야함
  })
  @IsString()
  @IsNotEmpty()
  readonly userId: string;

  @Prop({
    required: true,
  })
  @IsString()
  @IsNotEmpty()
  userName: string;

  @Prop({
    required: true,
    unique: true,
  })
  @IsString()
  @IsNotEmpty()
  userPassword: string;

  @Prop({
    required: true,
  })
  @IsString()
  @IsNotEmpty()
  userLocation: string;

  @Prop({
    required: true,
  })
  @IsString()
  userBirth: number;

  @Prop({
    required: true,
    unique: true,
  })
  @IsString()
  @IsNotEmpty()
  readonly userPhonenumber: number;

  // virtual field 설정 코드 (mongoose 에서 보여주고 싶은 데이터만 보여줄 수 있음)
  //readonly readOnlyData: {
  //  userId: string;
  //  userName: string;
  //  userPhonenumber: number;
  //};
}

// User 클래스를 스키마로 만듦
export const UserSchema = SchemaFactory.createForClass(User);
