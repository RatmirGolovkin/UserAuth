import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UserService } from 'src/users/users.service';

@Injectable()
export class AuthService {
  constructor(
    private userService: UserService,
    private jwtService: JwtService,
  ) {}

  async login(request) {
    const user = await this.userService.login(request);

    console.log(user);

    if (!user) {
      throw new UnauthorizedException();
    }

    const payload = {
      id: request.id,
      firstname: request.firstname,
      lastname: request.lastname,
      email: request.email,
    };

    console.log('payload', payload);

    return {
      access_token: await this.jwtService.signAsync(payload),
    };
  }
}
