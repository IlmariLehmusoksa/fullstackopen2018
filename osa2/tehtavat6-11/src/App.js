import React from 'react';

const Numerot = ({persons}) => (
  <div>
    {persons.map(person => <p key={person.id}>{person.name}</p>)}
  </div>
)

class App extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      persons: [
        { id: 1, name: 'Arto Hellas' }
      ],
      newName: ''
    }
  }

  handlePersonChange = (event) => {
    //console.log(event.target.value)
    this.setState({ newName: event.target.value })
  }

  addPerson = (event) => {
    event.preventDefault()
    //console.log('nappia painettu')
    //console.log(event.target)
    let persons = null
    if ( this.state.persons.map(person => person.name ).includes( this.state.newName ) ){
      // name is already in the list
      persons = this.state.persons
    } else {
      // an actual new name
      const personObject = {
        name: this.state.newName,
        id: this.state.persons.length + 1
      }

      persons = this.state.persons.concat(personObject)
    }

    this.setState({
      persons: persons,
      newName: ''
    })
  }

  render() {
    return (
      <div>
        <h2>Puhelinluettelo</h2>
        <form onSubmit={this.addPerson}>
          <div>
            nimi: <input value={this.state.newName}
            onChange={this.handlePersonChange} />
          </div>
          <div>
            <button type="submit">lisää</button>
          </div>
        </form>
        <h2>Numerot</h2>
          <Numerot persons={this.state.persons} />
      </div>
    )
  }
}

export default App
