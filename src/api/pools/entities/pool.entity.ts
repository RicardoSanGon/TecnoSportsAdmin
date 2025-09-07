import { Prediction } from 'src/api/predictions/entities/prediction.entity';
import { User } from 'src/api/users/entities/user.entity';
import { EntityBase } from 'src/base.entity';
import { Column, Entity, ManyToMany, ManyToOne, OneToMany } from 'typeorm';

@Entity()
export class Pool extends EntityBase {
  @Column()
  name: string;

  @Column()
  description: string;

  @Column()
  invitationCode: number;

  @Column()
  maxParticipants: number;

  @Column({ default: true })
  isActive: boolean;

  @Column({ default: false })
  isClose: boolean;

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  startDate: Date;

  @Column({ type: 'timestamp' })
  endDate: Date;

  @ManyToOne(() => User, (user) => user.poolsCreated)
  creator: User;

  @ManyToMany(() => User, (user) => user.pools)
  participants: User[];

  @OneToMany(() => Prediction, (prediction) => prediction.pool)
  predictions: Prediction[];
}
