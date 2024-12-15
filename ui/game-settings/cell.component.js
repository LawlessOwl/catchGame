import { getCat1Position, getMousePosition, subscriber } from "../../state/data.js"
import { EVENTS } from "../../state/EVENT.js"

export let Cell = (x, y) => {
    const element = document.createElement('td')
    
    const unsubscribe = subscriber((event) => {
        if (event.type === EVENTS.MOUSE_JUMPED || 
            event.type === EVENTS.PLAYER_JUMPED) {
            if ((event.payload.newPosition.x === x && event.payload.newPosition.y === y) 
            || (event.payload.prevPosition.x === x && event.payload.prevPosition.y === y)) {
                Cell.render(element, x, y)
            }
        }
    })
    
    Cell.render(element, x, y)

    return {element, cleanup: () => {
        unsubscribe()
    }}
}

Cell.render = (element, x, y) => {
    const mousePosition = getMousePosition()
    const cat1Position = getCat1Position() 

    element.innerHTML = ''

    if (x === mousePosition.x && y === mousePosition.y) {
        element.append("M")
    }

    if (x === cat1Position.x && y === cat1Position.y) {
        element.append("C1")
    }
}