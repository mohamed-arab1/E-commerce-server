/* eslint-disable prettier/prettier */
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { UserRole } from './user-role.enum';

@Schema()
export class User extends Document {
  @Prop({ unique: true, index: true, sparse: true })
  email: string;

  @Prop({ unique: true, index: true, sparse: true })
  googleId?: string;

  @Prop({ unique: true, index: true, sparse: true })
  facebookId?: string;

  @Prop({ unique: true, index: true, sparse: true })
  xId?: string;

  @Prop({ Selection: false })
  password: string;

  @Prop({ Selection: false })
  hashedRT?: string;

  @Prop()
  name: string;

  @Prop()
  avatar?: string;

  @Prop({ enum: UserRole, default: UserRole.CLIENT })
  role: UserRole;
}

export const UserSchema = SchemaFactory.createForClass(User);
export type UserDocument = User & Document;
