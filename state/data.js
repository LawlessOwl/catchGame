import { GAME_STATUSES } from "./GAME_STATUSES.js"

const _state = {
    status: GAME_STATUSES.SETTINGS,
    settings: {
        gridSize: {
            rowCount: 4,
            columnCount: 4,
        }
    },
    positions: {
        mouse: {x: 0, y: 0},
        cat1: {x: 2, y:2 },
        cat2: {x: 3, y:3 }
    }
}


let _observer = null

export const subsriber = (callback) => {
    _observer = callback
}

export const getStatus = () => {
    return _state.status
}

export const getGridSize = () => {
    return _state.settings.gridSize
}

export const getMousePosition = () => {
    return _state.positions.mouse
}

export const getCat1Position = () => {
    return _state.positions.cat1
}

export const gameStart = () => {
    _state.status = GAME_STATUSES.PROGRESS
    _teleportMouse()
    setInterval(_mouseEscape, 1000)
    _observer()
}


export let catsMove = (playerNumber, playerDirection) => {
    const newCoords = {..._state.positions["cat" + playerNumber]}
}

let _mouseEscape = () => {
    _teleportMouse()
}

let _teleportMouse = () => {
    const newXPosition =  _getRandomInt(getGridSize().columnCount)
    const newYPosition = _getRandomInt(getGridSize().rowCount)

    if ((newXPosition === getMousePosition.x && newYPosition === getMousePosition.y)
        || (newXPosition === getCat1Position.x && newYPosition === getCat1Position.y)){
        _teleportMouse();
        return;
    }
    _state.positions.mouse.x = newXPosition
    _state.positions.mouse.y = newYPosition
    _observer()
}

let _getRandomInt = (max) => {
    return Math.floor(Math.random() * max)
}


