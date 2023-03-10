import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { PrismaModule } from 'src/prisma/prisma.module';
import { UserModule } from 'src/user/user.module';
import { JwtModule } from '@nestjs/jwt';
import { jwtConstants } from './constants';
import { LocalStrategy } from './local.strategy';
import { PassportModule } from '@nestjs/passport';
import { JwtStrategy } from './jwt.strategy';


@Module({
  imports: [PrismaModule, UserModule,PassportModule, JwtModule.register({
    secret: jwtConstants.secret,
    signOptions: { expiresIn: '120s' },
  }),],
  controllers: [AuthController],
  providers: [AuthService, LocalStrategy,JwtStrategy]
})
export class AuthModule { }
