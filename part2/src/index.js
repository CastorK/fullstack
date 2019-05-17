import React from 'react'
import ReactDOM from 'react-dom'
import Course from './components/Course'
import Total from './components/Total'

const App = () => {
  const course = {
    name: 'Half Stack -sovelluskehitys',
    parts: [
      {
        name: 'Reactin perusteet',
        exercises: 10
      },
      {
        name: 'Tiedonvälitys propseilla',
        exercises: 7
      },
      {
        name: 'Komponenttien tila',
        exercises: 14
      }
    ]
  }
  const total = course.parts.map( part => part.exercises ).reduce( (sum, part) => sum + part )

  return (
    <div>
      <Course course={course} />
      <Total total={total} />
    </div>
  )
}

ReactDOM.render(<App />, document.getElementById('root'))
