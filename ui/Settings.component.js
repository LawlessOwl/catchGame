import { gameStart } from "../state/data.js"

export const settingsMode = () => {
    const element = document.createElement('div')

    settingsMode.render(element)
    
    return {element}
}

settingsMode.render = (element) => {
    const gridSizeSelectElement = document.createElement("select")
    const gridSizeOptionElement = document.createElement("option")
    gridSizeOptionElement.append('4x4')
    gridSizeSelectElement.append(gridSizeOptionElement)

    element.append(gridSizeSelectElement)

    const startButtonElement = document.createElement('button')
    startButtonElement.append('START')
    startButtonElement.addEventListener('click', () => {
        gameStart()
    });

    element.append(startButtonElement)
}