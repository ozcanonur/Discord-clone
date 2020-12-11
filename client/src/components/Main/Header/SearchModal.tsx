/* eslint-disable no-console */
/* eslint-disable no-underscore-dangle */
/* eslint-disable no-param-reassign */
import React, { useState, useEffect } from 'react';
import { useHistory, useLocation } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import axios from 'axios';
import makeStyles from '@material-ui/core/styles/makeStyles';
import Modal from '@material-ui/core/Modal';
import Backdrop from '@material-ui/core/Backdrop';
import Slide from '@material-ui/core/Slide';
import TextField from '@material-ui/core/TextField';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';

import { selectChannel, selectServerName, selectPrivateChannel, selectPrivateUser, selectTabInPrivate } from 'actions/react';
import { selectChannel as selectChannelIo, selectPrivateChannel as selectPrivateChannelIo, connectNewPrivateUser } from 'actions/socket';
import searchModalStyles from '../styles/searchModal';

const useStyles = makeStyles(searchModalStyles);

interface SearchResult {
  name: string;
  server: string;
  type: string;
  id: string;
}

interface Props {
  modalOpen: boolean;
  setModalOpen: (x: boolean) => void;
}

const SearchModal = ({ modalOpen, setModalOpen }: Props) => {
  const classes = useStyles();

  const { name } = useSelector((state: RootState) => state.user);
  const [inputText, setInputText] = useState('');
  const [searchResults, setSearchResults] = useState<SearchResult[]>([]);
  const servers = useSelector((state: RootState) => state.servers);

  useEffect(() => {
    let mounted = true;
    // Throttle Api requests
    const timeoutId = setTimeout(() => {
      if (inputText) {
        if (inputText.length === 0) {
          if (mounted) setSearchResults([]);
          return;
        }

        const hasPrefix = ['#', '@', '*'].some((e: string) => inputText.includes(e));
        let params;
        if (hasPrefix) {
          const type = inputText.charAt(0);
          params = { name, type, text: inputText.slice(1) };
        } else params = { name, type: '*', text: inputText };

        axios
          .get('/search', {
            params,
            withCredentials: true,
          })
          .then((res) => {
            if (mounted) setSearchResults(res.data);
          })
          .catch((err) => console.log(err));
      }
    }, 100);

    return function cleanUp() {
      clearTimeout(timeoutId);
      mounted = false;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [inputText]);

  // To redirect to another page
  const history = useHistory();
  const location = useLocation();
  const dispatch = useDispatch();
  const redirectOnClick = (type: string, id: string, resultName: string) => {
    if (type === '#') {
      // Find the channel and server
      // And dispatch to switch to them
      let channel: Channel | null = null;
      let server: Server | null = null;
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

      if (!(channel && server)) return;

      dispatch(selectServerName(server.name));
      dispatch(selectChannel(channel));
      dispatch(selectChannelIo(channel));
      setModalOpen(false);

      // Redirect to main route if not already
      if (location.pathname !== '/main') history.push('/main');
    } else if (type === '@') {
      // resultName = username in this case
      dispatch(connectNewPrivateUser(resultName));
      dispatch(selectPrivateChannel(resultName));
      dispatch(selectPrivateChannelIo(resultName));
      dispatch(selectPrivateUser(resultName));
      dispatch(selectTabInPrivate('Chat'));
      setModalOpen(false);

      // Redirect to private route if not already
      if (location.pathname !== '/private') history.push('/private');
    }
  };

  const closeModal = () => {
    setModalOpen(false);
  };

  return (
    <Modal
      className={classes.modal}
      open={modalOpen}
      onClose={closeModal}
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
              {searchResults.map((res: SearchResult, key) => (
                <ListItem key={key} disableGutters className={classes.result} onClick={() => redirectOnClick(res.type, res.id, res.name)}>
                  <div className={classes.resultText}>{`${res.type} ${res.name}`}</div>
                  <div className={classes.resultSecondaryText}>{res.type === '@' ? 'User' : res.server}</div>
                </ListItem>
              ))}
            </List>
          )}
          <div className={classes.footer}>
            <span className={classes.protip}>Protip:</span>
            <span className={classes.footerText}>
              Start searches with
              <span className={classes.prefix}>@ (for users)</span>
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
