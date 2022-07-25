import { ApiProperty } from "@nestjs/swagger";
import { BaseEntity, Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class ServiceLine extends BaseEntity{
    @ApiProperty()
    @PrimaryGeneratedColumn()
    id?: number;

    @Column({nullable: true})
    name?: string;

    @Column({type: 'simple-json', nullable: true})
    value?: string;

    constructor(data: Partial<ServiceLine> = {}) {
        super();
        Object.assign(this, data);
      }
}