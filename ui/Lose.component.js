export const loseMode = () => {
    const element = document.createElement('div')

    element.append("You lose")

    const playAgainButton = document.createElement('button')
    playAgainButton.append('play again')

    element.append(playAgainButton)
 
    return element
}