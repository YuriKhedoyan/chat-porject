import React, { useState } from 'react';
import { TextField, Button } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import '../../Assets/signInUpPages.sass'

const LoginPage = () => {
  const navigate = useNavigate();
  const [userName, setUserName] = useState('');
  const [password, setPassword] = useState('');

  const cancel = () => {
    setUserName('')
    setPassword('')
  }

  const submit = () => {
    for (let i = 0; i < [...Array(localStorage.length).keys()].length; i++) {
      const usersArray = JSON.parse(localStorage.getItem(`user${i}`))
      if (usersArray.userName === userName && usersArray.password === password) {
        return navigate('/MainPage', {state: userName})
      }
    }
  }

  return (
    <>
      <div className='mainDiv'>
        <TextField id="standard-basic" label="Write User name" variant="standard" value={userName} onChange={e => setUserName(e.target.value)} />
        <br></br>
        <br></br>
        <TextField id="standard-basic" label="Write Password" type='password' variant="standard" value={password} onChange={e => setPassword(e.target.value)} />
        <br></br>
        <br></br>
        <Button variant="contained" color="success" onClick={submit}> Submit </Button>
        <Button variant="contained" color="error" onClick={cancel}> Cancel </Button>
        <br></br>
        <br></br>
        <p>Dont have account yet? <a href={'/RegisterPage'}>Sign up</a></p>
      </div>
    </>
  )
}

export default LoginPage;