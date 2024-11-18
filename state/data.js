import { GAME_STATUSES } from "./GAME_STATUSES.js"

const _state = {
    status: GAME_STATUSES.SETTINGS
}

export const getStatus = () => {
    return _state.status
}

