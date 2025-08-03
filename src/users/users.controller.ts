import { Controller, Get, Param } from '@nestjs/common';

interface User {
  id: string;
  name: string;
  email: string;
}
@Controller('users')
export class UsersController {
  private readonly users: User[] = [
    {
      id: '1',
      name: 'John Doe',
      email: 'john.doe@example.com',
    },
    {
      id: '2',
      name: 'Jane Smith',
      email: 'jane.smith@example.com',
    },
  ];

  @Get()
  findAll() {
    return this.users;
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.users.find((user) => user.id === id);
  }
}
