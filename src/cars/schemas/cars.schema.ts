import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { HydratedDocument } from 'mongoose';
import { carColor } from '../interfaces/carColor.union';

export type CarDocument = HydratedDocument<Car>;

@Schema()
export class Car {
  @Prop()
  name: string;
  @Prop()
  color: carColor;
  @Prop({ type: mongoose.Schema.Types.String, ref: 'User', required: true })
  owner_username: string;
}
export const CarSchema = SchemaFactory.createForClass(Car);
