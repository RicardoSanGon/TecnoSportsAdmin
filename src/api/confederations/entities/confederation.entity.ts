import { Team } from 'src/api/teams/entities/team.entity';
import { EntityBase } from 'src/base.entity';
import { Column, Entity, OneToMany } from 'typeorm';

@Entity('confederations')
export class Confederation extends EntityBase {
  @Column()
  name: string;

  @OneToMany(() => Team, (team) => team.confederation)
  teams: Team[];
}
