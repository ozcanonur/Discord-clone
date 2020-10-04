import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import makeStyles from '@material-ui/core/styles/makeStyles';
import { createChannel } from 'redux/actions/socket';
import { clearIoResponse } from 'redux/actions/react';
import Modal from '@material-ui/core/Modal';
import Backdrop from '@material-ui/core/Backdrop';
import Slide from '@material-ui/core/Slide';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import channelCreateModalStyles from './styles/channelCreateModal';

const useStyles = makeStyles(channelCreateModalStyles);

const ChannelCreateModal = ({ modalOpen, setModalOpen, selectedServer }) => {
  const classes = useStyles();

  const [modalInputValue, setModalInputValue] = useState('');
  const [error, setError] = useState(false);
  const [errorText, setErrorText] = useState('Perfect!');
  const ioResponse = useSelector((state) => state.ioResponse);

  const dispatch = useDispatch();
  const handleModalInputChange = (e) => {
    setModalInputValue(e.target.value);
    dispatch(clearIoResponse());
    if (e.target.value.length > 10) {
      setErrorText(`Channel name can't be longer than 10 characters.`);
      setError(true);
    } else if (e.target.value.length === 0) {
      setErrorText(`Channel name can't be empty.`);
      setError(true);
    } else {
      setErrorText('Perfect!');
      setError(false);
    }
  };

  // eslint-disable-next-line no-unused-vars
  const createChannelOnClick = (channelName, isVoice) => {
    setErrorText(`Success! ${modalInputValue} created in ${selectedServer.name}.`);
    dispatch(createChannel(selectedServer, channelName, false));
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
              error={error || ioResponse.error}
              helperText={ioResponse.error || errorText}
              FormHelperTextProps={{
                className: error ? classes.helperErrorText : classes.helperText,
              }}
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
              disabled={!!error}
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
