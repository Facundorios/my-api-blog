import { ApiProperty } from '@nestjs/swagger';
import { User } from '../../users/entities/user.entity';
import { Category } from './category.entity';
import {
  Entity,
  Column,
  CreateDateColumn,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
  ManyToOne,
  JoinColumn,
  ManyToMany,
  JoinTable,
} from 'typeorm';

@Entity({
  name: 'posts',
})
export class Post {
  @PrimaryGeneratedColumn()
  id: number;

  @ApiProperty({
    example: 'My First Post',
    description: 'The title of the post',
  })
  @Column({ type: 'varchar', length: 255 })
  title: string;

  @ApiProperty({
    example: 'This is the content of my first post.',
    description: 'The content of the post',
  })
  @Column({ type: 'text', nullable: true })
  content: string;

  @ApiProperty({
    example: 'https://example.com/cover.jpg',
    description: 'The cover image URL of the post',
  })
  @Column({ type: 'varchar', length: 255, name: 'cover_image', nullable: true })
  coverImage: string;

  @ApiProperty({
    example: 'This is a summary of my first post.',
    description: 'The summary of the post',
  })
  @Column({ type: 'varchar', length: 255, name: 'summary', nullable: true })
  summary: string;

  @ApiProperty({
    example: true,
    description: 'Indicates if the post is a draft',
  })
  @Column({ type: 'boolean', default: true, name: 'is_draft' })
  isDraft: boolean;

  @ApiProperty({
    example: '2023-03-15T12:00:00Z',
    description: 'The date when the post was created',
  })
  @CreateDateColumn({
    type: 'timestamptz',
    default: () => 'CURRENT_TIMESTAMP',
    name: 'created_at',
  })
  createdAt: Date;

  @ApiProperty({
    example: '2023-03-16T12:00:00Z',
    description: 'The date when the post was last updated',
  })
  @UpdateDateColumn({
    type: 'timestamptz',
    default: () => 'CURRENT_TIMESTAMP',
    name: 'updated_at',
  })
  updatedAt: Date;

  @ManyToOne(() => User, (user) => user.posts, { nullable: false })
  @JoinColumn({ name: 'user_id' })
  user: User;

  @ManyToMany(() => Category, (category) => category.posts, { nullable: false })
  @JoinTable({
    name: 'posts_categories',
    joinColumn: { name: 'post_id', referencedColumnName: 'id' },
    inverseJoinColumn: { name: 'category_id', referencedColumnName: 'id' },
  })
  categories: Category[];
}
