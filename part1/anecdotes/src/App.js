import { useState } from 'react'

const App = () => {
  const anecdotes = [
    'Se fazer algo dói, faça isso com mais frequência.',
    'Contratar mão de obra para um projeto de software que já está atrasado, faz com que se atrase mais ainda!',
    'Os primeiros 90% do código correspondem aos primeiros 10% do tempo de desenvolvimento... Os outros 10% do código correspondem aos outros 90% do tempo de desenvolvimento.',
    'Qualquer tolo escreve código que um computador consegue entender. Bons programadores escrevem código que humanos conseguem entender.',
    'Otimização prematura é a raiz de todo o mal.',
    'Antes de mais nada, depurar é duas vezes mais difícil do que escrever o código. Portanto, se você escrever o código da forma mais inteligente possível, você, por definição, não é inteligente o suficiente para depurá-lo.',
    'Programar sem o uso extremamente intenso do console.log é o mesmo que um médico se recusar a usar raio-x ou testes sanguíneos ao diagnosticar pacientes.',
    'A única maneira de ir rápido é ir bem.'
  ]

  const [selected, setSelected] = useState(0)

  const votesArray = new Array(anecdotes.length).fill(0)
  const [votes, setVotes] = useState(votesArray)

  // Get the random number to select the anecdote
  const randomNumber = () => {
    return Math.floor(Math.random() * anecdotes.length)
  }
  // update selected state
  const handleNext = () => {
    setSelected(randomNumber)
  }

  // Get the vote for the selected anecdote
  const handleVote = () => {
    const arrayCopy = [...votes]
    arrayCopy[selected] += 1
    setVotes([...arrayCopy])
  }

  return (
    <div>
      <SelectedAnecdote anecdotes={anecdotes} selected={selected} votes={votes} />
      <Button onClick={handleVote} text="Vote" />
      <Button onClick={handleNext} text="Next Anecdote" />
      <MostVotedAnecdote anecdotes={anecdotes} votes={votes} />
    </div>
  )
}

// Components
const SelectedAnecdote = ({ anecdotes, selected, votes }) => (
  <div>
    <h1>Anecdote of the Day</h1>
    <p>{anecdotes[selected]} <br /> has {votes[selected]} votes</p>
  </div>
)

const MostVotedAnecdote = ({ anecdotes, votes }) => {
  const higherVotes = Math.max(...votes)
  const maxIndex = votes.indexOf(higherVotes)

  return (
    <div>
      <h1>Anecdote with most votes</h1>
      <p>{anecdotes[maxIndex]} <br /> has {votes[maxIndex]} votes</p>
    </div>
  )
}

const Button = ({ onClick, text }) => <button onClick={onClick}>{text}</button>


export default App