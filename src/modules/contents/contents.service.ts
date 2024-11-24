import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ContentsEntity } from './entities/contents.entity';
import { Repository } from 'typeorm';

@Injectable()
export class ContentsService {
  constructor(
    @InjectRepository(ContentsEntity)
    private readonly contentsRepository: Repository<ContentsEntity>,
  ) {}

  async getContentsList() {
    return this.contentsRepository.find();
  }
}
