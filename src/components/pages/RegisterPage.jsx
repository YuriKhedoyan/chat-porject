import React, { useState } from 'react';
import { TextField, Button, Alert, Snackbar } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import '../../Assets/signInUpPages.sass'

const RegisterPage = () => {
  const [userName, setUserName] = useState('');
  const [userLastName, setUserLastName] = useState('');
  const [userEmail, setUserEmail] = useState('');
  const [password, setPassword] = useState('');
  const tempId = JSON.parse(localStorage.getItem(`user${localStorage.length - 1}`))?.id + 1;
  const [id, setId] = useState(isNaN(tempId) ? 0 : tempId);
  const [tosterWindow, setTosterWindow] = useState(false)
  const navigate = useNavigate();

  const cancel = () => {
    setUserName('');
    setUserLastName('');
    setUserEmail('');
    setPassword('');
  }

  const submit = () => {
    const getArrayFromUserKeys = [...Array(localStorage.length).keys()].length !== 0 ? [...Array(localStorage.length).keys()] : [1]

    getArrayFromUserKeys.forEach(el => {
      const usersArray = JSON.parse(localStorage.getItem(`user${el}`))
      if (usersArray?.userName !== userName && usersArray?.userEmail !== userEmail) {
        addNewUser()
      } else if (localStorage.length === 0) {
        addNewUser()
      } else {
        setTosterWindow(true);
        setTimeout(() => setTosterWindow(false), 5000);
      }})
  }

  const addNewUser = () => {
    localStorage.setItem(`user${id}`, JSON.stringify({ id, userName, userLastName, userEmail, password }));
    setId(id + 1);
    setUserName('');
    setUserLastName('');
    setUserEmail('');
    setPassword('');
    navigate('/MainPage', { state: userName });
  }

return (
  <>
    <div className='mainDiv'>
      <Snackbar open={tosterWindow} autoHideDuration={6000} key={'left' + 'bottom'} anchorOrigin={{ vertical: 'bottom', horizontal: 'left' }}>
        <Alert severity={'error'} sx={{ width: '100%', bgcolor: 'black', color: 'white' }}> This name or email is busy, please try an other one ! </Alert>
      </Snackbar>
      <TextField className="standard-basic" label="Write User name" variant="standard" value={userName} onChange={e => setUserName(e.target.value)} />
      <p className="space"></p>
      <TextField className="standard-basic" label="Write User Lastname" variant="standard" value={userLastName} onChange={e => setUserLastName(e.target.value)} />
      <p className="space"></p>
      <TextField className="standard-basic" label="Write your Email" variant="standard" value={userEmail} onChange={e => setUserEmail(e.target.value)} />
      <p className="space"></p>
      <TextField className="standard-basic" label="Write your password" variant="standard" type='password' value={password} onChange={e => setPassword(e.target.value)} />
      <p className="space"></p>
      <Button variant="contained" color="success" onClick={submit}> Submit </Button>
      <Button variant="contained" color="error" onClick={cancel}> Cancel </Button>
      <p>Already have account ? <a href={'/'}>Sign in</a></p>
    </div>
  </>
)
}

export default RegisterPage;