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
  <p>{name} {value}</p>
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
        <Statistic name="hyvä" value={hyva} />
        <Statistic name="neutraali" value={neutraali} />
        <Statistic name="huono" value={huono} />
        <Statistic name="keskiarvo" value={ka} />
        <Statistic name="positiivisia" value={pos} />
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

  klikHyva = () => {
    this.setState({
      hyva: this.state.hyva + 1,
      neutraali: this.state.neutraali,
      huono: this.state.huono
    })
  }

  klikNeutraali = () => {
    this.setState({
      hyva: this.state.hyva,
      neutraali: this.state.neutraali + 1,
      huono: this.state.huono
    })
  }

  klikHuono = () => {
    this.setState({
      hyva: this.state.hyva,
      neutraali: this.state.neutraali,
      huono: this.state.huono + 1
    })
  }

  render() {
    return (
      <div>
        <Otsikko />
        <div>
          <Button handleClick={this.klikHyva} text="hyvä" />
          <Button handleClick={this.klikNeutraali} text="neutraali" />
          <Button handleClick={this.klikHuono} text="huono" />
        </div>
        <Statistics tila={this.state}/>
      </div>
    )
  }
}

ReactDOM.render(<App />, document.getElementById('root'));
