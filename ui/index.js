import { settingsMode } from "./Settings.component.js";
import { getStatus, subsriber } from "../state/data.js"
import { GAME_STATUSES } from "../state/GAME_STATUSES.js";
import { gameMode } from "./game-settings/Game.component.js";
import { loseMode } from "./Lose.component.js";
import { Game } from "./gameSettings.component.js";

const rootElement = document.getElementById('root')

const render = () => {
    rootElement.innerHTML = "";
    
    const status = getStatus()

    const gameElement = Game(status)

    rootElement.append(gameElement)

}

render()

subsriber(render)
