/* eslint-disable prettier/prettier */
import {
  BadRequestException,
  Inject,
  Injectable,
  NotAcceptableException,
  forwardRef,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { CreateUserDto } from './dto/create-user.dto';
import { User } from './user.schema';
import { Model } from 'mongoose';
import { UpdateUserDto } from './dto/update-user.dto';
import { AuthService } from 'src/auth/auth.service';

@Injectable()
export class UsersService {
  constructor(
    @InjectModel(User.name)
    private userModel: Model<User>,
    @Inject(forwardRef(() => AuthService))
    private authService: AuthService,
  ) {}

  async createUser(createUserDto: CreateUserDto): Promise<User> {
    const userExist = await this.userModel.findOne({
      email: createUserDto.email,
    });
    if (userExist) {
      throw new BadRequestException(`Email is already used`);
    }

    const user = await this.userModel.create(createUserDto);
    await user.save();
    delete user.password;
    return user;
  }

  async findAll(): Promise<User[]> {
    return await this.userModel.find(
      {},
      { password: false, __v: false, hashedRT: false },
    );
  }

  async findOne(id: string): Promise<User> {
    const user = await this.userModel.findById(id);

    if (!user) {
      throw new NotAcceptableException("user doesn't exist");
    }

    return user;
  }

  async findOneAndUpdate(
    id: string,
    updateUserDto: UpdateUserDto | { hashedRT: string },
  ) {
    const newUser = await this.userModel.findByIdAndUpdate(id, updateUserDto, {
      new: true,
    });
    if (!newUser) {
      throw new NotAcceptableException("user doesn't exist");
    }

    return newUser;
  }

  async remove(id: string) {
    const user = await this.findOne(id);
    if (!user) {
      throw new NotAcceptableException("user doesn't exist");
    }
    await user.deleteOne();

    return user;
  }

  async findUserByEmail(email: string): Promise<User> {
    return await this.userModel.findOne({ email });
  }
}
