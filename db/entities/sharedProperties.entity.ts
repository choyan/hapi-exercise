import { CreateDateColumn, UpdateDateColumn } from 'typeorm'

export class SharedProperties {
    @CreateDateColumn({
        name: 'created_at',
        type: 'datetime',
        default: 'CURRENT_TIMESTAMP'
    })
    createdAt: Date;

    @UpdateDateColumn({
        name: 'updated_at',
        type: 'datetime',
        default: 'CURRENT_TIMESTAMP'
    })
    updatedAt: Date;
}