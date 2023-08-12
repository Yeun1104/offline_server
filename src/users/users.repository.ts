import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User } from './schema/user.schema';
import { UserDto } from './dto/user.dto';

@Injectable()
export class UsersRepository {
  constructor(
    @InjectModel(User.name) private readonly userModel: Model<User>,
  ) {}

  async existsById(userId: string): Promise<boolean> {
    const result = await this.userModel.exists({ userId });
    return !!result;
  }

  // 로그인 시 유효한 아이디인지 확인하는 메서드
  async findUserById(userId: string): Promise<User | null> {
    const cat = await this.userModel.findOne({ userId });
    return cat;
  }

  async create(user: UserDto): Promise<User> {
    return await this.userModel.create(user);
  }
}
