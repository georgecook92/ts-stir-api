import {
  Column,
  Entity,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn
} from 'typeorm'

@Entity()
export default class User {

    constructor (data: User) {
      if (data) {
        this.firstName = data.firstName
        this.lastName = data.lastName
        this.email = data.email
        this.password = data.password
      }
    }

    @PrimaryGeneratedColumn("uuid")
    id?: string;

    @Column()
    firstName: string;

    @Column()
    lastName: string;

    @Column({
      unique: true
    })
    email: string;

    @Column()
    password: string;

    @CreateDateColumn()
    createdAt?: Date

    @UpdateDateColumn()
    updatedAt?: Date
}
