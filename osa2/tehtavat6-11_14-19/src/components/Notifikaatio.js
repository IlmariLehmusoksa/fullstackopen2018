import React from 'react';

const Notifikaatio = ({ message }) => {
  if (message === null) {
    return null
  }
  return (
    <div className="success">
      {message}
    </div>
  )
}

export default Notifikaatio
