/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
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
  addPinNotifications,
  selectServerName,
  selectChannel,
} from '../../actions/react';
import {
  joinServer,
  selectPrivateChannel as selectPrivateChannelIo,
  connectNewPrivateUser,
  addFriend,
} from '../../actions/socket';
import userTooltipStyles from './styles/userTooltip';

const useStyles = makeStyles(userTooltipStyles);

interface Props {
  name: string;
  style?: any;
}

const UserTooltip = ({ name, style }: Props) => {
  const classes = useStyles();

  const user = useSelector((state: RootState) => state.user);
  const [inputValue, setInputValue] = useState('');
  const [userServers, setUserServers] = useState<string[]>([]);
  const [userNote, setUserNote] = useState('');

  const getServers = async () => {
    return await axios.get('/userServers', { params: { name }, withCredentials: true });
  };

  const getNotes = async () => {
    return await axios.get('/note', {
      params: { name: user.name, otherUserName: name },
      withCredentials: true,
    });
  };

  const getChannelIds = async (serverName: string) => {
    return await axios.get('/channelIds', {
      params: { serverName },
      withCredentials: true,
    });
  };

  useEffect(() => {
    let mounted = true;

    Promise.all([getServers(), getNotes()])
      .then(([serverResults, noteResults]) => {
        if (mounted) {
          setUserServers(serverResults.data);
          setUserNote(noteResults.data);
        }
      })
      .catch((err) => console.error(err));

    return () => {
      mounted = false;
    };
  }, [user, name]);

  const postNote = async () => {
    try {
      return await axios.post(
        '/note',
        { name: user.name, otherUserName: name, note: inputValue },
        { withCredentials: true }
      );
    } catch (err) {
      console.warn(err);
    }
  };

  const handleNoteSubmit = async (e: React.KeyboardEvent) => {
    if (inputValue.trim() === '') return;

    if (e.which === 13 && !e.shiftKey) {
      setInputValue('');
      e.preventDefault();

      setUserNote(inputValue);
      await postNote();
    }
  };

  const dispatch = useDispatch();
  const history = useHistory();

  const joinServerOnClick = async (serverName: string) => {
    dispatch(joinServer(serverName));
    dispatch(selectServerName(serverName));
    dispatch(selectChannel({ _id: '', name: '', isVoice: false, voiceUsers: [] }));

    const response = await getChannelIds(serverName);
    dispatch(addPinNotifications('pin', response.data));
  };

  const privateMessageOnClick = () => {
    dispatch(connectNewPrivateUser(name));
    dispatch(selectTabInPrivate('Chat'));
    dispatch(selectPrivateUser(name));
    dispatch(selectPrivateChannel(name));
    dispatch(selectPrivateChannelIo(name));
    if (history.location.pathname !== '/private') history.push('/private');
  };

  const addFriendOnClick = () => {
    dispatch(addFriend(name));
    setInputValue('');
  };

  return (
    <div className={classes.container} style={{ ...style }}>
      <div className={classes.header}>
        <div className={classes.headerImg}>
          <div className={classes.discordIconContainer}>
            <DiscordIcon className={classes.discordIcon} />
          </div>
        </div>
        <div className={classes.headerText}>{`${name} #${
          user.id ? user.id.slice(-5).toUpperCase() : ''
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
          placeholder='Set note'
          variant='outlined'
          fullWidth
          InputLabelProps={{ className: classes.textFieldLabel }}
          InputProps={{
            className: classes.inputProps,
          }}
          onKeyPress={(e) => handleNoteSubmit(e)}
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
            <Button
              variant='contained'
              className={classes.buttonPrivate}
              onClick={privateMessageOnClick}
            >
              Message
            </Button>
          </div>
        ) : null}
      </div>
    </div>
  );
};

export default UserTooltip;
