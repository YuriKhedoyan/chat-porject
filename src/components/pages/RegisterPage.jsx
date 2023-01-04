import React, { useState } from 'react';
import { TextField, Button, Alert, Snackbar } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import '../../Assets/signInUpPages.sass'

const RegisterPage = () => {
  const [userName, setUserName] = useState('');
  const [userLastName, setUserLastName] = useState('');
  const [userEmail, setUserEmail] = useState('');
  const [password, setPassword] = useState('');
  const [id, setId] = useState(localStorage.length !== 0 ? localStorage.length - 1 : 0);
  const [tosterWindow, setTosterWindow] = useState(false)
  const navigate = useNavigate();

  const cancel = () => {
    setUserName('');
    setUserLastName('');
    setUserEmail('');
    setPassword('');
  }

  const submit = () => {
    const getArrayFromUserKeys = [...Array(localStorage.length).keys()].length !== 0 ? [...Array(localStorage.length).keys()].length : 1

    for (let i = 0; i < getArrayFromUserKeys; i++) {
      const usersArray = JSON.parse(localStorage.getItem(`user${i}`))

      if (usersArray?.userName !== userName && usersArray?.userEmail !== userEmail) {
        localStorage.setItem(`user${id}`, JSON.stringify({ id, userName, userLastName, userEmail, password }));
        setId(id + 1);
        setUserName('');
        setUserLastName('');
        setUserEmail('');
        setPassword('');
        navigate('/');
      } else {
        setTosterWindow(true);
        setTimeout(() => setTosterWindow(false), 5000);
      }
    }
  }

  return (
    <>
      <div className='mainDiv'>
        <Snackbar open={tosterWindow} autoHideDuration={6000} onClose={tosterWindow} key={'left' + 'bottom'} anchorOrigin={{vertical: 'bottom', horizontal: 'left'}}>
          <Alert severity={'error'} sx={{ width: '100%', bgcolor: 'black', color: 'white' }}> This name or email is busy, please try an other one ! </Alert>
        </Snackbar>
        <TextField id="standard-basic" label="Write User name" variant="standard" value={userName} onChange={e => setUserName(e.target.value)} />
        <br></br>
        <br></br>
        <TextField id="standard-basic" label="Write User Lastname" variant="standard" value={userLastName} onChange={e => setUserLastName(e.target.value)} />
        <br></br>
        <br></br>
        <TextField id="standard-basic" label="Write your Email" variant="standard" value={userEmail} onChange={e => setUserEmail(e.target.value)} />
        <br></br>
        <br></br>
        <TextField id="standard-basic" label="Write your password" variant="standard" type='password' value={password} onChange={e => setPassword(e.target.value)} />
        <br></br>
        <br></br>
        <Button variant="contained" color="success" onClick={submit}> Submit </Button>
        <Button variant="contained" color="error" onClick={cancel}> Cancel </Button>
        <br></br>
        <br></br>
        <p>Already have account ? <a href={'/LoginPage'}>Sign in</a></p>
      </div>
    </>
  )
}

export default RegisterPage;