import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import makeStyles from '@material-ui/core/styles/makeStyles';
import Modal from '@material-ui/core/Modal';
import Backdrop from '@material-ui/core/Backdrop';
import Slide from '@material-ui/core/Slide';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import axios from 'axios';

import { clearIoResponse, addPinNotifications } from '../../../actions/react';
import { joinServer } from '../../../actions/socket';
import serverJoinModalStyles from '../styles/serverJoinModal';

const useStyles = makeStyles(serverJoinModalStyles);

interface Props {
  modalOpen: boolean;
  setModalOpen: (x: boolean) => void;
}

const ServerJoinModal = ({ modalOpen, setModalOpen }: Props) => {
  const classes = useStyles();

  const [inputValue, setInputValue] = useState('');
  const [error, setError] = useState(false);
  const [errorText, setErrorText] = useState('Perfect!');
  const ioResponse = useSelector((state: RootState) => state.ioResponse);

  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(clearIoResponse());
  }, [dispatch, modalOpen]);

  // Validate input
  const handleModalInputChange = (value: string) => {
    setInputValue(value);
    if (value.trim().length === 0) {
      setErrorText(`Server name can't be empty.`);
      setError(true);
    } else {
      setErrorText(`Perfect!`);
      setError(false);
    }
  };

  // Get pin notifications if any exists on the channels
  const getPinNotifications = async () => {
    const response = await axios.get('/channelIds', {
      params: { serverName: inputValue },
      withCredentials: true,
    });

    dispatch(addPinNotifications('pin', response.data));
  };

  const joinServerOnClick = async () => {
    setErrorText(`Success! Joined ${inputValue}.`);
    dispatch(joinServer(inputValue));

    await getPinNotifications();
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
        <div className={classes.subContainer}>
          <div className={classes.modalHeading}>Join a Server</div>
          <div className={classes.modalSubHeading}>
            Enter a server name below to join an existing server
          </div>
          <div className={classes.textFieldLabel}>Server name</div>
          <TextField
            className={classes.textField}
            variant='outlined'
            fullWidth
            InputProps={{
              className: classes.inputProps,
              autoFocus: true,
            }}
            value={inputValue}
            onChange={(e) => handleModalInputChange(e.target.value)}
            error={error || ioResponse.error !== undefined}
            helperText={ioResponse.error || errorText}
            FormHelperTextProps={{
              className: error ? classes.helperErrorText : classes.helperText,
            }}
          />
          <div className={classes.modalFooter}>
            <Button variant='contained' className={classes.modalButton} onClick={closeModal}>
              Back
            </Button>
            <Button
              variant='contained'
              className={classes.modalButton}
              onClick={joinServerOnClick}
              disabled={!!error}
            >
              Join
            </Button>
          </div>
        </div>
      </Slide>
    </Modal>
  );
};

export default ServerJoinModal;
