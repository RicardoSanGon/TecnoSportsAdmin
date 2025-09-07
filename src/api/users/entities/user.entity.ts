import { Pool } from 'src/api/pools/entities/pool.entity';
import { Prediction } from 'src/api/predictions/entities/prediction.entity';
import { Role } from 'src/api/roles/entities/role.entity';
import { EntityBase } from 'src/base.entity';
import {
  Column,
  Entity,
  JoinTable,
  ManyToMany,
  ManyToOne,
  OneToMany,
} from 'typeorm';
import { Exclude } from 'class-transformer';

@Entity('users')
export class User extends EntityBase {
  @Column()
  email: string;

  @Column()
  name: string;

  @Column()
  @Exclude()
  password: string;

  @ManyToOne(() => Role, (role) => role.users)
  role: Role;

  @ManyToOne(() => Pool, (pool) => pool.creator)
  poolsCreated: Pool[];

  @ManyToMany(() => Pool, (pool) => pool.participants)
  @JoinTable({
    name: 'pool_participants',
    joinColumn: { name: 'userId', referencedColumnName: 'id' },
    inverseJoinColumn: { name: 'poolId', referencedColumnName: 'id' },
  })
  pools: Pool[];

  @OneToMany(() => Prediction, (prediction) => prediction.user)
  predictions: Prediction[];
}
