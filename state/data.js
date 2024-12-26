import { CATS_DIRECTIONS } from "./CATS_DIRECTIONS.js"
import { EVENTS } from "./EVENT.js"
import { GAME_STATUSES } from "./GAME_STATUSES.js"


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

    window._observers = _observers;

    return () => {
        unsubscriber(callback)
    }
}

export const unsubscriber = (callback) => {
    _observers = _observers.filter(o = o !== callback)
    window._observers = _observers;
}

export const getStatus = () => {

}

export const getGridSize = () => {

}

export const getMousePosition = () => {

}

export const getCat1Position = () => {

}

export const gameStart = () => {

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


