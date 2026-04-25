import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

import { Exame, ExameDocument } from '../schemas/exame.schema';

@Injectable()
export class ExamesRepository {
  constructor(
    @InjectModel(Exame.name)
    private readonly exameModel: Model<ExameDocument>,
  ) {}

  async create(data: Partial<Exame>): Promise<ExameDocument> {
    return this.exameModel.create(data);
  }

  async findByAccessionNumber(
    accessionNumber: string,
  ): Promise<ExameDocument | null> {
    return this.exameModel.findOne({ accessionNumber }).exec();
  }

  async updateByAccessionNumber(
    accessionNumber: string,
    data: Partial<Exame>,
  ): Promise<ExameDocument | null> {
    return this.exameModel
      .findOneAndUpdate({ accessionNumber }, data, { new: true })
      .exec();
  }

  async findAll(): Promise<ExameDocument[]> {
    return this.exameModel.find().exec();
  }

  async deleteAll(): Promise<void> {
    await this.exameModel.deleteMany({});
  }
}
