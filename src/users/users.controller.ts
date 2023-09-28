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
} from '@nestjs/common';
import { CreateUserDto } from './dto/user.dto';
import { UserService } from './users.service';
import { LoginDto } from './dto/login.user.dto';
// import { AuthService } from 'src/auth/auth.service';

@UsePipes(new ValidationPipe({ whitelist: true, forbidNonWhitelisted: true }))
@Controller('auth')
export class UserController {
  constructor(
    private readonly userService: UserService, // private authService: AuthService,
  ) {}

  @Get('get')
  getProfile(@Request() req) {
    return req.username;
  }

  @Post('register')
  createUser(@Body() createUserDto: CreateUserDto) {
    return this.userService.create(createUserDto);
  }

  @Post('login')
  async login(@Body() request: LoginDto) {
    return this.userService.login(request);
  }

  @Delete(':id')
  async delete(@Param('id') id: string) {
    return this.userService.delete(id);
  }
}
