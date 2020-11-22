import { name, internet, date, random } from 'faker'
import { Condition, Connection, Repository } from 'typeorm'
import { UsersEntity, UserType } from '../entities'

export const fakeUsers = async (con: Connection, amount: number = 5) => {
    const userRepo: Repository<UsersEntity> = con.getRepository(UsersEntity)

    for (const _ of Array.from({length: amount})) {
        const firstName = name.firstName();
        const lastName = name.lastName();
        const email = internet.email();
        const dateOfBirth = date.past();
        const type: UserType = random.arrayElement(['admin', 'user'])
        const u: Partial<UsersEntity> = new UsersEntity(
            firstName,
            lastName,
            email,
            dateOfBirth,
            type
        )
        await userRepo.save<Partial<UsersEntity>>(u);
    }
    console.log(`Seeding fake ${amount} users`);
}