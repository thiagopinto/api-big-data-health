import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToMany,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';
import { UserEntity as User } from './user.entity';

@Entity()
export class RoleEntity {
  @PrimaryGeneratedColumn({
    unsigned: true,
  })
  id: number;

  @Column()
  name: string;

  @CreateDateColumn()
  createdAt?: Date;

  @UpdateDateColumn()
  updatedAt?: Date;

  @ManyToMany(() => User, (user) => user.roles)
  users: User[];
}
