import React from 'react';
import ReactDOM from 'react-dom';

const Otsikko = () => (
    <h1>anna palautetta</h1>
  )

const Button = ({ handleClick, text }) => (
  <button onClick={handleClick}>
    {text}
  </button>
)

const Statistic = ({name, value}) => (
  <tr><td>{name}</td><td>{value}</td></tr>
)

const Statistics = (props) => {
  let {hyva, neutraali, huono } = props.tila
  let ka = 0, pos = "0%", palautteita = hyva + neutraali + huono
  if( palautteita > 0 ){
    ka = ((hyva - huono) / palautteita).toFixed(1)
    pos = (( hyva / palautteita ) * 100 ).toFixed(1)
    pos = "" + pos + "%"


    return (
      <div>
        <h2>statistiikka</h2>
        <table>
          <tbody>
            <Statistic name="hyvä" value={hyva} />
            <Statistic name="neutraali" value={neutraali} />
            <Statistic name="huono" value={huono} />
            <Statistic name="keskiarvo" value={ka} />
            <Statistic name="positiivisia" value={pos} />
          </tbody>
        </table>
      </div>
    )
  } else {
    return (
      <div>
        <h2>statistiikka</h2>
          <p>ei yhtään palautetta annettu</p>
        </div>
    )
  }
}

class App extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      hyva: 0,
      neutraali: 0,
      huono: 0
    }

  }

  annaPalautetta = (palaute) => {
    return () => {
      let tila = this.state
      tila[palaute] = tila[palaute] + 1
      this.setState(tila)
    }
  }

  render() {
    return (
      <div>
        <Otsikko />
        <div>
          <Button handleClick={this.annaPalautetta("hyva")} text="hyvä" />
          <Button handleClick={this.annaPalautetta("neutraali")} text="neutraali" />
          <Button handleClick={this.annaPalautetta("huono")} text="huono" />
        </div>
        <Statistics tila={this.state}/>
      </div>
    )
  }
}

ReactDOM.render(<App />, document.getElementById('root'));
