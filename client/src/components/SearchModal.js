/* eslint-disable no-console */
/* eslint-disable no-underscore-dangle */
/* eslint-disable no-param-reassign */
import React, { useState, useEffect } from 'react';
import { useHistory, useLocation } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import axios from 'axios';
import makeStyles from '@material-ui/core/styles/makeStyles';
import Modal from '@material-ui/core/Modal';
import Backdrop from '@material-ui/core/Backdrop';
import Slide from '@material-ui/core/Slide';
import TextField from '@material-ui/core/TextField';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import qs from 'qs';

import searchModalStyles from './styles/searchModal';
import { store } from '../store';
import {
  selectChannel,
  selectServerName,
  selectFriendChannel,
  selectFriend,
  selectTabInPrivate,
} from '../actions/react';
import {
  selectChannel as selectChannelIo,
  selectFriendChannel as selectFriendChannelIo,
} from '../actions/socket';

const useStyles = makeStyles(searchModalStyles);

const SearchModal = ({ modalOpen, setModalOpen }) => {
  const classes = useStyles();

  const { name } = qs.parse(window.location.search, { ignoreQueryPrefix: true });
  const [inputText, setInputText] = useState('');
  const [searchResults, setSearchResults] = useState([]);

  useEffect(() => {
    const search = async () => {
      if (inputText.length === 0) {
        setSearchResults([]);
        return;
      }

      const hasPrefix = ['#', '@', '*'].some((e) => inputText.includes(e));
      let params;
      if (hasPrefix) {
        const type = inputText.charAt(0);
        params = { name, type, text: inputText.slice(1) };
      } else params = { name, type: '*', text: inputText };

      axios
        .get('/search', {
          params,
        })
        .then((res) => {
          setSearchResults(res.data);
        })
        .catch((error) => console.log(error));
    };

    // Throttle Api requests
    const timeoutId = setTimeout(() => {
      if (inputText) search();
    }, 200);

    return () => {
      clearTimeout(timeoutId);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [inputText]);

  // To redirect to another page
  const history = useHistory();
  const location = useLocation();
  const { servers } = store.getState();
  const dispatch = useDispatch();

  const redirectOnClick = (type, id, resultName) => {
    if (type === '#') {
      // Find the channel and server
      // And dispatch to switch to them
      let channel;
      let server;
      let found = false;
      for (let i = 0; i < servers.length; i += 1) {
        const s = servers[i];
        for (let j = 0; j < s.channels.length; j += 1) {
          const c = s.channels[j];
          if (c._id === id) {
            channel = c;
            server = s;
            found = true;
            break;
          }
          if (found) break;
        }
      }

      dispatch(selectServerName(server.name));
      dispatch(selectChannel(channel));
      dispatch(selectChannelIo(name, channel));
      setModalOpen(false);

      // Redirect to main route if not already
      if (location.pathname !== '/main') history.push(`/main?name=${name}`);
    } else if (type === '@') {
      // resultName = friendName in this case
      dispatch(selectFriendChannel(name, resultName));
      dispatch(selectFriendChannel(resultName));
      dispatch(selectFriendChannelIo(name, resultName));
      dispatch(selectFriend(resultName));
      dispatch(selectTabInPrivate('Chat'));
      setModalOpen(false);

      // Redirect to main route if not already
      if (location.pathname !== '/private') history.push(`/private?name=${name}`);
    }
  };

  return (
    <Modal
      className={classes.modal}
      open={modalOpen}
      onClose={() => setModalOpen(false)}
      closeAfterTransition
      BackdropComponent={Backdrop}
      BackdropProps={{
        timeout: 500,
      }}
    >
      <Slide in={modalOpen} direction='down'>
        <div className={classes.modalContainer}>
          <TextField
            className={classes.input}
            placeholder='Where would you like to go?'
            variant='outlined'
            fullWidth
            InputProps={{
              className: classes.inputProps,
            }}
            value={inputText}
            onChange={(e) => setInputText(e.target.value)}
          />
          {inputText.length > 0 && searchResults.length === 0 ? (
            <div className={classes.noResults}>
              <div>No results</div>
            </div>
          ) : (
            <List className={classes.results}>
              {searchResults.map((res, key) => (
                <ListItem
                  key={key}
                  disableGutters
                  className={classes.result}
                  onClick={() => redirectOnClick(res.type, res.id, res.name)}
                >
                  <div className={classes.resultText}>{`${res.type} ${res.name}`}</div>
                  <div className={classes.resultSecondaryText}>
                    {res.type === '@' ? 'Friend' : res.server}
                  </div>
                </ListItem>
              ))}
            </List>
          )}
          <div className={classes.footer}>
            <span className={classes.protip}>Protip:</span>
            <span className={classes.footerText}>
              Start searches with
              <span className={classes.prefix}>@ (for friends)</span>
              or
              <span className={classes.prefix}># (for channels)</span>
              or
              <span className={classes.prefix}>&#8903; (to see everything)</span>
              to narrow results.
            </span>
          </div>
        </div>
      </Slide>
    </Modal>
  );
};

export default SearchModal;
