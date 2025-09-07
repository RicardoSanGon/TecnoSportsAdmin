import { Injectable } from '@nestjs/common';
import { CreateConfederationDto } from './dto/create-confederation.dto';
import { UpdateConfederationDto } from './dto/update-confederation.dto';

@Injectable()
export class ConfederationsService {
  create(createConfederationDto: CreateConfederationDto) {
    return 'This action adds a new confederation';
  }

  findAll() {
    return `This action returns all confederations`;
  }

  findOne(id: number) {
    return `This action returns a #${id} confederation`;
  }

  update(id: number, updateConfederationDto: UpdateConfederationDto) {
    return `This action updates a #${id} confederation`;
  }

  remove(id: number) {
    return `This action removes a #${id} confederation`;
  }
}
