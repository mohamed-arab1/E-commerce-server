import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema()
export class User extends Document {
  @Prop({ unique: true, index: true })
  email: string;

  @Prop({ Selection: false })
  password: string;

  @Prop({ Selection: false })
  hashedRT?: string;

  @Prop()
  name: string;

  @Prop()
  avatar?: string;
}

export const UserSchema = SchemaFactory.createForClass(User);
export type UserDocument = User & Document;

/*
import {
  BeforeInsert,
  Column,
  Entity,
  ManyToMany,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { genSalt, hash } from 'bcrypt';
import { TaskEntity } from 'src/tasks/entities/task.entity';
import { CategoryEntity } from 'src/categories/schemas/category.schema';

@Entity('Users')
export class UserEntity {
  @PrimaryGeneratedColumn()
  id: string;

  @Column({ unique: true })
  email: string;

  @Column({ select: false })
  password: string; // Store securely using hashing (bcrypt)

  @Column()
  name: string;

  @Column()
  linkedinUrl: string; // Optional for LinkedIn profile scraping

  @Column({ nullable: true })
  avatar?: string; // Optional for storing user avatar

  @BeforeInsert()
  async hashPassword(password: string) {
    const salt = await genSalt();
    this.password = await hash(password || this.password, salt);
  }

  @ManyToMany(() => CategoryEntity, (category) => category.user)
  categories?: CategoryEntity[]; // Optional: Associate categories with a user

  @OneToMany(() => TaskEntity, (task) => task.user)
  tasks: TaskEntity[];
}
*/
