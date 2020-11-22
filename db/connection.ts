import 'reflect-metadata';
import { Connection, createConnection } from 'typeorm';
import { UsersEntity, PostsEntity } from './entities'
import { fakeUsers, fakePosts } from './fakeData';
export const initDb = async () => {

    const entities = [UsersEntity, PostsEntity];
    const fakeDataGenerator = [fakeUsers, fakePosts];

    const con = await createConnection({
        type: 'sqlite',
        database: './hapi.db',
        entities
    });

    await con.synchronize(true);
    entities.forEach((entity) => console.log(`Created ${entity.name}`));
    console.log('Seeding fake data');
    for (let func of fakeDataGenerator) await func(con);
    return con;
}
