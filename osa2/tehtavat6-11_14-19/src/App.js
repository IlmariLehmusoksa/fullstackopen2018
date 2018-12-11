import React from 'react';

import personService from './services/persons'

import Numerot from './components/Numerot'
import Filtteri from './components/Filtteri'
import Lisaa from './components/Lisaa'

class App extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      persons: [],
      newName: '',
      newNumber: '',
      filter: ''
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
      this.setState({
        newName: '',
        newNumber: ''
      })
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
            newNumber: ''
      })
    })


    }
  }

  render() {
    return (
      <div>
        <h1>Puhelinluettelo</h1>
        <Filtteri value={this.state.filter} handler= {this.handleFilterChange} />
        <Lisaa name={this.state.newName}
            number={this.state.newNumber}
            formHandler={this.addPerson}
            handlerName={this.handlePersonChange}
            handlerNumber={this.handleNumberChange} />
        <Numerot persons={this.state.persons} filter={this.state.filter} />
      </div>
    )
  }
}

export default App
