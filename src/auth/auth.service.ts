import {
  BadRequestException,
  ForbiddenException,
  Injectable,
} from '@nestjs/common';
import { AuthDto, AuthLoginDto } from './dto/auth.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { jwtSecret } from 'src/utils/constants';
import { Request, Response } from 'express';

@Injectable()
export class AuthService {
  constructor(
    private prisma: PrismaService,
    private jwt: JwtService,
  ) {}

  async signup(dto: AuthDto) {
    const { name, email, password } = dto;
    const foundEmail = await this.prisma.user.findUnique({ where: { email } });
    if (foundEmail) {
      throw new BadRequestException('Email Already Exists!');
    }
    const hashedPassword = await this.hashPassword(password);
    const userData = await this.prisma.user.create({
      data: {
        name,
        email,
        password: hashedPassword,
      },
    });
    return { message: 'Signup was successfull!', data: userData };
  }

  async signin(dto: AuthLoginDto, req: Request, res: Response) {
    const { email, password } = dto;

    const foundEmail = await this.prisma.user.findUnique({ where: { email } });
    if (!foundEmail) {
      throw new BadRequestException('Wrong Credentials!');
    }
    const isMatch = await this.comparePassword({
      password,
      hash: foundEmail.password,
    });
    if (!isMatch) {
      throw new BadRequestException('Wrong Credentials!');
    }
    //jwt and return to the user
    const token = await this.signToken({
      id: foundEmail.id,
      email: foundEmail.email,
    });
    if (!token) {
      throw new ForbiddenException();
    }
    res.cookie('token', token);

    // return { message: 'Signin was successfull!', token: token };
    return res.send({ message: 'Logged in Successfully!' });
  }
  async signout(req: Request, res: Response) {
    res.clearCookie('token');
    return res.send({ message: 'Logged Out Successfully!' });
  }

  async hashPassword(password: string) {
    const saltOrRounds = 10;
    const hashPass = await bcrypt.hash(password, saltOrRounds);
    return hashPass;
  }

  async comparePassword(args: { password: string; hash: string }) {
    return await bcrypt.compare(args.password, args.hash);
  }

  async signToken(args: { id: string; email: string }) {
    const payload = args;
    return this.jwt.signAsync(payload, { secret: jwtSecret });
  }
}
