import { getGridSize } from "../../state/data.js"

export let Grid = () => {
    const element = document.createElement('table')

    const gridSize = getGridSize()

    for (let y = 0; y < gridSize.rowCount; y++) {
        const row = document.createElement("tr")

        for (let x = 0; x < gridSize.columnCount; x++) {
            const cell = document.createElement('td')
            cell.append(x, "-", y)
            row.append(cell)
            
        }
        element.append(row)
    }

    return element
}