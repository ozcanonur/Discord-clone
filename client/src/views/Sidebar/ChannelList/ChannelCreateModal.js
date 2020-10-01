import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import makeStyles from '@material-ui/core/styles/makeStyles';
import { createChannel } from 'redux/actions/socket';
import Modal from '@material-ui/core/Modal';
import Backdrop from '@material-ui/core/Backdrop';
import Slide from '@material-ui/core/Slide';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';

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
    width: '60vh',
  },
  modalHeading: {
    fontSize: '1.8rem',
    fontWeight: 1000,
    color: 'white',
    alignSelf: 'flex-start',
    textTransform: 'uppercase',
    letterSpacing: '1px',
    marginTop: '0.8rem',
  },
  modalInputContainer: {
    display: 'flex',
    flexDirection: 'column',
    width: '100%',
    marginTop: '2rem',
  },
  inputLabel: {
    fontSize: '1.2rem',
    color: 'white',
    fontWeight: 500,
    textTransform: 'uppercase',
    opacity: 0.6,
  },
  input: {
    marginTop: '1rem',
  },
  inputProps: {
    fontSize: '1.3rem',
    fontWeight: 500,
    color: 'white',
    opacity: 0.9,
  },
  modalFooter: {
    display: 'flex',
    justifyContent: 'space-between',
    width: '100%',
    marginTop: '2rem',
  },
  modalButton: {
    fontSize: '1.2rem',
    fontWeight: 500,
    backgroundColor: '#7289da',
    color: 'white',
    padding: '1rem 3rem',

    '&:hover': {
      backgroundColor: '#677bc4',
    },
  },
});

const ChannelCreateModal = ({ modalOpen, setModalOpen, selectedServer }) => {
  const classes = useStyles();

  const [modalInputValue, setModalInputValue] = useState('');

  const handleModalInputChange = (e) => {
    setModalInputValue(e.target.value);
  };

  const dispatch = useDispatch();
  // eslint-disable-next-line no-unused-vars
  const createChannelOnClick = (channelName, isVoice) => {
    dispatch(createChannel(selectedServer, channelName, false));
    setModalOpen(false);
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
          <div className={classes.modalHeading}>Create channel</div>
          <div className={classes.modalInputContainer}>
            <div className={classes.inputLabel}>Channel name</div>
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
          </div>
          <div className={classes.modalFooter}>
            <Button
              variant='contained'
              className={classes.modalButton}
              onClick={() => setModalOpen(false)}
            >
              Cancel
            </Button>
            <Button
              variant='contained'
              className={classes.modalButton}
              onClick={() => createChannelOnClick(modalInputValue)}
            >
              Create Channel
            </Button>
          </div>
        </div>
      </Slide>
    </Modal>
  );
};

export default ChannelCreateModal;
