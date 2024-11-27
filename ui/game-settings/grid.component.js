import { getGridSize, getMousePosition } from "../../state/data.js"

export let Grid = () => {
    const element = document.createElement('table')

    const gridSize = getGridSize()

    const mousePosition = getMousePosition()

    for (let y = 0; y < gridSize.rowCount; y++) {
        const row = document.createElement("tr")

        for (let x = 0; x < gridSize.columnCount; x++) {
            const cell = document.createElement('td')
            if (x === mousePosition.x && y === mousePosition.y) {
                cell.append("M")
            }
            
            row.append(cell)
            
        }
        element.append(row)
    }

    return element
}