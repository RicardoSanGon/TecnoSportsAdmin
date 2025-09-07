import { Confederation } from 'src/api/confederations/entities/confederation.entity';
import { Match } from 'src/api/matches/entities/match.entity';
import { EntityBase } from 'src/base.entity';
import { Column, Entity, ManyToOne, OneToMany } from 'typeorm';

@Entity('teams')
export class Team extends EntityBase {
  @Column()
  name: string;

  @Column()
  logoUrl: string;

  @Column()
  isActive: boolean;

  @ManyToOne(() => Confederation, (confederation) => confederation.teams)
  confederation: Confederation;

  @OneToMany(() => Match, (match) => match.homeTeam)
  homeMatches: Match[];

  @OneToMany(() => Match, (match) => match.awayTeam)
  awayMatches: Match[];
}
