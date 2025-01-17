import { HttpException, Injectable } from '@nestjs/common';
import { createCarDto } from './dtos/createCarDto';
import { Car } from './schemas/cars.schema';
import mongoose, { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';

@Injectable()
export class CarsService {
  constructor(@InjectModel(Car.name) private carModel: Model<Car>) {}
  getAllCars(owner_username: string) {
    return this.carModel.find({ owner_username: owner_username });
  }
  getCarById(id: string) {
    if (!mongoose.isValidObjectId(id)) {
      throw new HttpException('Car not found!', 404);
    }

    return this.carModel.findById(id);
  }
  createCar(data: createCarDto, owner_username: string) {
    const newCar = new this.carModel({
      name: data.name,
      color: data.color,
      owner_username: owner_username,
    });
    return newCar.save();
  }
}
