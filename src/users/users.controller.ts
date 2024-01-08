import { Controller, Get, Param, Req, UseGuards } from '@nestjs/common';
import { UsersService } from './users.service';
import { JWTAuthGuard } from 'src/auth/jwt.guard';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}
  @Get('readAllUsers')
  getAllUsers() {
    return this.usersService.getAllUsers();
  }

  @UseGuards(JWTAuthGuard)
  @Get(':id')
  getUserById(@Param() params: { id: string }, @Req() req) {
    return this.usersService.getUserById(params.id, req);
  }
}
