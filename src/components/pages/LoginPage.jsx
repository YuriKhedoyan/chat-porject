import React, { useState } from 'react';
import { TextField, Button, Snackbar, Alert } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import '../../Assets/signInUpPages.sass'

const LoginPage = () => {
  const navigate = useNavigate();
  const [userName, setUserName] = useState('');
  const [password, setPassword] = useState('');
  const [tosterWindow, setTosterWindow] = useState(false);

  const cancel = () => {
    setUserName('')
    setPassword('')
  }

  const submit = () => {
    if (localStorage.length === 0) {
      setTosterWindow(true);
      setTimeout(() => setTosterWindow(false), 5000);
    } else {
      [...Array(localStorage.length).keys()].map(el => {
        const usersArray = JSON.parse(localStorage.getItem(`user${el}`))
        if (usersArray.userName === userName && usersArray.password === password) {
          return navigate('/MainPage', { state: userName })
        } else {
          setTosterWindow(true);
          setTimeout(() => setTosterWindow(false), 5000);
        }
      })
    }
  }

  return (
    <>
      <div className='mainDiv'>
        <Snackbar open={tosterWindow} autoHideDuration={6000} onClose={tosterWindow} key={'left' + 'bottom'} anchorOrigin={{ vertical: 'bottom', horizontal: 'left' }}>
          <Alert severity={'error'} sx={{ width: '100%', bgcolor: 'black', color: 'white' }}> User name or password is wrong ! </Alert>
        </Snackbar>
        <TextField id="standard-basic" label="Write User name" variant="standard" value={userName} onChange={e => setUserName(e.target.value)} />
        <p className="space"></p>
        <TextField id="standard-basic" label="Write Password" type='password' variant="standard" value={password} onChange={e => setPassword(e.target.value)} />
        <p className="space"></p>
        <Button variant="contained" color="success" onClick={submit}> Submit </Button>
        <Button variant="contained" color="error" onClick={cancel}> Cancel </Button>
        <p className="space"></p>
        <p>Dont have account yet? <a href={'/RegisterPage'}>Sign up</a></p>
      </div>
    </>
  )
}

export default LoginPage;