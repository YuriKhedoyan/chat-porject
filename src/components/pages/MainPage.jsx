import React, { useState } from 'react';
import SendIcon from '@mui/icons-material/Send';
import { TextField, Button, Grid, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@mui/material';
import { useLocation } from 'react-router-dom';
import User from '../common/User'
import '../../Assets/style.sass'

const MainPage = () => {
  const [message] = useState([]);
  const [inputText, setInputText] = useState('');
  const { state } = useLocation();
  const [id] = useState(0);
  const [chatsList, setChatList] = useState([]);
  const [searchMember, setSearchMember] = useState('');
  const [result, setResult] = useState([]);
  //{ id: 0, userName: 'a', userLastName: 'a', userEmail: 'a', password: 'a', chat: {} }

  const sendMessage = e => {
    e.preventDefault();
    message.push(inputText);
    localStorage.setItem(`chat${id}`, { message });
    setInputText('');
  }

  const searchNewUser = e => {
    setSearchMember(e.target.value)

    return chatsList.filter(el => {
      debugger
      const usersArray = JSON.parse(localStorage.getItem(`user${el}`))
      if (usersArray.userName === searchMember && searchMember !== '' && searchMember !== state && (new Set(result)).size === result.length) {
        result.push(usersArray)
      }
    })
  }

  const addNewChat = (e, user) => {
    e.preventDefault();
    new Set(chatsList).size === chatsList.length ? chatsList.push(user) : <></>;
    setChatList(chatsList);

  }

  return (
    <>
      <Grid container spacing={2}>
        <Grid>
          <div id='firstPart'>
            <span className='addNewUserSection'>
              <TextField id="standard-basic" label="Search..." variant="standard" onChange={searchNewUser} value={searchMember} />
              <br></br>
              <div className='resutOfSearching'>
                {result.map((el, i) => <>
                  <TableContainer>
                    <Table sx={{ maxWidth: 300 }} aria-label="simple table">
                      <TableBody>
                        <TableRow>
                          <TableCell align="right">
                            <form onSubmit={e => addNewChat(e, JSON.parse(localStorage.getItem(`user${i}`)))}>
                              <button className='addingNewUser' type={'submit'}  >
                                <User userNames={JSON.parse(localStorage.getItem(`user${i}`)).userName}></User>
                              </button>
                            </form>
                          </TableCell>
                        </TableRow>
                      </TableBody>
                    </Table>
                  </TableContainer>
                </>)}
              </div>
            </span>
            <p className="space"></p>
            {chatsList.map(el => <User userNames={el.userName}></User>)}
          </div>
        </Grid>
        <Grid>
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