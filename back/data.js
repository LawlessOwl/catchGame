import { CATS_DIRECTIONS } from "../state/CATS_DIRECTIONS.js"
import { EVENTS } from "../state/EVENT.js"
import { GAME_STATUSES } from "../state/GAME_STATUSES.js"

const _state = {
    status: GAME_STATUSES.SETTINGS,
    settings: {
        gridSize: {
            rowCount: 4,
            columnCount: 4,
        },
        pointsToWin: 3,
        pointsToLose: 3,
    },
    positions: {
        mouse: {x: 0, y: 0},
        cat1: {x: 2, y:2 },
        cat2: {x: 3, y:3 }
    },
    points: {
        mouse: 0,
        cat1: 0,
        cat2: 0
    },
}


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
    _observers = _observers.filter(o = o !== callback)
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
    _notify(EVENTS.STATUS_CHANGED)
    _teleportMouse()
    jumpInterval = setInterval(_mouseEscape, 4000)
}

let jumpInterval


export let catsMove = (playerNumber, playerDirection) => {

    const catsPositionRedusers = {
        [CATS_DIRECTIONS.UP]: (coords) => {
            return {
                x: coords.x,
                y: coords.y - 1,
            }
        },
        [CATS_DIRECTIONS.DOWN]: (coords) => {
            return {
                x: coords.x,
                y: coords.y + 1,
            }
        },
        [CATS_DIRECTIONS.LEFT]: (coords) => {
            return {
                x: coords.x - 1,
                y: coords.y,
            }
        },
        [CATS_DIRECTIONS.RIGHT]: (coords) => {
            return {
                x: coords.x + 1,
                y: coords.y,
            }
        },
    }

    const reducer = catsPositionRedusers[playerDirection]
    const newCoords = reducer(_state.positions["cat" + playerNumber])

    if(!_isInsideGrid(newCoords)){
        return
    }
    
    const prewCoords = {..._state.positions["cat" + playerNumber]}
    _state.positions['cat' + playerNumber] = newCoords

    if(_isCatCatchMouse(playerNumber)) {
        _catchMouse(playerNumber)
    }

    _notify(EVENTS.PLAYER_JUMPED, {
        newPosition: {...newCoords},
        prevPosition: prewCoords,
        playerNumber: playerNumber
    });
}

const _isCatCatchMouse = (playerNumber) => {
    const playerPosition = _state.positions['cat' + playerNumber]
    const mousePosition = getMousePosition()

    return playerPosition.x === mousePosition.x && playerPosition.y === mousePosition.y
}

const _catchMouse = (playerNumber) => {
    _state.points['cat' + playerNumber]++
    console.log(_state.points['cat' + playerNumber])
    if(_state.points['cat' + playerNumber] === _state.settings.pointsToWin) {
        _state.status = GAME_STATUSES.WIN
        _notify(EVENTS.STATUS_CHANGED)
        console.log("you win")
        clearInterval(jumpInterval)
    }
    _teleportMouse()
}

const _isInsideGrid = (coords) => {
    const isInsideGrid = coords.x >= 0 && coords.x < _state.settings.gridSize.columnCount 
    && coords.y >= 0 && coords.y < _state.settings.gridSize.rowCount 

    return isInsideGrid
}

let _mouseEscape = () => {
    _notify(EVENTS.MOUSE_ESCAPED)
    _teleportMouse()
}

let _teleportMouse = () => {
    const newXPosition =  _getRandomInt(getGridSize().columnCount)
    const newYPosition = _getRandomInt(getGridSize().rowCount)

    if ((newXPosition === getMousePosition().x && newYPosition === getMousePosition().y)
        || (newXPosition === getCat1Position().x && newYPosition === getCat1Position().y)){
        _teleportMouse();
        return;
    }
    const prevPosition = {..._state.positions.mouse}
    _state.positions.mouse.x = newXPosition
    _state.positions.mouse.y = newYPosition
    _notify(EVENTS.MOUSE_JUMPED, {
        newPosition: {..._state.positions.mouse},
        prevPosition: prevPosition
    })
}

let _getRandomInt = (max) => {
    return Math.floor(Math.random() * max)
}


