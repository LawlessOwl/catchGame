import { Grid } from "./grid.component.js"

export const gameMode = () => {
    const element = document.createElement('div')

    element.append(Grid())

    return element
}