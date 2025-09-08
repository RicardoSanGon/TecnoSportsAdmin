import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateRoleDto } from './dto/create-role.dto';
import { UpdateRoleDto } from './dto/update-role.dto';
import { Role } from './entities/role.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { found, notFound, saved, updated } from 'src/utils/Responses';

const table = 'Role';

@Injectable()
export class RolesService {
  constructor(
    @InjectRepository(Role) private readonly repo: Repository<Role>,
  ) {}

  async create(createRoleDto: CreateRoleDto) {
    return saved(table, await this.repo.save(createRoleDto));
  }

  async findAll() {
    return found(`${table}s`, await this.repo.find());
  }

  async findOne(id: number) {
    return found(table, await this.repo.findOneOrFail({ where: { id: id } }));
  }

  async update(id: number, updateRoleDto: UpdateRoleDto) {
    const role = await this.repo.findOne({ where: { id } });

    if (!role) {
      throw new NotFoundException(notFound(table, id));
    }

    Object.assign(role, updateRoleDto);

    return updated(table, await this.repo.save(role));
  }
}
