import { Prediction } from 'src/api/predictions/entities/prediction.entity';
import { Team } from 'src/api/teams/entities/team.entity';
import { EntityBase } from 'src/base.entity';
import { Column, Entity, JoinColumn, ManyToOne, OneToMany } from 'typeorm';

@Entity('matches')
export class Match extends EntityBase {
  @Column({ nullable: false })
  weekNumber: number;

  @Column({ default: 0 })
  scoreHome: number;

  @Column({ default: 0 })
  scoreAway: number;

  @Column({ default: 'pending' })
  status: string;

  @Column({ type: 'timestamp', nullable: false })
  matchDate: Date;

  @Column({ nullable: false })
  homeTeamId: number;

  @Column({ nullable: false })
  awayTeamId: number;

  @ManyToOne(() => Team, { eager: false })
  @JoinColumn({ name: 'homeTeamId' })
  homeTeam: Team;

  @ManyToOne(() => Team, { eager: false })
  @JoinColumn({ name: 'awayTeamId' })
  awayTeam: Team;

  @OneToMany(() => Prediction, (prediction) => prediction.match)
  predictions: Prediction[];
}
