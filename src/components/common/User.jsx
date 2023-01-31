import React from 'react';
import { Avatar } from '@mui/material';
import '../../Assets/user.sass'

const Users = (props) => {

  return (
    <div className='user'>
      <span className='span'><Avatar>{props.userNames}</Avatar></span>
      <span className='span'><h4>{props.userNames}</h4></span>
    </div>
  )
}

export default Users;