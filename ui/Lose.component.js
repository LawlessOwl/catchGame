export const loseMode = () => {
    const element = document.createElement('div')

    loseMode.render(element)

    return {element}
}

loseMode.render = (element) => {
    element.append("You lose")

    const playAgainButton = document.createElement('button')
    playAgainButton.append('play again')

    element.append(playAgainButton)
}