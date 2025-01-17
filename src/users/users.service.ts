import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { User } from './schemas/user.schema';

import { Model } from 'mongoose';
@Injectable()
export class UsersService {
  constructor(@InjectModel(User.name) private userModel: Model<User>) {}

  async findUser(username: string) {
    return await this.userModel.findOne({ username: username });
  }
  async createUser(username: string, password: string) {
    const doesUserExist = await this.userModel.countDocuments({
      username: username,
    });

    if (doesUserExist != 0) {
      throw new HttpException(
        'A user with this username alredy exists.',
        HttpStatus.FORBIDDEN,
      );
    }

    const newUser = new this.userModel({
      username: username,
      password: password,
    });
    return newUser.save();
  }
}
