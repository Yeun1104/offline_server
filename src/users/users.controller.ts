import { Body, Controller, Post, UseInterceptors } from '@nestjs/common';
import { SuccessInterceptor } from 'src/common/interceptors/success.interceptor';
import { UserDto } from './dto/user.dto';
import { UsersService } from './users.service';

@Controller('users')
@UseInterceptors(SuccessInterceptor)
export class UsersController {
  constructor(private readonly catsService: UsersService) {}

  @Post()
  async signUp(@Body() body: UserDto) {
    return await this.catsService.signUp(body);
  }
}
//  @Get()
//  findAll(): Promise<Cat[]> {
//    return this.catsService.findAll();
//  }
//
//  @Get(':id')
//  findOne(@Param('id') id: number): Promise<Cat> {
//    return this.catsService.findOne(id);
//  }
//
//  @Post()
//  create(@Body() cat: Cat) {
//    return this.catsService.create(cat);
//  }
//
//  @Delete(':id')
//  remote(@Param('id') id: number) {
//    this.catsService.remove(id);
//  }
//
//  @Put(':id')
//  update(@Param('id') id: number, @Body() cat: Cat) {
//    this.catsService.update(id, cat);
//    return `This action is update a #${id} cat`;
//  }
