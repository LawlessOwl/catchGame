import { GAME_STATUSES } from "./GAME_STATUSES.js"

const channel = new WebSocket('ws://localhost:3000')

let proxyState = null;
let inited = false;

channel.addEventListener('message', (event) => {
    const notification = JSON.parse(event.data)
    if (notification.type === "ACTUAL-STATE") {
        proxyState = notification.payload
        if (!inited) {
            inited = true;
            _notify()
        }
    } else {
        _notify(notification.type, notification.payload)
    }
    console.log('New message:', event.data)
})

let _observers = []

let _notify = (type, payload = {}) => {
    const event = {
        type,
        payload
    }
    _observers.forEach(o => o(event))
}

export const subscriber = (callback) => {
    _observers.push(callback)

    return () => {
        unsubscriber(callback)
    }
}

export const unsubscriber = (callback) => {
    _observers = _observers.filter(o => o !== callback)
}

export const getStatus = () => {
    return proxyState.status
}

export const getGridSize = () => {
    return proxyState.gridSize
}

export const getMousePosition = () => {
    return proxyState.mousePosition
}

export const getCat1Position = () => {
    return proxyState.cat1Position
}

export const gameStart = () => {
    const action = {
        command: "START-GAME",
    }
    channel.send(JSON.stringify(action))
}




export let catsMove = (playerNumber, playerDirection) => {

    

   
}

const _isCatCatchMouse = (playerNumber) => {
   
}

const _catchMouse = (playerNumber) => {

}

const _isInsideGrid = (coords) => {
   
}

let _mouseEscape = () => {
  
}

let _teleportMouse = () => {
   
}

let _getRandomInt = (max) => {

}


