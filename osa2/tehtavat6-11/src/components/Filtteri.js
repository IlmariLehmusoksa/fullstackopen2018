import React from 'react';

const Filtteri = ({value, handler}) => (
  <div>
    rajaa näytettäviä: <input value={value} onChange={handler} />
  </div>
)

export default Filtteri
