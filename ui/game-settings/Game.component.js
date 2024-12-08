import { Grid } from "./grid.component.js"

export const gameMode = () => {
    const element = document.createElement('div')

    gameMode.render(element)

    return element
}

gameMode.render = (element) => {
    element.append(Grid())
}