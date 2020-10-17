/* eslint-disable no-console */
import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { NavLink } from 'react-router-dom';
import axios from 'axios';
import makeStyles from '@material-ui/core/styles/makeStyles';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';

import { ReactComponent as DiscordIcon } from '../../assets/discordIcon.svg';
import {
  selectPrivateChannel,
  selectPrivateUser,
  selectTabInPrivate,
  addPinNotification,
  selectServerName,
} from '../../actions/react';
import {
  joinServer,
  selectPrivateChannel as selectPrivateChannelIo,
  connectNewPrivateUser,
  sendFriendRequest,
} from '../../actions/socket';
import userTooltipStyles from './styles/userTooltip';

const useStyles = makeStyles(userTooltipStyles);

interface Props {
  name: string;
  positionTop: boolean;
  style?: any;
}

const UserTooltip = ({ name, positionTop, style }: Props) => {
  const classes = useStyles();

  const user = useSelector((state: RootState) => state.user);
  const id = user.id;
  const [inputValue, setInputValue] = useState('');
  const [userServers, setUserServers] = useState<string[]>([]);
  const [userNote, setUserNote] = useState('');

  useEffect(() => {
    let mounted = true;

    Promise.all([
      axios.get('/userServers', {
        params: { name },
      }),
      axios.get('/note', {
        params: { name: user.name, otherUserName: name },
      }),
    ])
      .then(([serverResults, noteResults]) => {
        if (mounted) {
          setUserServers(serverResults.data);
          setUserNote(noteResults.data);
        }
      })
      .catch((err) => console.log(err));

    return function cleanUp() {
      mounted = false;
    };
  }, [user.name, name]);

  const dispatch = useDispatch();
  const joinServerOnClick = async (serverName: string) => {
    dispatch(joinServer(serverName));
    dispatch(selectServerName(serverName));

    const response = await axios.get('/channelIds', {
      params: { serverName },
    });

    response.data.forEach((id: string) => {
      dispatch(addPinNotification('pin', id));
    });
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
        .catch((err) => console.log(err));
    }
  };

  const privateMessageOnClick = () => {
    dispatch(connectNewPrivateUser(name));
    dispatch(selectTabInPrivate('Chat'));
    dispatch(selectPrivateUser(name));
    dispatch(selectPrivateChannel(name));
    dispatch(selectPrivateChannelIo(name));
  };

  const addFriendOnClick = () => {
    dispatch(sendFriendRequest(name));
  };

  return (
    <div className={classes.container} style={{ bottom: positionTop ? 'inherit' : 0, ...style }}>
      <div className={classes.header}>
        <div className={classes.headerImg}>
          <div style={{ display: 'flex', position: 'relative' }}>
            <DiscordIcon style={{ height: '4rem' }} />
          </div>
        </div>
        <div className={classes.headerText}>{`${name} #${
          id ? id.slice(-5).toUpperCase() : ''
        }`}</div>
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
        {name !== user.name ? (
          <div className={classes.buttons}>
            <Button
              variant='contained'
              className={classes.buttonPrivate}
              onClick={addFriendOnClick}
            >
              Add friend
            </Button>
            <NavLink to='/private' style={{ textDecoration: 'none' }}>
              <Button
                variant='contained'
                className={classes.buttonPrivate}
                onClick={privateMessageOnClick}
              >
                Message
              </Button>
            </NavLink>
          </div>
        ) : null}
      </div>
    </div>
  );
};

export default UserTooltip;
