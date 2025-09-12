import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateMatchDto } from './dto/create-match.dto';
import { UpdateMatchDto } from './dto/update-match.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Match } from './entities/match.entity';
import { Repository } from 'typeorm';
import { found, notFound, saved, updated } from 'src/utils/Responses';

const table = 'Match';

@Injectable()
export class MatchesService {
  constructor(
    @InjectRepository(Match) private readonly repo: Repository<Match>,
  ) {}

  async create(createMatchDto: CreateMatchDto) {
    return saved(table, await this.repo.save(createMatchDto));
  }

  async findAll() {
    return found(
      `${table}es`,
      await this.repo.find({
        relations: {
          homeTeam: { confederation: true },
          awayTeam: { confederation: true },
          predictions: { user: true },
        },
      }),
    );
  }

  async findOne(id: number) {
    const match = await this.repo.findOne({
      where: { id },
      relations: {
        homeTeam: { confederation: true },
        awayTeam: { confederation: true },
        predictions: { user: true },
      },
    });

    if (!match) throw new NotFoundException(notFound(table, id));

    return found(table, match);
  }

  async update(id: number, updateMatchDto: UpdateMatchDto) {
    const match = await this.repo.findOne({
      where: { id },
      relations: {
        homeTeam: { confederation: true },
        awayTeam: { confederation: true },
      },
    });

    if (!match) throw new NotFoundException(notFound(table, id));
    Object.assign(match, updateMatchDto);
    return updated(table, await this.repo.save(match));
  }
}
