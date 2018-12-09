import React from 'react'
import ReactDOM from 'react-dom'

const Button = ({handler, text}) => (
  <button onClick={handler}>{text}</button>
)

class App extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      selected: 0,
      pisteet: new Array(anecdotes.length).fill(0)
    }
  }

  randomAnecdote = () => {
    let random = Math.floor(Math.random() * (anecdotes.length));
    this.setState({ selected: random, pisteet: this.state.pisteet })
  }

  vote = () => {
    let pisteet = [...this.state.pisteet]
    pisteet[ this.state.selected ] += 1
    this.setState({ selected: this.state.selected, pisteet: pisteet })
  }

  render() {
    return (
      <div>
        <p>{this.props.anecdotes[this.state.selected]}</p>
        <p>has {this.state.pisteet[this.state.selected]} votes</p>
        <div>
          <Button handler={this.vote} text="vote" />
          <Button handler={this.randomAnecdote} text="next anecdote" />
        </div>
      </div>
    )
  }
}

const anecdotes = [
  'If it hurts, do it more often',
  'Adding manpower to a late software project makes it later!',
  'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
  'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
  'Premature optimization is the root of all evil.',
  'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.'
]

ReactDOM.render(
  <App anecdotes={anecdotes} />,
  document.getElementById('root')
)
