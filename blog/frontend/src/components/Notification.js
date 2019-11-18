import React from 'react'

const Notification = ({ notification }) => {
  if ( !notification.msg ) {
    return null
  }

  const notificationStyle = {
    background: 'lightgrey',
    fontSize: 20,
    borderStyle: 'solid',
    borderRadius: 5,
    padding: 10,
    marginBottom: 10
  }
  switch (notification.type) {
  case 'success': notificationStyle.color = 'green'; break
  case 'fail': notificationStyle.color = 'red'; break
  default: notificationStyle.color = 'blue'; break
  }

  return (
    <div style={notificationStyle} className="notification">{ notification.msg }</div>
  )
}

export default Notification