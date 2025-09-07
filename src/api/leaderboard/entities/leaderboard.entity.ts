import { Pool } from 'src/api/pools/entities/pool.entity';
import { User } from 'src/api/users/entities/user.entity';
import { EntityBase } from 'src/base.entity';
import { Column, Entity, ManyToOne } from 'typeorm';

@Entity('leaderboards')
export class Leaderboard extends EntityBase {
  @Column()
  totalPoints: number;

  @ManyToOne(() => Pool, (pool) => pool.leaderboards)
  pool: Pool;

  @ManyToOne(() => User, (user) => user.leaderboards)
  user: User;
}
