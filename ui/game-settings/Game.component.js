import { Grid } from "./grid.component.js"

export const gameMode = () => {
    const element = document.createElement('div')

    gameMode.render(element)

    return {element}
}

gameMode.render = (element) => {
    const gridComponentInstance = Grid()
    element.append(gridComponentInstance.element)
}