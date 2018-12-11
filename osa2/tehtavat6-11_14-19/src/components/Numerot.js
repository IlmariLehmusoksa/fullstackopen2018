import React from 'react';

const Henkilo = ({person, deletePerson}) => <tr><td>{person.name}</td><td>{person.number}</td><td><button onClick={() => deletePerson(person.id, "poistetaanko varmasti " + person.name)}>poista</button></td></tr>

const Numerot = ({persons, filter, deletePerson}) => {
  const personsf = persons.filter( person => person.name.toLowerCase().includes( filter.toLowerCase() ))
  return (
    <div>
      <h2>Numerot</h2>
      <table>
        <tbody>
          {personsf.map(person => <Henkilo key={person.id} person={person} deletePerson={deletePerson}/>)}
        </tbody>
      </table>
    </div>
  )
}

export default Numerot
