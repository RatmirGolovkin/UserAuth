import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { UsersModule } from '../users/users.module';
import { JwtModule } from '@nestjs/jwt';
import { jwtConstants } from './constants';
import { APP_GUARD } from '@nestjs/core';
import { AuthGuard } from './auth.guards';
import { MongooseModule } from '@nestjs/mongoose';
import { UserAuth, UserSchema } from 'src/users/schema/user.schema';
import { UserService } from 'src/users/users.service';

@Module({
  imports: [
    UsersModule,
    JwtModule.register({
      global: true,
      secret: jwtConstants.secret,
      signOptions: { expiresIn: '5min' },
    }),
    MongooseModule.forFeature([{ name: UserAuth.name, schema: UserSchema }]),
  ],
  providers: [
    {
      provide: APP_GUARD,
      useClass: AuthGuard,
    },
    AuthService,
    UserService,
  ],
})
export class AuthModule {}
