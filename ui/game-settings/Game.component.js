import { Grid } from "./grid.component.js"

export const gameMode = () => {
    const element = document.createElement('div')

    const localState = {
        childrenCleanups: []
    }

    gameMode.render(element, localState)

    return {element, cleanup: () => {
        localState.childrenCleanups.forEach(cc => cc())
    }}
}

gameMode.render = (element, localState) => {
    const gridComponentInstance = Grid()
    localState.childrenCleanups.push(gridComponentInstance.cleanup)
    element.append(gridComponentInstance.element)
}