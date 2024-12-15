import { WebSocketServer } from 'ws';

const server = new WebSocketServer({ port: 3000 })

server.on('connection', (channel) => {
    channel.send('connecting...')
    server.on('message', (message) => {
        console.log(message.toString())
    })
})