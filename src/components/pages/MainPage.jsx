import React, { useState } from 'react';
import Grid from '@mui/material/Unstable_Grid2';
import User from '../common/User'
import Fab from '@mui/material/Fab';
import AddIcon from '@mui/icons-material/Add';
import SendIcon from '@mui/icons-material/Send';
import { TextField } from '@mui/material';
import { Button } from '@mui/material';
import { useLocation } from 'react-router-dom';
import '../../Assets/style.sass'

const MainPage = () => {
  const [message] = useState(localStorage.getItem('message')?.split(',') ?? []);
  const [inputText, setInputText] = useState('');
  const { state } = useLocation();
  console.log(useLocation())
  const [id] = useState(0);

  const sendMessage = e => {
    e.preventDefault();
    message.push(inputText);
    localStorage.setItem(`chat${id}`, {message});
    setInputText('');
  }

  // localStorage.clear()
  return (
    <>
      <Grid container spacing={2}>
        <Grid xs={2}>
          <div id='firstPart'>
            <span className='addNewUserSection'>
              <Fab color="primary" aria-label="add"> <AddIcon /> </Fab>
              <TextField id="standard-basic" label="Search..." variant="standard" />
            </span>
            <br></br>
            <br></br>
            {console.log(JSON.parse(localStorage.getItem(`user${0}`))?.userName, state)}
            {[...Array(localStorage.length).keys()].map(el => state !== JSON.parse(localStorage.getItem(`user${el}`)).userName ? <User userNames={JSON.parse(localStorage.getItem(`user${el}`)).userName}></User> : <></> )}
          </div>
        </Grid>
        <Grid xs={10}>
          <div id="secondPart">
            <div className='sectionForChating'>
            </div>
            <div className='sectionForWriting'>
              <span className='span'><TextField id="standard-basic" label="Write a message..." variant="standard" className='textField' onChange={e => setInputText(e.target.value)} value={inputText} /></span>
              <span className='span'><Button variant="contained" endIcon={<SendIcon />} className='submit' onClick={sendMessage}>Send</Button></span>
            </div>
          </div>
        </Grid>
      </Grid>
    </>
  );
}

export default MainPage;