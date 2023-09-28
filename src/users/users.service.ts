import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import * as bcrypt from 'bcrypt';
import { Model } from 'mongoose';
import { CreateUserDto } from './dto/user.dto';
import { UserAuth } from './schema/user.schema';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class UserService {
  constructor(
    @InjectModel(UserAuth.name) private readonly userModel: Model<UserAuth>,
    private jwtService: JwtService,
  ) {}

  // get all //

  async findAll(): Promise<UserAuth[]> {
    return this.userModel.find().exec();
  }

  // register //

  async create(UserDto: CreateUserDto) {
    console.log(UserDto);
    const existedUser = await this.userModel.findOne({
      firstname: UserDto.firstname,
      email: UserDto.email,
    });
    if (existedUser) {
      return 'Email already in use';
    }

    const salt = bcrypt.genSaltSync(10);
    const hash = bcrypt.hashSync(UserDto.password, salt);
    UserDto.password = hash;

    const user = await this.userModel.create(UserDto);
    const response = {
      id: user._id,
      firstname: user.firstname,
      lastname: user.lastname,
      email: user.email,
    };

    return response;
  }

  // login //

  async login(request: any) {
    const user = await this.userModel.findOne({
      firstname: request.firstname,
      email: request.email,
    });

    if (!user) {
      return 'User not found';
    }

    const comparePassword = await bcrypt.compare(
      request.password,
      user.password,
    );

    if (!comparePassword) {
      return 'Incorrect password';
    }

    const payload = {
      id: request.id,
      firstname: request.firstname,
      lastname: request.lastname,
      email: request.email,
    };

    return {
      access_token: await this.jwtService.signAsync(payload),
    };
  }

  // delete //

  async delete(id: string) {
    const deletedUser = await this.userModel
      .findByIdAndRemove({ _id: id })
      .exec();
    return deletedUser;
  }
}
