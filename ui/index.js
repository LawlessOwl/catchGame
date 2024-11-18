import { settings } from "./Settings.component.js";
import { getStatus } from "../state/data.js"
import { GAME_STATUSES } from "../state/GAME_STATUSES.js";

const status = getStatus()

const rootElement = document.getElementById('root')

switch (status) {
    case GAME_STATUSES.SETTINGS:
        const settingsMode = settings()
        rootElement.append(settingsMode)
        break;

    default:
        rootElement.append(status)
        break;
}

