import React, { useState } from 'react';
import Grid from '@mui/material/Unstable_Grid2';
import User from '../common/User'
import Fab from '@mui/material/Fab';
import AddIcon from '@mui/icons-material/Add';
import SendIcon from '@mui/icons-material/Send';
import { TextField } from '@mui/material';
import { Button } from '@mui/material';
import '../../Assets/style.sass'

const MainPage = () => {
  const [usersNameArray] = useState([]);
  const [message] = useState(localStorage.getItem('message')?.split(',') ?? []);
  const [inputText, setInputText] = useState('');
  const [userName, setUserName] = useState('');
  const [userLastName, setUserLastName] = useState('');
  const [id, setId] = useState(0);
  const [open, setOpen] = useState('none');

  const sendMessage = e => {
    e.preventDefault();
    message.push(inputText);
    localStorage.setItem(`chat${id}`, {message});
    setInputText('');
  }

  const addNewChat = () => {
    setId(id + 1);
    usersNameArray.push([userName, ' ', userLastName].join(''))
    localStorage.setItem(`chat${id}`, message, usersNameArray[id]);
  }

  // localStorage.clear()
  return (
    <>
      <Grid container spacing={2}>
        <Grid xs={2}>
          <div id='firstPart'>
            <span className='addNewUserSection'>
              <Fab color="primary" aria-label="add" onClick={e => setOpen('block')}> <AddIcon /> </Fab>
              <TextField id="standard-basic" label="Search..." variant="standard" />
              <div className='addNewUser' style={{display: `${open}`}}>
                <TextField id="standard-basic" label="Search..." variant="standard" className='textField' value={userName} onChange={e => setUserName(e.target.value)}/>
                <TextField id="standard-basic" label="Search..." variant="standard" className='textField' value={userLastName} onChange={e => setUserLastName(e.target.value)}/>
                <br></br>
                <br></br>
                <Button variant="contained" endIcon={<SendIcon />} onClick={addNewChat}>Send</Button>
                <Button variant="contained" color='error' onClick={e => setOpen('none')}>Cancel</Button>
              </div>
            </span>
            {usersNameArray.map((el, i) => <User userNames={usersNameArray[i]}></User>)}
          </div>
        </Grid>
        <Grid xs={10}>
          <div id="secondPart">
            <div className='sectionForChating'>
              {localStorage.getItem('message')?.split(',')?.map(el => <p>{el}</p>)}
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