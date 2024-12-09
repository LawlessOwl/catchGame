import { getCat1Position, getGridSize, getMousePosition, subsriber } from "../../state/data.js"

export let Grid = () => {
    const element = document.createElement('table')

    subsriber(() => {
        Grid.render(element)
    })

    Grid.render(element)

    return {element}
}

Grid.render = (element) => {
    element.innerHTML = ""
    const gridSize = getGridSize()

    const mousePosition = getMousePosition()

    const cat1Position = getCat1Position()

    for (let y = 0; y < gridSize.rowCount; y++) {
        const row = document.createElement("tr")

        for (let x = 0; x < gridSize.columnCount; x++) {
            const cell = document.createElement('td')
            if (x === mousePosition.x && y === mousePosition.y) {
                cell.append("M")
            }

            if (x === cat1Position.x && y === cat1Position.y) {
                cell.append("C1")
            }
            
            row.append(cell)
            
        }
        element.append(row)
    }
}