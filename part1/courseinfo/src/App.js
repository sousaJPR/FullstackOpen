import { useState } from "react"

const App = () => {
  const [valor, setValor] = useState(10)

  const setNewValue = (newValue) => {
    console.log('setValor atual', newValue)
    setValor(newValue)
  }


  return (
    <div>
      <Exibir valor={valor} />
      <Botao setNewValue={() => setNewValue(valor + 2000)} text="+2000" />
      <Botao setNewValue={() => setNewValue(0)} text="Zero" />
      <Botao setNewValue={() => setNewValue(valor + 1)} text="+1" />
    </div>
  )
}

const Exibir = (props) => (
  <div>{props.valor}</div>
)

const Botao = ({ setNewValue, text }) => (
  <button onClick={setNewValue}>{text}</button>
)
export default App