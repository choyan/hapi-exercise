import {
    Column,
    Entity,
    PrimaryGeneratedColumn,
    ManyToOne,
    JoinColumn,
} from 'typeorm';
import { SharedProperties } from './sharedProperties.entity';
import { UsersEntity } from './users.entity';

@Entity({ name: 'posts' })
export class PostsEntity extends SharedProperties {
    constructor(title: string, body: string, user: UsersEntity) {
        super();
        this.title = title;
        this.body = body;
        this.user = user;
    }
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    title: string;

    @Column({ type: 'text' })
    body: string;

    @Column({ nullable: false, name: 'user_id' })
    userId: number;

    @ManyToOne(() => UsersEntity, (user: UsersEntity) => user.posts)
    @JoinColumn({ name: 'user_id' })
    user: UsersEntity;
}