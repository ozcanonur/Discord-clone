/* eslint-disable no-console */
import React, { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { NavLink } from 'react-router-dom';
import axios from 'axios';
import makeStyles from '@material-ui/core/styles/makeStyles';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import AccountCircleRoundedIcon from '@material-ui/icons/AccountCircleRounded';
import qs from 'qs';

import { selectPrivateChannel, selectPrivateUser, selectTabInPrivate } from '../actions/react';
import {
  joinServer,
  selectPrivateChannel as selectPrivateChannelIo,
  connectNewPrivateUser,
} from '../actions/socket';
import userTooltipStyles from './styles/userTooltip';

const useStyles = makeStyles(userTooltipStyles);

interface Props {
  name: string;
  positionTop: boolean;
  style?: any;
}

const UserTooltip = ({ name, positionTop, style }: Props) => {
  const classes = useStyles();

  const user: any = qs.parse(window.location.search, { ignoreQueryPrefix: true });
  const [inputValue, setInputValue] = useState('');
  const [userServers, setUserServers] = useState<string[]>([]);
  const [userNote, setUserNote] = useState('');

  useEffect(() => {
    let mounted = true;

    const fetchServersAndNote = async () => {
      const [serverResults, noteResult]: any = await Promise.all([
        axios.get('/userServers', {
          params: { name },
        }),
        axios.get('/note', {
          params: { name: user.name, otherUserName: name },
        }),
      ]).catch((error) => console.log(error));

      if (mounted) {
        setUserServers(serverResults.data);
        setUserNote(noteResult.data);
      }
    };

    fetchServersAndNote();

    return function cleanUp() {
      mounted = false;
    };
  }, [user.name, name]);

  const dispatch = useDispatch();
  const joinServerOnClick = (serverName: string) => {
    dispatch(joinServer(user.name, serverName));
  };

  const handleSubmit = (e: any) => {
    if (inputValue.trim() === '') return;

    if (e.which === 13 && !e.shiftKey) {
      setInputValue('');
      e.preventDefault();

      const params = { name: user.name, otherUserName: name, note: inputValue };
      axios
        .post('/note', params)
        .then((_res) => {
          setUserNote(inputValue);
        })
        .catch((error) => console.log(error));
    }
  };

  const privateMessageOnClick = () => {
    dispatch(connectNewPrivateUser(user.name, name));
    dispatch(selectTabInPrivate('Chat'));
    dispatch(selectPrivateUser(name));
    dispatch(selectPrivateChannel(name));
    dispatch(selectPrivateChannelIo(user.name, name));
  };

  return (
    <div className={classes.container} style={{ bottom: positionTop ? 'inherit' : 0, ...style }}>
      <div className={classes.header}>
        <div className={classes.headerImg}>
          <AccountCircleRoundedIcon className={classes.img} />
        </div>
        <div className={classes.headerText}>{`${name} #4313`}</div>
      </div>
      <List className={classes.servers}>
        {userServers.map((serverName: string, key) => (
          <ListItem key={key} disableGutters className={classes.server}>
            <div className={classes.serverText}>{serverName}</div>
            <Button
              variant='contained'
              className={classes.button}
              onClick={() => joinServerOnClick(serverName)}
            >
              Join
            </Button>
          </ListItem>
        ))}
      </List>
      <div className={classes.noteContainer}>
        {name !== user.name ? (
          <NavLink to={`/private?name=${user.name}`} style={{ textDecoration: 'none' }}>
            <Button
              variant='contained'
              className={classes.buttonPrivate}
              onClick={privateMessageOnClick}
            >
              Private Message
            </Button>
          </NavLink>
        ) : null}
        <div className={classes.noteTitle}>Note: {userNote}</div>
        <TextField
          multiline
          placeholder='Click to set a note'
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
