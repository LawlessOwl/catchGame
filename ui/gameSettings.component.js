import { getStatus, subscriber } from "../state/data.js";
import { GAME_STATUSES } from "../state/GAME_STATUSES.js";
import { gameMode } from "./game-settings/Game.component.js";
import { loseMode } from "./Lose.component.js";
import { settingsMode } from "./Settings.component.js";

export const Game = () => {
    let element = document.createElement('div')

    let localState = { status: null }
    
    subscriber(() => {
        Game.render(element, localState)
    })

    Game.render(element, localState)

    return {element};
}

Game.render = (element, localState) => {
    const status = getStatus()
    if (localState.status === status) return
    localState.status = status
    element.innerHTML = ''
    switch (status) {
        case GAME_STATUSES.SETTINGS:
            const settingsModeInstance = settingsMode()
            element.append(settingsModeInstance.element)
            break;
        
        case GAME_STATUSES.PROGRESS:
            const progressModeInstance = gameMode()
            element.append(progressModeInstance.element)
            break;
    
        case GAME_STATUSES.LOSE:
            const loseModeInstance = loseMode()
            element.append(loseModeInstance.element)
            break;
    
        case GAME_STATUSES.WIN:
            const winModeInstance = alert("win")
            element.append(winModeInstance.element)
            break;
    
        default:
            element.append(status)
            break;
    }
}