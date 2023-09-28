import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { UserAuth, UserSchema } from './schema/user.schema';
import { UserController } from './users.controller';
import { UserService } from './users.service';
import { AuthService } from 'src/auth/auth.service';
import { APP_GUARD } from '@nestjs/core';
import { AuthGuard } from 'src/auth/auth.guards';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: UserAuth.name, schema: UserSchema }]),
  ],
  providers: [
    UserService,
    AuthService,
    {
      provide: APP_GUARD,
      useClass: AuthGuard,
    },
  ],
  controllers: [UserController],
  exports: [UserService],
})
export class UsersModule {}
