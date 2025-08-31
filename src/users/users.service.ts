import {
  BadRequestException,
  ForbiddenException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { User } from './entities/user.entity';
import { CreateUserDto, UpdateUserDto } from './dto/user.dto';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>,
  ) {}

  async findAll(): Promise<User[]> {
    const users = await this.usersRepository.find();
    return users;
  }

  async getUserById(id: number): Promise<User> {
    const user = await this.findOne(id);
    if (user.id === 1) {
      throw new ForbiddenException('User not found');
    }
    return user;
  }

  async getPostsByUserId(id: number) {
    const user = await this.usersRepository.findOne({
      where: { id },
      relations: ['posts'],
    });
    if (!user) {
      throw new NotFoundException(`User with ${id} was not found`);
    }
    return user.posts;
  }

  async create(body: CreateUserDto): Promise<User> {
    try {
      const user = await this.usersRepository.save(body);
      return user;
    } catch (error) {
      throw new BadRequestException('Error creating user', error);
    }
  }

  async update(id: string, changes: UpdateUserDto): Promise<User> {
    try {
      const user = await this.findOne(+id);
      const updatedUser = this.usersRepository.merge(user, changes);
      console.log(updatedUser);
      return await this.usersRepository.save(updatedUser);
    } catch (error) {
      throw new BadRequestException('Error updating user', error);
    }
  }

  async remove(id: string): Promise<{ message: string }> {
    try {
      await this.usersRepository.delete(id);
      return { message: 'User deleted successfully' };
    } catch (error) {
      throw new BadRequestException('Error deleting user', error);
    }
  }

  private async findOne(id: number) {
    const user = await this.usersRepository.findOne({
      where: { id },
      relations: ['profile'],
    });
    if (!user) throw new NotFoundException('User not found');
    return user;
  }
}
