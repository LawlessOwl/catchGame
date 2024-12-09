import { CATS_DIRECTIONS } from "../state/CATS_DIRECTIONS.js";
import { catsMove} from "../state/data.js"
import { Game } from "./gameSettings.component.js";

const rootElement = document.getElementById('root')

const render = () => {

    const gameInstance = Game()

    rootElement.append(gameInstance.element)

}

window.addEventListener('keyup', (event) => {
    switch(event.code){
        case'ArrowUp': catsMove(1, CATS_DIRECTIONS.UP)
        break
        case'ArrowDown': catsMove(1, CATS_DIRECTIONS.DOWN)
        break
        case'ArrowLeft': catsMove(1, CATS_DIRECTIONS.LEFT)
        break
        case'ArrowRight': catsMove(1, CATS_DIRECTIONS.RIGHT)
        break
    }
})

render()
