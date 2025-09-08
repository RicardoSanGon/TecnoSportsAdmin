import { Injectable, NotFoundException } from '@nestjs/common';
import { UpdateUserDto } from './dto/update-user.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { Repository } from 'typeorm';
import { found, notFound, updated } from 'src/utils/Responses';

const table = 'User';

@Injectable()
export class UsersService {
  constructor(@InjectRepository(User) private repo: Repository<User>) {}

  async findAll() {
    return found(`${table}s`, await this.repo.find());
  }

  async findOne(id: number) {
    return found(table, await this.repo.findOneOrFail({ where: { id } }));
  }

  async update(id: number, updateUserDto: UpdateUserDto) {
    const user = await this.repo.findOne({ where: { id } });
    if (!user) {
      throw new NotFoundException(notFound(table, id));
    }
    Object.assign(user, updateUserDto);

    return updated(table, await this.repo.save(user));
  }
}
