/* eslint-disable no-console */
import React, { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import axios from 'axios';
import makeStyles from '@material-ui/core/styles/makeStyles';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import AccountCircleRoundedIcon from '@material-ui/icons/AccountCircleRounded';
import qs from 'qs';

import { joinServer } from '../actions/socket';
import userTooltipStyles from './styles/userTooltip';

const useStyles = makeStyles(userTooltipStyles);

const UserTooltip = ({ name, positionTop }) => {
  const classes = useStyles();

  const user = qs.parse(window.location.search, { ignoreQueryPrefix: true });
  const [inputValue, setInputValue] = useState('');
  const [userServers, setUserServers] = useState([]);

  useEffect(() => {
    const params = { name };
    axios
      .get('/userServers', {
        params,
      })
      .then((res) => {
        setUserServers(res.data);
      })
      .catch((error) => console.log(error));
  }, [name]);

  const dispatch = useDispatch();
  const joinServerOnClick = (server) => {
    dispatch(joinServer(user.name, server));
  };

  const handleSubmit = (e) => {
    if (e.target.value.trim() === '') return;

    if (e.which === 13 && !e.shiftKey) {
      // dispatch(message(name, e.target.value));
      setInputValue('');
      e.preventDefault();
    }
  };

  return (
    <div className={classes.container} style={{ bottom: positionTop ? 'inherit' : 0 }}>
      <div className={classes.header}>
        <div className={classes.headerImg}>
          <AccountCircleRoundedIcon className={classes.img} />
        </div>
        <div className={classes.headerText}>{`${name} #4313`}</div>
      </div>
      <List className={classes.servers}>
        {userServers.map((server, key) => (
          <ListItem key={key} disableGutters className={classes.server}>
            <div className={classes.serverText}>{server}</div>
            <Button
              variant='contained'
              className={classes.button}
              onClick={() => joinServerOnClick(server)}
            >
              Join
            </Button>
          </ListItem>
        ))}
      </List>
      <div className={classes.noteContainer}>
        <div className={classes.noteTitle}>Note</div>
        <TextField
          multiline
          placeholder='Click to add a note'
          variant='outlined'
          fullWidth
          InputLabelProps={{ className: classes.inputLabel }}
          InputProps={{
            className: classes.inputProps,
          }}
          onKeyPress={(e) => handleSubmit(e)}
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
        />
      </div>
    </div>
  );
};

export default UserTooltip;
