import * as Hapi from '@hapi/hapi';
import { Server, ResponseToolkit, Request } from 'hapi';
import { initDb } from './db';
import { userController } from './controllers'
import { Connection } from 'typeorm'

const init = async () => {
    const server = Hapi.server({
        port: 9000,
        host: 'localhost'
    })

    server.route({
        method: 'GET',
        path: '/',
        handler: (request: Request, h: ResponseToolkit, err?: Error) => {
            return {
                msg: 'Test'
            };
        }
    })
    // server.route({
    //     method: 'GET',
    //     path: '/user/{user?}', // ? to make it optional
    //     handler: (request: Request, h: ResponseToolkit, err?: Error) => {
    //         return {
    //             msg: 'Hello world'
    //         };
    //     }
    // })

    const con: Connection = await initDb()
    server.route(userController(con));
    await server.start().then(() => console.log('Started'));
}

process.on('unhandledRejection', (err) => {
    console.log(err);
    process.exit(1);
});

init();