import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import makeStyles from '@material-ui/core/styles/makeStyles';
import Modal from '@material-ui/core/Modal';
import Backdrop from '@material-ui/core/Backdrop';
import Slide from '@material-ui/core/Slide';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import qs from 'qs';
import { joinServer } from 'redux/actions/socket';

const useStyles = makeStyles({
  modal: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  modalContainer: {
    backgroundColor: 'white',
    boxShadow: '0 1rem 1rem rgb(0, 0, 0)',
    padding: '3rem 2rem',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: '6px',
    outline: 'none',
    width: '30vw',
  },
  modalHeading: {
    fontSize: '2.5rem',
    fontWeight: 1000,
    color: 'rgb(54,57,63)',
    marginBottom: '1rem',
  },
  modalSubHeading: {
    fontSize: '1.3rem',
    fontWeight: 400,
    color: 'rgb(79, 86, 96)',
    opacity: 0.8,
    marginBottom: '1rem',
    textAlign: 'center',
  },
  inputLabel: {
    alignSelf: 'flex-start',
    fontSize: '1.6rem',
    fontWeight: 400,
    color: 'rgb(79, 86, 96)',
    opacity: 0.8,
    marginTop: '3rem',
  },
  input: {
    marginTop: '1rem',
  },
  inputProps: {
    fontSize: '1.6rem',
    fontWeight: 500,
    fontFamily: 'Lato, sans-serif',
    color: 'rgb(79, 86, 96)',
  },
  modalFooter: {
    marginTop: '1rem',
    display: 'flex',
    justifyContent: 'space-between',
    width: '100%',
  },
  modalButton: {
    fontSize: '1.5rem',
    fontWeight: 700,
    color: 'white',
    marginTop: '2rem',
    fontFamily: 'Lato, sans-serif',
    backgroundColor: '#7289da',
    padding: '1rem 3rem',

    '&:hover': {
      backgroundColor: '#5869a8',
    },
  },
});

const ServerJoinModal = ({ modalOpen, setModalOpen, setBaseOpen }) => {
  const classes = useStyles();

  const [modalInputValue, setModalInputValue] = useState('');

  const handleModalInputChange = (e) => {
    setModalInputValue(e.target.value);
  };

  const { name } = qs.parse(window.location.search, { ignoreQueryPrefix: true });
  const dispatch = useDispatch();
  const joinServerOnClick = () => {
    dispatch(joinServer(name, modalInputValue));
    setModalOpen(false);
    setBaseOpen(false);
  };

  return (
    <>
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
            <div className={classes.modalHeading}>Join a Server</div>
            <div className={classes.modalSubHeading}>
              Enter a server name below to join an existing server
            </div>
            <div className={classes.inputLabel}>Server name</div>
            <TextField
              className={classes.input}
              variant='outlined'
              fullWidth
              InputProps={{
                className: classes.inputProps,
              }}
              value={modalInputValue}
              onChange={(e) => handleModalInputChange(e)}
            />
            <div className={classes.modalFooter}>
              <Button
                variant='contained'
                className={classes.modalButton}
                onClick={() => setModalOpen(false)}
              >
                Back
              </Button>
              <Button
                variant='contained'
                className={classes.modalButton}
                onClick={joinServerOnClick}
              >
                Join
              </Button>
            </div>
          </div>
        </Slide>
      </Modal>
    </>
  );
};

export default ServerJoinModal;
