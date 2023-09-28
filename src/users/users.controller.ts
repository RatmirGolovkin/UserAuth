import {
  UsePipes,
  ValidationPipe,
  Controller,
  Get,
  Post,
  Body,
  Delete,
  Param,
  Request,
  UseGuards,
} from '@nestjs/common';
import { CreateUserDto } from './dto/user.dto';
import { UserService } from './users.service';

@UsePipes(new ValidationPipe({ whitelist: true, forbidNonWhitelisted: true }))
@Controller('auth')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @UseGuards()
  @Get('profile')
  getProfile(@Request() req) {
    const response = {
      firstname: req.username.firstname,
      lastname: req.username.lastname,
      email: req.username.email,
    };

    return response;
  }

  @Post('register')
  createUser(@Body() createUserDto: CreateUserDto) {
    return this.userService.create(createUserDto);
  }

  @Post('login')
  async login(@Body() request: any) {
    return this.userService.login(request);
  }

  @Delete(':id')
  async delete(@Param('id') id: string) {
    return this.userService.delete(id);
  }
}
