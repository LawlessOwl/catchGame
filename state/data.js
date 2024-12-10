import { CATS_DIRECTIONS } from "./CATS_DIRECTIONS.js"
import { GAME_STATUSES } from "./GAME_STATUSES.js"

const _state = {
    status: GAME_STATUSES.SETTINGS,
    settings: {
        gridSize: {
            rowCount: 4,
            columnCount: 4,
        },
        pointsToWin: 30,
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

let _notify = () => {
    _observers.forEach(o => o())
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
    _teleportMouse()
    jumpInterval = setInterval(_mouseEscape, 4000)
    _notify()
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

    _state.positions['cat' + playerNumber] = newCoords

    const _isCatCatchMouse = (playerNumber) => {
        const playerPosition = newCoords
        const mousePosition = getMousePosition()

        return playerPosition.x === mousePosition.x && playerPosition.y === mousePosition.y
    }

    const _catchMouse = (playerNumber) => {
        _state.points['cat' + playerNumber]++
        console.log(_state.points['cat' + playerNumber])
        if(_state.points['cat' + playerNumber] === _state.settings.pointsToWin) {
            _state.status = GAME_STATUSES.WIN
            console.log("you win")
            clearInterval(jumpInterval)
        }
        _teleportMouse()
    }

    if(_isCatCatchMouse(playerNumber)) {
        _catchMouse(playerNumber)
    }

    _notify();
}

const _isInsideGrid = (coords) => {
    const isInsideGrid = coords.x >= 0 && coords.x < _state.settings.gridSize.columnCount 
    && coords.y >= 0 && coords.y < _state.settings.gridSize.rowCount 

    return isInsideGrid
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
    _notify()
}

let _getRandomInt = (max) => {
    return Math.floor(Math.random() * max)
}


