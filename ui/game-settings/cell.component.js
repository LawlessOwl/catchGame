import { getCat1Position, getMousePosition, subscriber } from "../../state/data.js"
import { EVENTS } from "../../state/EVENT.js"

export let Cell = (x, y) => {
    const element = document.createElement('td')
    Cell.render(element, x, y);
    
    const unsubsribe = subscriber((event) => {
        if (event.type === EVENTS.MOUSE_JUMPED || event.type === EVENTS.PLAYER_JUMPED) {
            Cell.render(element, x, y)
        }
    })

    return {element, cleanup: () => {
        unsubsribe()
    }}
}

Cell.render = (element, x, y) => {
    element.innerHTML = ''
    const mousePosition = getMousePosition()
    const cat1Position = getCat1Position() 

    if (x === mousePosition.x && y === mousePosition.y) {
        element.append("M")
    }

    if (x === cat1Position.x && y === cat1Position.y) {
        element.append("C1")
    }
}