import {Column, CreateDateColumn, Entity, PrimaryGeneratedColumn} from "typeorm";
import { RoleEnum } from "../../enum/data.enum";

@Entity({name: "User"})
export class User {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column({type: 'varchar', length: 255})
    name: string;

    @Column({type: 'varchar', length: 255, nullable: true})
    avatarUrl: string;

    @Column({type: 'varchar', length: 255, unique:true, nullable:false})
    email:string;

    @Column({type: "enum", enum: RoleEnum, default: RoleEnum.SUBACCOUNT_USER})
    role: RoleEnum

    @CreateDateColumn({
        type: "timestamp",
        default: () => "CURRENT_TIMESTAMP",
        name: "created_at",
      })
      createdAt: Date

      @CreateDateColumn({
        type: "timestamp",
        default: () => "CURRENT_TIMESTAMP",
        name: "updated_at",
      })
      updatedAt: Date
}