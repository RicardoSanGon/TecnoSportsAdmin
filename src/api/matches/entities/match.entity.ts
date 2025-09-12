import { Prediction } from 'src/api/predictions/entities/prediction.entity';
import { Team } from 'src/api/teams/entities/team.entity';
import { EntityBase } from 'src/base.entity';
import { Column, Entity, JoinColumn, ManyToOne, OneToMany } from 'typeorm';

@Entity('matches')
export class Match extends EntityBase {
  @Column()
  weekNumber: number;

  @Column({ nullable: true })
  scoreHome: number;

  @Column({ nullable: true })
  scoreAway: number;

  @Column({ default: 'pending' })
  status: string;

  @Column({ type: 'timestamp' })
  matchDate: Date;

  @ManyToOne(() => Team, { eager: false })
  @JoinColumn({ name: 'homeTeamId' })
  homeTeam: Team;

  @ManyToOne(() => Team, { eager: false })
  @JoinColumn({ name: 'awayTeamId' })
  awayTeam: Team;

  @OneToMany(() => Prediction, (prediction) => prediction.match)
  predictions: Prediction[];
}
