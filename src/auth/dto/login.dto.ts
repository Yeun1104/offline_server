import { PickType } from '@nestjs/mapped-types';
import { User } from 'src/users/schema/user.schema';

export class LoginRequestDto extends PickType(User, [
  'userId',
  'userPassword',
] as const) {}
