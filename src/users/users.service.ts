import {
  ForbiddenException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { Request } from 'express';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class UsersService {
  constructor(private prisma: PrismaService) {}

  async getUserById(id: string, req: Request) {
    const userData = await this.prisma.user.findUnique({ where: { id } });
    if (!userData) {
      throw new NotFoundException();
    }
    const decodeUser = req.user as { id: string; email: string };
    // console.log(userData);
    if (userData.id !== decodeUser.id) {
      throw new ForbiddenException();
    }
    delete userData.password;
    return { message: 'Get User By ID', user: userData };
    // return this.prisma.user.findUnique({ where: { id } });
  }

  async getAllUsers() {
    return await this.prisma.user.findMany({
      select: { id: true, email: true },
    });
  }
}
