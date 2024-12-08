import { GAME_STATUSES } from "../state/GAME_STATUSES.js";
import { gameMode } from "./game-settings/Game.component.js";
import { loseMode } from "./Lose.component.js";
import { settingsMode } from "./Settings.component.js";

export const Game = (status) => {
    let element = document.createElement('div')

    Game.render(element, status)

    return element;
}

Game.render = (element, status) => {
    switch (status) {
        case GAME_STATUSES.SETTINGS:
            const settingsModeElement = settingsMode()
            element.append(settingsModeElement)
            break;
        
        case GAME_STATUSES.PROGRESS:
            const progressModeElement = gameMode()
            element.append(progressModeElement)
            break;
    
        case GAME_STATUSES.LOSE:
            const loseModeElement = loseMode()
            element.append(loseModeElement)
            break;
    
        case GAME_STATUSES.WIN:
            const winModeElement = alert("win")
            element.append(winModeElement)
            break;
    
        default:
            element.append(status)
            break;
    }
}