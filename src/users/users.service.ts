import { Injectable, UnauthorizedException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import * as bcrypt from 'bcrypt';
import { UserDto } from './dto/user.dto';
import { User } from 'src/users/schema/user.schema';

@Injectable()
export class UsersService {
  constructor(
    @InjectModel(User.name) private readonly userModel: Model<User>,
  ) {}

  async signUp(body: UserDto) {
    const {
      userName,
      userBirth,
      userId,
      userLocation,
      userPassword,
      userPhonenumber,
    } = body;
    const isUserExist = await this.userModel.exists({ userId });

    if (isUserExist) {
      throw new UnauthorizedException('Already exists the user!');
    }

    const hashedPassword = await bcrypt.hash(userPassword, 10);

    const user = await this.userModel.create({
      userName,
      userBirth,
      userId,
      userLocation,
      userPassword: hashedPassword,
      userPhonenumber,
    });

    return user;
  }
}

//  findAll(): Promise<Cat[]> {
//    return this.catsRepository.find();
//  }
//
//  findOne(id: number): Promise<Cat> {
//    return this.catsRepository.findOne({ comment: String(id) });
//  }
//
//  async create(cat: Cat): Promise<void> {
//    await this.catsRepository.save(cat);
//  }
//
//  async remove(id: number): Promise<void> {
//    await this.catsRepository.delete(id);
//  }
//
//  async update(id: number, cat: Cat): Promise<void> {
//    const existCat = await this.findOne(id);
//    if (existCat) {
//      await getConnection()
//        .createQueryBuilder()
//        .update(Cat)
//        .set({
//          user_name: cat.user_name,
//          user_nickname: cat.user_nickname,
//          user_birth: cat.user_birth,
//          user_location: cat.user_location,
//          user_phonenumber: cat.user_phonenumber,
//        })
//        .where('id = :id', { id })
//        .execute();
//    }
//  }
