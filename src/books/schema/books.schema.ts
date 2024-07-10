/* eslint-disable prettier/prettier */
import { Schema, Prop, SchemaFactory } from "@nestjs/mongoose";
import { Document } from 'mongoose';

@Schema()
export class Books extends Document {
    @Prop({required: true, unique: true,})
    title: string;

    @Prop({required: true,})
    description: string;

    @Prop({required: true,})
    cover_image: string;

    @Prop({required: true,})
    author: string;

    @Prop({required: true,})
    rate: number;

    @Prop({required: true,})
    genre: string[];

    @Prop({required: true})
    price: number;

    @Prop({required: true})
    most_popular: boolean;

    @Prop({required: true})
    publication_year: number;

}

export const BooksSchema = SchemaFactory.createForClass(Books)