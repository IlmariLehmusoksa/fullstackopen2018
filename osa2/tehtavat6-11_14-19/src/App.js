import React from 'react';

import personService from './services/persons'

import Numerot from './components/Numerot'
import Filtteri from './components/Filtteri'
import Lisaa from './components/Lisaa'
import Notifikaatio from './components/Notifikaatio'

class App extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      persons: [],
      newName: '',
      newNumber: '',
      filter: '',
      stateMessage: null
    }
  }

  componentDidMount() {
    //console.log('did mount')
    personService
      .getAll()
      .then(response => {
        //console.log('promise fulfilled')
        this.setState({ persons: response.data })
      })
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
    if ( this.state.persons.map(person => person.name ).includes( this.state.newName ) ){
      // name is already in the list

      let result = window.confirm(this.state.newName + " on jo luettelossa, korvataanko puhelinnumero uudella?");

      if (result){
        const id = this.state.persons.map(person => person.name ).indexOf( this.state.newName ) + 1
        const personObject = {
          name: this.state.newName,
          number: this.state.newNumber
        }

        personService
          .update(id, personObject)
          .then(response => {
            this.setState({
              persons: this.state.persons.map(person => person.id !== id ? person : response.data ),
              newName: '',
              newNumber: '',
              stateMessage: "päivitettiin " + response.data.name
            })
            setTimeout(() => {
              this.setState({stateMessage: null})
              }, 5000)
          })
      }

    } else {
      // an actual new name
      const personObject = {
        name: this.state.newName,
        number: this.state.newNumber
      }

      personService
        .create( personObject)
        .then(response => {
          this.setState({
            persons: this.state.persons.concat(response.data),
            newName: '',
            newNumber: '',
            stateMessage: "lisättiin " + response.data.name
          })
          setTimeout(() => {
            this.setState({stateMessage: null})
            }, 5000)
        })
    }
  }

  deletePerson = (id, message) => {
    let result = window.confirm(message);

    if (result){
      let name = this.state.persons[parseInt(id) - 1].name

      personService
        .del(id)
        .then(response => {
          this.setState({
            persons: this.state.persons.filter(person => person.id !== id ).map( person => person ),
            stateMessage: "poistettiin " + name
          })
          setTimeout(() => {
            this.setState({stateMessage: null})
            }, 5000)
        })
    }
  }

  render() {
    return (
      <div>
        <h1>Puhelinluettelo</h1>
        <Notifikaatio message={this.state.stateMessage} />
        <Filtteri value={this.state.filter} handler= {this.handleFilterChange} />
        <Lisaa name={this.state.newName}
            number={this.state.newNumber}
            formHandler={this.addPerson}
            handlerName={this.handlePersonChange}
            handlerNumber={this.handleNumberChange} />
        <Numerot persons={this.state.persons} filter={this.state.filter} deletePerson={this.deletePerson} />
      </div>
    )
  }
}

export default App
