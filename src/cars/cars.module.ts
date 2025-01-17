import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { CarsService } from './cars.service';
import { CarsController } from './cars.controller';
import { LoggerMiddleware } from './middlewares/loggingMiddlaware';
import { MongooseModule } from '@nestjs/mongoose';
import { CarSchema, Car } from './schemas/cars.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: Car.name,
        schema: CarSchema,
      },
    ]),
  ],
  providers: [CarsService],
  controllers: [CarsController],
})
export class CarsModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(LoggerMiddleware).forRoutes(CarsController);
  }
}
