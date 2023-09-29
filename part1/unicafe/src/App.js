import { useState } from "react";

function App() {
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)
  const [total, setTotal] = useState(0)
  
  const average = () => {
    let badA = bad * - 1
    return ((good + badA) / total).toFixed(1)
  }
  const positiveFeedback = () => {
    const result = (good / total) * 100
    return result.toFixed(1) + " %"
  }

  return (
    <>
      <div className="App">
        <h1>give feedback</h1>
        <Button handleClick = {() => setGood(good + 1) + setTotal(total + 1)} text = "Good" />
        <Button handleClick = {() => setNeutral(neutral + 1) + setTotal(total + 1)} text = "Neutral" />
        <Button handleClick = {() => setBad(bad + 1) + setTotal(total + 1)} text = "Bad" />
      </div>
      <div>
        <Statistics
          good={good}
          neutral={neutral}
          bad={bad}
          total={total} 
          average = {average()}
          positiveFeedback = {positiveFeedback()}/>
      </div>
    </>
  );
}

// Buttons and Statistic Line Components
const Button = ({ handleClick, text }) => <button onClick={handleClick}>{text}</button>
const StatisticLine = ({ text, value}) => {
  return (
    <table>
      <tbody>
        <tr>
        <td style={{width: "70px"}}>{text}</td>
        <td>{value}</td>
      </tr>
      </tbody>
    </table>
    
  )
}


const Statistics = (props) => {
  if (!props.good && !props.neutral && !props.bad) {
    return <p>No feedback given</p>
  } else {
    return (
      <>
        <h1>statistics</h1>
        <StatisticLine text="good" value={(props.good)} />
        <StatisticLine text="neutral" value={(props.neutral)} />
        <StatisticLine text="bad" value={(props.bad)} />
        <StatisticLine text="all" value={(props.total)} />
        <StatisticLine text="average" value={(props.average)} />
        <StatisticLine text="positive" value={(props.positiveFeedback)} />
      </>
    )
  }
}


  export default App;
