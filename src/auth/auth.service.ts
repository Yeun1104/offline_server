import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UsersRepository } from 'src/users/users.repository';
import { LoginRequestDto } from './dto/login.dto';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(
    private readonly usersRepository: UsersRepository,
    private readonly jwtService: JwtService, // auth.module의 JwtModule로부터 공급 받음
  ) {}

  async jwtLogin(data: LoginRequestDto) {
    const { userId, userPassword } = data;
    const user = await this.usersRepository.findUserById(userId);
    if (!user) {
      throw new UnauthorizedException('아이디와 비밀번호를 확인해주세요.');
    }
    const isPasswordValidated: boolean = await bcrypt.compare(
      userPassword,
      user.userPassword,
    );
    if (!isPasswordValidated) {
      throw new UnauthorizedException('비밀번호가 일치하지 않습니다.');
    }
    const payload = { userId, sub: user.id };
    return {
      token: this.jwtService.sign(payload),
    };
  }
}
