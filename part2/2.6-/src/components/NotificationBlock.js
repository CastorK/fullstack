import React from 'react'

const Notification = ({msg}) => {
  if ( !msg ) {
    return null
  }

  const notificationStyle = {
    color: 'green',
    background: 'lightgrey',
    fontSize: 20,
    borderStyle: 'solid',
    borderRadius: 5,
    padding: 10,
    marginBottom: 10
  }

  return (
    <div style={notificationStyle} className="notification">{ msg }</div>
  )
}

export default Notification