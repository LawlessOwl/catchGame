import { GAME_STATUSES } from "./GAME_STATUSES.js"

const _state = {
    status: GAME_STATUSES.SETTINGS
}


let observer = null

export const subsriber = (callback) => {
    observer = callback
}

export const getStatus = () => {
    return _state.status
}

export const gameStart = () => {
    _state.status = GAME_STATUSES.PROGRESS
    observer()
}


