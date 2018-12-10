import React from 'react';

const Henkilo = ({person}) => <tr><td>{person.name}</td><td>{person.number}</td></tr>

const Numerot = ({persons, filter}) => {
  const personsf = persons.filter( person => person.name.toLowerCase().includes( filter.toLowerCase() ))
  return (
    <div>
      <h2>Numerot</h2>
      <table>
        <tbody>
          {personsf.map(person => <Henkilo key={person.id} person={person} />)}
        </tbody>
      </table>
    </div>
  )
}

export default Numerot
