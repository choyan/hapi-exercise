import { name, lorem, random } from 'faker'
import { Connection, Repository } from 'typeorm'
import { UsersEntity, PostsEntity } from '../entities'

export const fakePosts = async (con: Connection, amount: number = 10) => {
    const userRepo: Repository<UsersEntity> = con.getRepository(UsersEntity)
    const postRepo: Repository<PostsEntity> = con.getRepository(PostsEntity)
    const users : Array<UsersEntity> = await userRepo.find(); // pass {take number}

    for (const user of users) {
        const shouldWeCreate: boolean = random.arrayElement([false, true]);
        if (shouldWeCreate) {
            const title = name.jobTitle();
            const body = lorem.paragraphs();
            const title2 = name.jobTitle();
            const body2 = lorem.paragraphs();
            const p: Partial<PostsEntity> = new PostsEntity(title, body, user);
            // p.user = user;
            const p2: Partial<PostsEntity> = new PostsEntity(title2, body2, user);
            // p2.user = user;  
            await postRepo.save<Partial<PostsEntity>>(p);
            await postRepo.save<Partial<PostsEntity>>(p2);
        }
    }

    console.log(`Seeding fake ${amount} posts`);
}