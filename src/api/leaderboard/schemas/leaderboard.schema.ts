// import { Pool } from 'src/api/pools/entities/pool.entity';
// import { User } from 'src/api/users/entities/user.entity';
// import { EntityBase } from 'src/base.entity';
// import { Column, Entity, ManyToOne } from 'typeorm';

import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';
import { CreateDateColumn, UpdateDateColumn } from 'typeorm';

export type LeaderboardDocument = HydratedDocument<Leaderboard>;

// @Entity('leaderboards')
// export class Leaderboard extends EntityBase {
//   @Column()
//   totalPoints: number;

//   @ManyToOne(() => Pool, (pool) => pool.leaderboards)
//   pool: Pool;

//   @ManyToOne(() => User, (user) => user.leaderboards)
//   user: User;
// }

interface Positions {
  userId: number;
  username: string;
  email: string;
  points: number;
}

@Schema()
export class Leaderboard {
  @Prop()
  poolId: number;

  @Prop()
  positions: Positions[];

  @Prop()
  @CreateDateColumn()
  created_at: Date;
  @UpdateDateColumn()
  updated_at: Date;
}

export const LeaderboardSchema = SchemaFactory.createForClass(Leaderboard);
