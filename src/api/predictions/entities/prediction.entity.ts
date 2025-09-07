import { Match } from 'src/api/matches/entities/match.entity';
import { Pool } from 'src/api/pools/entities/pool.entity';
import { User } from 'src/api/users/entities/user.entity';
import { EntityBase } from 'src/base.entity';
import { Column, Entity, ManyToOne } from 'typeorm';

@Entity('predictions')
export class Prediction extends EntityBase {
  @Column()
  prediction: string;

  @Column({ default: 0 })
  points: number;

  @ManyToOne(() => User, (user) => user.predictions)
  user: User;

  @ManyToOne(() => Pool, (pool) => pool.predictions)
  pool: Pool;

  @ManyToOne(() => Match, (match) => match.predictions)
  match: Match;
}
