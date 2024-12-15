import { getStatus, subscriber } from "../state/data.js";
import { EVENTS } from "../state/EVENT.js";
import { GAME_STATUSES } from "../state/GAME_STATUSES.js";
import { gameMode } from "./game-settings/Game.component.js";
import { winMode } from "./game-settings/win.component.js";
import { loseMode } from "./Lose.component.js";
import { settingsMode } from "./Settings.component.js";

export const Game = () => {
    let element = document.createElement('div')

    let localState = { childrenCleanups: [] }
    
    const unsubscriber = subscriber((event) => {
        if (event.type === EVENTS.STATUS_CHANGED) {
            Game.render(element, localState)   
        }
    })

    Game.render(element, localState)

    return {element, cleanup: () => {
        unsubscriber();
        localState.childrenCleanups.forEach(cc => cc())
    }};
}

Game.render = (element, localState) => {
    const status = getStatus()
    localState.status = status
    element.innerHTML = ''
    localState.childrenCleanups.forEach(cc => cc())
    localState.childrenCleanups = []
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
            const winModeInstance = winMode()
            element.append(winModeInstance.element)
            break;
    
        default:
            element.append(status)
            break;
    }
}