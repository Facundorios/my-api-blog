import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { Post } from '../entities/post.entity';
import { CreatePostDto, UpdatePostDto } from '../dto/post.dto';

@Injectable()
export class PostsService {
  constructor(
    @InjectRepository(Post)
    private postsRepository: Repository<Post>,
  ) {}

  async findAll(): Promise<Post[]> {
    const posts = await this.postsRepository.find();
    return posts;
  }

  async getPostById(id: number): Promise<Post> {
    const post = await this.findOne(id);
    return post;
  }

  async create(body: CreatePostDto): Promise<Post> {
    try {
      const post = await this.postsRepository.save(body);
      return post;
    } catch (error) {
      throw new BadRequestException('Error creating post', error);
    }
  }

  async update(id: string, changes: UpdatePostDto): Promise<Post> {
    try {
      const post = await this.findOne(+id);
      const updatedPost = this.postsRepository.merge(post, changes);
      return await this.postsRepository.save(updatedPost);
    } catch (error) {
      throw new BadRequestException('Error updating post', error);
    }
  }

  async remove(id: number): Promise<{ message: string }> {
    try {
      await this.postsRepository.delete(id);
      return { message: 'Post deleted successfully' };
    } catch (error) {
      throw new BadRequestException('Error deleting post', error);
    }
  }

  private async findOne(id: number) {
    const post = await this.postsRepository.findOne({
      where: { id },
      relations: ['user.profile'],
    });
    if (!post) throw new NotFoundException(`Post with ID ${id} not found`);
    return post;
  }
}
