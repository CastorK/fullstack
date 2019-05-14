import React, { useState } from 'react'
import ReactDOM from 'react-dom'

const Button = ({ text, handleClick }) => {
    return (
        <button onClick={handleClick}>{text}</button>
    )
}

const Statistics = ({ good, neutral, bad}) => {
    const sum = good + neutral + bad
    const average = (good - bad) / sum
    const positives = String((good / sum) * 100).concat('%')

    if (sum === 0) {
        return (
            <p>Ei yhtään palautetta annettu</p>
        )
    }

    return (
        <table>
            <tbody>
                <Statistic text="hyvä" value={good} />
                <Statistic text="neutraali" value={neutral} />
                <Statistic text="huono" value={bad} />
                <Statistic text="yhteensä" value={sum} />
                <Statistic text="keskiarvo" value={average} />
                <Statistic text="posiitivisia" value={positives} />
            </tbody>
        </table>
    )
}

const Statistic = ({ text, value}) => {
    return (
        <tr><td>{text}</td><td>{value}</td></tr>
    )
}

const App = () => {
  // tallenna napit omaan tilaansa
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)

  return (
    <div>
      <h1>Anna palautetta</h1>
      <Button text="hyvä" handleClick={() => setGood(good+1)} />
      <Button text="neutraali" handleClick={() => setNeutral(neutral+1)} />
      <Button text="huono" handleClick={() => setBad(bad+1)} />
      <h1>Statistiikka</h1>
      <Statistics good={good} neutral={neutral} bad={bad} />
    </div>
  )
}

ReactDOM.render(<App />, 
  document.getElementById('root')
)