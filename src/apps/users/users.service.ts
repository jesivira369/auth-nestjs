import { ConflictException, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { User } from './schemas/user.schema';
import { Model } from 'mongoose';
import { UserDto } from './dto/user.dto';

@Injectable()
export class UsersService {
  constructor(@InjectModel(User.name) private userModel: Model<User>) {
    this.populateUsers();
  }

  async populateUsers() {
    const users = [
      {
        email: 'john@gmail.com',
        password: '123456',
      },
      {
        email: 'test2@gmail.com',
        password: '123456',
      },
      {
        email: 'test3@gmail.com',
        password: '123456',
      },
    ];

    for (const user of users) {
      const userExists = await this.getUserByEmail(user.email);

      if (!userExists) {
        await this.createUser(user);
      }
    }
  }

  async createUser(user: UserDto) {
    const userExists = await this.userModel.findOne({ email: user.email });

    if (userExists) {
      throw new ConflictException(`User with email ${user.email} already exists`);
    }

    const newUser = new this.userModel(user);

    await newUser.save();

    newUser.password = undefined;

    return newUser;
  }

  async getUsers() {
    return await this.userModel.find().select('-password');
  }

  async getUserByEmail(email: string) {
    return await this.userModel.findOne({ email });
  }
}
