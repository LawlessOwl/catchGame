import { WebSocketServer } from 'ws';
import { getStatus, gameStart } from './data.js';
import { CATS_DIRECTIONS } from '../state/CATS_DIRECTIONS.js';

const clientMessage = {
    command: "START-GAME",
    payload: {palyerNumber: 1, moveDiractions: CATS_DIRECTIONS.LEFT}
}

const server = new WebSocketServer({ port: 3000 })

server.on('connection', (channel) => {
    const status = getStatus()
    channel.send(status)
    server.on('message', (message) => {
        const action = JSON.parse(message.toString())
        switch (action.command) {
            case "START-GAME": {
                gameStart()
            }
        }
    })
})