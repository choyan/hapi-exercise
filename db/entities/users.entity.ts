import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from "typeorm";
import { SharedProperties } from "./sharedProperties.entity";
import { PostsEntity } from './posts.entity'

export type UserType = 'admin' | 'user'

@Entity({ name: 'users' })

export class UsersEntity extends SharedProperties {

    constructor(
        firstName: string,
        lastName: string,
        email: string,
        dateOfBirth?: Date,
        type?: UserType, 
    ){
        super();
        this.firstName = firstName;
        this.lastName = lastName;
        this.email = email;
        this.dateOfBirth = dateOfBirth;
        this.type = type;
    }

    @PrimaryGeneratedColumn()
    id: number;

    @Column({ name: 'first_name', nullable: false })
    firstName: string;

    @Column({ name: 'last_name', nullable: true })
    lastName: string;

    @Column({ unique: true, nullable: false })
    email: string

    @Column({ name: 'date_of_birth', nullable: true })
    dateOfBirth: Date;

    @Column({ default: 'user' })
    type: UserType


    @OneToMany(() => PostsEntity, (post: PostsEntity) => post.user, {
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE',
    })
    posts: Array<PostsEntity>;

}


/* 
For the 'type' use in MySQL or PostgreSQL use Enums like this. 

@Column({ default: UserType2.user, enum: UserType2, type: 'enum' })
type2: UserType2
enum UserType2 {
    user = 'user',
    admin = 'admin'
}
 */