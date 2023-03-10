import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import * as bcrypt from 'bcrypt';
import { UserService } from 'src/user/user.service';
import { User } from '@prisma/client';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(
    private  prisma: PrismaService,
    private userService: UserService,
    private jwtService: JwtService
  ) { }

  async singup(data: User): Promise<User> {
    let user: User;

    try {
      user = await this.prisma.user.findUnique({ where: { user: data.user } });
    } catch (err) {
      throw new UnauthorizedException(
        `Username already exists: ${user.user}`,
      );
    }

    if (!user) {
      //const saltOrRounds = 10;
      //const hash = await bcrypt.hash(data.password, saltOrRounds);
      //data.password=hash;
      return this.userService.createUser(data);
    }else
      
    return user;
  }

  async login(email: string, password: string) {
    let user: User;

    try {
      user = await this.prisma.user.findUnique({ where: { user: email } });
    } catch (err) {
      throw new UnauthorizedException(
        `There isn't any user with email: ${email}`,
      );
    }
    if(!user){
    if (!(await this.checkPassword(password, user))) {
      throw new UnauthorizedException(
        `Wrong password for user with email: ${email}`,
      );
    }}else
    throw new UnauthorizedException(
      `password or user incorrect: ${email}`,
    );

    return this.loginToken(user);
  }

  async checkPassword(plainPassword: string, user: User): Promise<boolean> {
    return await bcrypt.compare(plainPassword, user.password);
  }

  async loginToken(user: User) {
    const payload = { username: user.user, sub: user.id };
    return {
      access_token: this.jwtService.sign(payload),
    };
  }
  /* 
    async verifyPayload(payload: JwtPayload): Promise<User> {
      let user: User;
  
      try {
        user = await this.prisma.user.findUnique({ where: { user: payload.sub } });
      } catch (error) {
        throw new UnauthorizedException(
          `There isn't any user with email: ${payload.sub}`,
        );
      }
      delete user.password;
  
      return user;
    }

  signToken(user: User): string {
    const payload = {
      sub: user.user,
    };

    return this.jwtService.sign(payload);
  } */

}
