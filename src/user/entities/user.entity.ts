import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToMany,
  JoinTable,
  BeforeInsert,
  BeforeUpdate,
  OneToMany,
} from 'typeorm';
import { RoleEntity as Role } from './role.entity';
import * as bcrypt from 'bcrypt';
import { ImageEntity } from 'src/cloudinary/entities/image.entity';

@Entity({
  name: 'users',
})
export class UserEntity {
  @PrimaryGeneratedColumn({
    unsigned: true,
  })
  id?: number;

  @Column()
  name: string;

  @Column({ default: true })
  isActive: boolean;

  @Column({
    unique: true,
  })
  email: string;

  @Column()
  cpf: string;

  @Column()
  password: string;

  @Column({
    type: 'date',
    nullable: true,
  })
  birthAt?: Date;

  @CreateDateColumn()
  createdAt?: Date;

  @UpdateDateColumn()
  updatedAt?: Date;

  @ManyToMany(() => Role, (role) => role.users)
  @JoinTable()
  roles: Role[];

  @OneToMany(() => ImageEntity, (image) => image.user)
  images: ImageEntity[];

  @BeforeInsert()
  async createPassword(): Promise<void> {
    const salt = await bcrypt.genSalt();
    this.password = await bcrypt.hash(this.password, salt);
  }

  @BeforeUpdate()
  async updatePassword(): Promise<void> {
    if (this.password) {
      const salt = await bcrypt.genSalt();
      this.password = await bcrypt.hash(this.password, salt);
    }
  }

  async validatePassword(password: string): Promise<boolean> {
    return bcrypt.compare(password, this.password);
  }
}
