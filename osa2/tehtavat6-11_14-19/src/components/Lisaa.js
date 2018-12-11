import React from 'react';

const Lisaa = ({name, number, formHandler, handlerName, handlerNumber}) => (
  <div>
  <h2>Lisää uusi</h2>
  <form onSubmit={formHandler}>
    <div>
      nimi: <input value={name} onChange={handlerName} />
    </div>
    <div>
      numero: <input value={number} onChange={handlerNumber} />
    </div>
    <div>
      <button type="submit">lisää</button>
    </div>
  </form>
  </div>
)

export default Lisaa
