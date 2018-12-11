import React from 'react';
import axios from 'axios';

const Filtteri = ({value, handler}) => (
  <div>
    find countries: <input value={value} onChange={handler} />
  </div>
)

const YksiMaa = ({country}) => (
  <div>
    <h3>{country.name} {country.nativeName}</h3>
    <p>capital: {country.capital}</p>
    <p>population: {country.population}</p>
    <img src={country.flag} alt={country.name} height="100px"/>
  </div>
)

const Maa = ({country}) => <tr><td>{country.name}</td></tr>

const Maat = ({countries, filter}) => {
  const countriesf = countries.filter( country => country.name.toLowerCase().includes( filter.toLowerCase() ))

  if ( countriesf.length === 1 ){
    return(
      <YksiMaa country={countriesf[0]} />
    )
  } else  if( countriesf.length > 10 ) {
    return(
      <div>
        <p>too many matches, specify another filter</p>
      </div>
    )
  } else {
  return (
    <div>
      <table>
        <tbody>
          {countriesf.map(country => <Maa key={country.alpha3Code} country={country} />)}
        </tbody>
      </table>
    </div>
  )}
}

class App extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      countries: [],
      filter: ''
    }
  }

  componentDidMount() {
    //console.log('did mount')
    axios
      .get('https://restcountries.eu/rest/v2/all')
      .then(response => {
        //console.log('promise fulfilled')
        this.setState({ countries: response.data })
      })
  }

  handleFilterChange = (event) => {
    //console.log(event.target.value)
    this.setState({ filter: event.target.value })
  }

  render() {
    return (
      <div>
        <Filtteri value={this.state.filter} handler= {this.handleFilterChange} />
        <Maat countries={this.state.countries} filter={this.state.filter} />
      </div>
    )
  }
}

export default App;
