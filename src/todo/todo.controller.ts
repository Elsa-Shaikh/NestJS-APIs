import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Post,
  Put,
} from '@nestjs/common';
import { TodoService } from './todo.service';
import { Prisma } from '@prisma/client';

@Controller('todos')
export class TodoController {
  constructor(private readonly todoService: TodoService) {}

  @Post('create')
  createTodo(@Body() body: Prisma.TodoCreateInput) {
    return this.todoService.createTodo(body);
  }

  @Put('update/:id')
  updateTodo(@Param('id') id: string, @Body() body: Prisma.TodoUpdateInput) {
    return this.todoService.updateTodo(parseInt(id), body);
  }

  @Delete('delete/:id')
  deleteTodo(@Param('id') id: string) {
    return this.todoService.deleteTodo(parseInt(id));
  }

  @Get('read/:id')
  getTodo(@Param('id', ParseIntPipe) id: number) {
    return this.todoService.getTodo(id);
  }

  @Get()
  getAllTodos() {
    return this.todoService.getAllTodos();
  }
}
