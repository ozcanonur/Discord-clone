/* eslint-disable no-param-reassign */
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import makeStyles from '@material-ui/core/styles/makeStyles';
import Modal from '@material-ui/core/Modal';
import Backdrop from '@material-ui/core/Backdrop';
import Slide from '@material-ui/core/Slide';
import TextField from '@material-ui/core/TextField';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import _ from 'lodash';

const useStyles = makeStyles({
  modal: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  modalContainer: {
    backgroundColor: 'rgb(54,57,63)',
    boxShadow: '0 1rem 1rem rgb(0, 0, 0)',
    padding: '2rem',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: '6px',
    outline: 'none',
    width: '50vw',
  },
  input: {
    backgroundColor: 'rgb(114,118, 125)',
    borderRadius: '1rem',
    boxShadow: '0 1rem 1rem rgba(0, 0, 0, 0.2)',

    '& fieldset': {
      border: 'none',
    },

    '& .Mui-focused': {
      color: 'rgb(220,221,222)',
    },
  },
  inputProps: {
    fontSize: '2rem',
    color: 'rgb(220,221,222)',
    fontFamily: 'Lato, sans-serif',
  },
  footer: {
    paddingTop: '2rem',
    color: 'rgb(220,221,222)',
    borderTop: '1px solid rgba(220,221,222, 0.1)',
    fontSize: '1.3rem',
    fontWeight: 700,
    textAlign: 'start',
    width: '100%',
  },
  protip: {
    color: 'rgb(67,181,129)',
    textTransform: 'uppercase',
    fontWeight: 1000,
  },
  footerText: {
    marginLeft: '0.5rem',
    letterSpacing: 0,
  },
  prefix: {
    color: 'rgb(67,181,129)',
    fontWeight: 1000,
    opacity: 1,
    marginLeft: '0.5rem',
    marginRight: '0.5rem',
  },
  results: {
    width: '100%',
  },
  result: {
    display: 'flex',
    justifyContent: 'space-between',
    padding: '1rem 1rem',
    color: 'rgb(220,221,222)',
    fontSize: '1.5rem',
    fontFamily: 'Lato, sans-serif',
    fontWeight: 700,
    cursor: 'pointer',

    '&:hover': {
      backgroundColor: 'rgb(64, 67, 74)',
    },
  },
  resultText: {
    opacity: 0.8,
  },
  resultSecondaryText: {
    opacity: 0.5,
  },
  noResults: {
    height: '6vh',
    color: 'rgb(220,221,222)',
    fontSize: '1.8rem',
    fontWeight: 700,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
});

const DirectionsModal = ({ modalOpen, setModalOpen }) => {
  const classes = useStyles();

  const [inputText, setInputText] = useState('');
  const [searchResults, setSearchResults] = useState([]);

  const searchAndSetResults = (text) => {
    if (text.length === 0) {
      setSearchResults([]);
      return;
    }

    const hasPrefix = ['#', '@', '*'].some((e) => text.includes(e));
    let params;
    if (hasPrefix) {
      const type = text.charAt(0);
      text = text.slice(1);
      params = { type, text };
    } else params = { type: '*', text };

    axios
      .get('/search', {
        params,
      })
      .then((res) => {
        setSearchResults(res.data);
      })
      .catch((error) => console.log(error));
  };

  // Throttle the search
  const debounceHandleUpdate = _.debounce((input) => searchAndSetResults(input), 250, {
    maxWait: 250,
  });

  useEffect(() => {
    debounceHandleUpdate(inputText);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [inputText]);

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
                <ListItem key={key} disableGutters className={classes.result}>
                  <div className={classes.resultText}>{`${res.type} ${res.first}`}</div>
                  <div className={classes.resultSecondaryText}>{res.second}</div>
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

export default DirectionsModal;
