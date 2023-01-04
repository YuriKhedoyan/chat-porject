import React  from 'react';
import { Avatar } from '@mui/material';
import '../../Assets/user.sass'

const Users = (props) => {

  return (
    <>
      <div>
        <span className='span'><Avatar>{props.userNames?.name[0]}</Avatar></span>
        <span className='span'><h4>{props.userNames?.name}</h4></span>
      </div>
      <br></br>
    </>
  )
}

export default Users;