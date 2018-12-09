import React from 'react';
import ReactDOM from 'react-dom';

const Otsikko = () => (
    <h1>anna palautetta</h1>
  )

const Nappula = ({ handleClick, text }) => (
  <button onClick={handleClick}>
    {text}
  </button>
)

const Statistiikka = (props) => {
  let {hyva, neutraali, huono } = props.tila
  let ka = 0, pos = 0
  if( hyva + neutraali + huono > 0 ){
    ka = ((hyva - huono) / (hyva + neutraali + huono)).toFixed(1)
    pos = (( hyva / (hyva + neutraali + huono) ) * 100 ).toFixed(1)
  }
  return (
    <div>
      <h2>statistiikka</h2>
      <p>hyvä {hyva} <br />
        neutraali {neutraali}<br />
        huono {huono}<br />
        keskiarvo { ka }<br />
        positiivisia {pos} %</p>
    </div>
  )
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
          <Nappula handleClick={this.klikHyva} text="hyvä" />
          <Nappula handleClick={this.klikNeutraali} text="neutraali" />
          <Nappula handleClick={this.klikHuono} text="huono" />
        </div>
        <Statistiikka tila={this.state}/>
      </div>
    )
  }
}

ReactDOM.render(<App />, document.getElementById('root'));
