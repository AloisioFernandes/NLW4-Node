import { Column, CreateDateColumn, Entity, PrimaryColumn } from "typeorm";
import { v4 as uuid } from 'uuid'

@Entity('users') // entidade, ativada no tsconfig.json "experimentalDecorators": true,
class User {

  @PrimaryColumn()
  readonly id: string

  @Column()
  name: string

  @Column()
  email: string

  @CreateDateColumn()
  created_at: Date

  constructor() {
    if(!this.id) { // se o usuário estiver sendo criado, não alterado
      this.id = uuid()
    }
  }
}

export { User }