import React from 'react';

const Henkilo = ({person}) => <tr><td>{person.name}</td><td>{person.number}</td></tr>

const Numerot = ({persons, filter}) => {
  const personsf = persons.filter( person => person.name.toLowerCase().includes( filter.toLowerCase() ))
  return (
    <table>
      <tbody>
        {personsf.map(person => <Henkilo key={person.id} person={person} />)}
      </tbody>
    </table>
  )
}

class App extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      persons: [
        { id: 1, name: 'Arto Hellas', number: '045-1234567' },
      { id: 2, name: 'Martti Tienari', number: '040-1234568' },
      { id: 3, name: 'Arto Järvinen', number: '040-1234569' },
      { id: 4, name: 'Lea Kutvonen', number: '040-1234560' }
      ],
      newName: '',
      newNumber: '',
      filter: ''
    }
  }

  handlePersonChange = (event) => {
    //console.log(event.target.value)
    this.setState({ newName: event.target.value })
  }

  handleNumberChange = (event) => {
    //console.log(event.target.value)
    this.setState({ newNumber: event.target.value })
  }

  handleFilterChange = (event) => {
    //console.log(event.target.value)
    this.setState({ filter: event.target.value })
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
        number: this.state.newNumber,
        id: this.state.persons.length + 1
      }

      persons = this.state.persons.concat(personObject)
    }

    this.setState({
      persons: persons,
      newName: '',
      newNumber: ''
    })
  }

  render() {
    return (
      <div>
        <h1>Puhelinluettelo</h1>
          <div>
            rajaa näytettäviä: <input value={this.state.filter}
            onChange={this.handleFilterChange} />
          </div>
        <h2>Lisää uusi</h2>
        <form onSubmit={this.addPerson}>
          <div>
            nimi: <input value={this.state.newName}
            onChange={this.handlePersonChange} />
          </div>
          <div>
            numero: <input value={this.state.newNumber}
            onChange={this.handleNumberChange} />
          </div>
          <div>
            <button type="submit">lisää</button>
          </div>
        </form>
        <h2>Numerot</h2>
          <Numerot persons={this.state.persons} filter={this.state.filter} />
      </div>
    )
  }
}

export default App
