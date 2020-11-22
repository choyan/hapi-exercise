'use strict';

const Hapi = require('@hapi/hapi');
const Boom = require('@hapi/boom')
const Path = require('path');
const Inert = require('@hapi/inert');

const init = async () => {

    const server = Hapi.server({
        port: 9000,
        host: 'localhost',
        debug: { 
            request: ['error'] 
        },
        routes: {
            files: {
                relativeTo: Path.join(__dirname, 'public')
            }
        }
    });

    await server.register(Inert);

    server.route({
        method: 'GET',
        path: '/',
        // options: {
        //     log: {
        //         collect: true
        //     }
        // },
        handler: (request, h) => {
            // request.log('error', 'Event error');
            return 'Hello World!';
        }
    });

    server.route({
        method: 'GET',
        path: '/users',
        handler: (request, h) => {
            const data = {
                name: 'Choyan'
            }
            return h
                    .response(data)
                    .code(418)
                    .header('hello', 'world')
                    .state('new', 'world');
        }
    })

    server.route({
        method: 'GET',
        path: '/user/{user?}', // ? to make it optional
        handler: (request, h) => {
            return request.params;
        }
    })

    server.route({
        method: 'GET',
        path: '/autherror',
        handler: (request, h) => {
            return request.params;
        }
    })


    server.route({
        method: 'GET',
        path: '/files/{file}.jpg',
        handler: (request, h) => {
            return request.params;
        }
    })

    /* Single File Serve */
    server.route({
        method: 'GET',
        path: '/file/hapi.png',
        handler: (request, h) => {
            return h.file('hapi.png');
        }
    })

    /* File Handler */
    server.route({
        method: 'GET',
        path: '/file/{filename}',
        handler: {
            file: function(request) {
                return request.params.filename
            }
        }
    })

    /* Basic File Server */
    // server.route({
    //     method: 'GET',
    //     path: '/public',
    //     handler: {
    //         directory: {
    //             path: 'public',
    //             listing: true
    //             // redirectToSlash: true
    //         }
    //     }
    // })

    server.route({
        method: 'GET',
        path: '/not-found',
        config: {
            handler: function (request, h) {
                throw Boom.notFound('Cannot find the requested page')
            }
        }
    })

    await server.start();
    // server.log(['test', 'error'], 'Test event');
    console.log('Server running on %s', server.info.uri);
};

process.on('unhandledRejection', (err) => {
    console.log(err);
    process.exit(1);
});

init();