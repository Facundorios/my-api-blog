import {
  BadRequestException,
  ForbiddenException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { Post } from '../entities/post.entity';
import { CreatePostDto, UpdatePostDto } from '../dto/post.dto';
import { OpenaiService } from 'src/ai/services/openai.service';

@Injectable()
export class PostsService {
  constructor(
    private readonly openaiService: OpenaiService,

    @InjectRepository(Post)
    private postsRepository: Repository<Post>,
  ) {}

  async findAll(): Promise<Post[]> {
    const posts = await this.postsRepository.find({
      relations: ['user.profile', 'categories'],
    });
    return posts;
  }

  async getPostById(id: number): Promise<Post> {
    const post = await this.findOne(id);
    return post;
  }

  async create(body: CreatePostDto, id: number): Promise<Post> {
    try {
      const post = await this.postsRepository.save({
        ...body,
        user: { id },
        categories: body.categoryIds.map((id) => ({ id })),
      });
      return post;
    } catch (error) {
      throw new BadRequestException('Error creating post', error);
    }
  }

  async publish(id: number, user_id: number) {
    const post = await this.findOne(id);
    if (post.user.id !== user_id) {
      throw new ForbiddenException('This action is not permitted.');
    }

    if (!post.title || post.categories.length === 0 || !post.content) {
      throw new BadRequestException('No hay datos para generar el resumen');
    }

    const summary = await this.openaiService.generateSummary(post.content);
    const image = await this.openaiService.generateImage(summary);

    const publishedPost = this.postsRepository.merge(post, {
      summary,
      isDraft: true,
      coverImage: image,
    });

    const updatedPost = await this.postsRepository.save(post);
    return this.findOne(updatedPost.id);
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

  async findPostsByCategoryId(id: number) {
    const posts = await this.postsRepository.find({
      where: { categories: { id } },
      relations: ['user.profile'],
    });

    if (!posts) throw new BadRequestException('NOT POSTS FOUND');
    return posts;
  }

  private async findOne(id: number) {
    const post = await this.postsRepository.findOne({
      where: { id },
      relations: ['user.profile', 'categories'],
    });
    if (!post) throw new NotFoundException(`Post with ID ${id} not found`);
    return post;
  }
}
