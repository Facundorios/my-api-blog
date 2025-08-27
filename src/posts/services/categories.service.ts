import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { Category } from '../entities/category.entity';
import { CreateCategoryDto, UpdateCategoryDto } from '../dto/category.dto';

@Injectable()
export class CategoriesService {
  constructor(
    @InjectRepository(Category)
    private categoriesRepository: Repository<Category>,
  ) {}

  async findAll(): Promise<Category[]> {
    const categories = await this.categoriesRepository.find();
    return categories;
  }

  async getCategoryById(id: number): Promise<Category> {
    const category = await this.findOne(id);
    return category;
  }

  async create(body: CreateCategoryDto): Promise<Category> {
    try {
      const category = await this.categoriesRepository.save(body);
      return category;
    } catch (error) {
      throw new BadRequestException('Error creating category', error);
    }
  }

  async update(id: string, changes: UpdateCategoryDto): Promise<Category> {
    try {
      const category = await this.findOne(+id);
      const updatedCategory = this.categoriesRepository.merge(
        category,
        changes,
      );
      return await this.categoriesRepository.save(updatedCategory);
    } catch (error) {
      throw new BadRequestException('Error updating category', error);
    }
  }

  async remove(id: string): Promise<{ message: string }> {
    try {
      await this.categoriesRepository.delete(id);
      return { message: 'Category deleted successfully' };
    } catch (error) {
      throw new BadRequestException('Error deleting category', error);
    }
  }

  private async findOne(id: number) {
    const category = await this.categoriesRepository.findOne({
      where: { id },
    });
    if (!category) throw new NotFoundException('Category not found');
    return category;
  }
}
