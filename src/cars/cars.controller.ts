import {
  Body,
  Controller,
  Get,
  HttpStatus,
  Param,
  Post,
  Req,
  UseGuards,
  ValidationPipe,
} from '@nestjs/common';
import { CarsService } from './cars.service';
import { createCarDto } from './dtos/createCarDto';
import { AuthGuard } from 'src/auth/guards/auth.guard';
import { Request } from 'express';

@Controller('cars')
export class CarsController {
  constructor(private carsService: CarsService) {}

  @Get()
  @UseGuards(AuthGuard)
  getAllCars(@Req() request: Request) {
    const user = request.user;
    return this.carsService.getAllCars(user.username);
  }

  @UseGuards(AuthGuard)
  @Get(':id')
  getCarById(@Param('id') id: string) {
    return this.carsService.getCarById(id);
  }

  @UseGuards(AuthGuard)
  @Post()
  createCar(
    @Req() request: Request,
    @Body(new ValidationPipe()) data: createCarDto,
  ) {
    const user = request.user;
    if (this.carsService.createCar(data, user.username)) {
      return HttpStatus.CREATED;
    }
    return HttpStatus.INTERNAL_SERVER_ERROR;
  }
}
