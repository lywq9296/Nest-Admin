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

  async insertContent(body: ContentsEntity) {
    const { fileName, navId, href, order, level, text, label, pid } = body;

    return this.contentsRepository.insert({
      fileName,
      navId,
      href,
      order,
      level,
      text,
      label,
      pid,
    });
  }

  async delete(fileName) {
    return this.contentsRepository.delete(fileName);
  }

  async deleteSoft({ fileName }) {
    return this.contentsRepository.update(fileName, { isDeleted: 1 });
  }
}
