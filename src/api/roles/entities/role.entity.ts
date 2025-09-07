import { User } from 'src/api/users/entities/user.entity';
import { EntityBase } from 'src/base.entity';
import { Column, Entity, OneToMany } from 'typeorm';

@Entity('roles')
export class Role extends EntityBase {
  @Column()
  nombre: string;

  @OneToMany(() => User, (user) => user.role)
  users: User[];
}
