import { WebSocketServer } from 'ws';
import { getStatus, gameStart, getCat1Position, getGridSize, getMousePosition, subscriber, catsMove } from './data.js';
import { CATS_DIRECTIONS } from '../state/CATS_DIRECTIONS.js';

const clientMessage = {
    command:"MOVE-PLAYER",
    payload: {playerNumber: 1, moveDirection: CATS_DIRECTIONS.LEFT}
}

let sendActualState = (channel) => {
    const notification = {
        type: "ACTUAL-STATE",
        payload: {
        status: getStatus(),
        cat1Position: getCat1Position(),
        gridSize: getGridSize(),
        mousePosition: getMousePosition(),
        }
    }
    channel.send(JSON.stringify(notification))
}


const server = new WebSocketServer({ port: 3000 })

server.on('connection', (channel) => {

    subscriber((event) => {
        sendActualState(channel)
        channel.send(JSON.stringify(event))
    })
    
    const status = getStatus()

    sendActualState(channel)

    channel.on('message', (message) => {
        const action = JSON.parse(message.toString())
        switch (action.command) {
            case "START-GAME": {
                gameStart()
                break
            }
            case "MOVE-PLAYER": {
                catsMove(action.payload.playerNumber, action.payload.playerDirection)
            }
        }
    })
})