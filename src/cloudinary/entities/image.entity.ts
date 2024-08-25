import { UserEntity } from 'src/user/entities/user.entity';
import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';

@Entity('images')
export class ImageEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  url: string;

  @Column()
  public_id: string;

  @ManyToOne(() => UserEntity, (user) => user.images, { onDelete: 'CASCADE' })
  user: UserEntity;
}
