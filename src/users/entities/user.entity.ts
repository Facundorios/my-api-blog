import {
  Column,
  Entity,
  CreateDateColumn,
  UpdateDateColumn,
  PrimaryGeneratedColumn,
  OneToOne,
  JoinColumn,
  OneToMany,
  BeforeInsert,
} from 'typeorm';
import * as bcrypt from 'bcrypt';

import { Profile } from './profile.entity';
import { Post } from '../../posts/entities/post.entity';
import { Exclude } from 'class-transformer';

@Entity({
  name: 'users',
})
export class User {
  @PrimaryGeneratedColumn('increment')
  id: number;

  @Column({ type: 'varchar', length: 255, unique: true })
  email: string;

  @Exclude()
  @Column({ type: 'varchar', length: 255 })
  password: string;

  @CreateDateColumn({
    type: 'timestamptz',
    default: () => 'CURRENT_TIMESTAMP',
    name: 'created_at',
  })
  createdAt: Date;

  @UpdateDateColumn({
    type: 'timestamptz',
    default: () => 'CURRENT_TIMESTAMP',
    name: 'updated_at',
  })
  updatedAt: Date;

  @OneToOne(() => Profile, { nullable: false, cascade: true, eager: true })
  @JoinColumn({ name: 'profile_id' })
  profile: Profile;

  @OneToMany(() => Post, (post) => post.user)
  posts: Post[];

  @BeforeInsert()
  async hashPassword() {
    this.password = bcrypt.hashSync(this.password, 10);
  }
}
