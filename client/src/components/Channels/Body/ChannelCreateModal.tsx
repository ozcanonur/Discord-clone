import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import makeStyles from '@material-ui/core/styles/makeStyles';
import Modal from '@material-ui/core/Modal';
import Backdrop from '@material-ui/core/Backdrop';
import Slide from '@material-ui/core/Slide';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';

import { createChannel } from '../../../actions/socket';
import { clearIoResponse } from '../../../actions/react';
import channelCreateModalStyles from '../styles/channelCreateModal';

const useStyles = makeStyles(channelCreateModalStyles);

interface Props {
  modalOpen: boolean;
  setModalOpen: (x: boolean) => void;
  selectedServer: Server;
  isVoice: boolean | undefined;
}

const ChannelCreateModal = ({ modalOpen, setModalOpen, selectedServer, isVoice }: Props) => {
  const classes = useStyles();

  const [inputValue, setInputValue] = useState('');
  const [error, setError] = useState(false);
  const [errorText, setErrorText] = useState('Perfect!');
  const ioResponse = useSelector((state: RootState) => state.ioResponse);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(clearIoResponse());
  }, [dispatch, modalOpen]);

  const handleModalInputChange = (value: string) => {
    setInputValue(value);
    dispatch(clearIoResponse());

    if (selectedServer.name === 'Default' || selectedServer.name === 'Games') {
      setErrorText(`Channels can't be created on default servers. Try creating a new server.`);
      setError(true);
    } else if (value.length > 10) {
      setErrorText(`Channel name can't be longer than 10 characters.`);
      setError(true);
    } else if (value.length === 0) {
      setErrorText(`Channel name can't be empty.`);
      setError(true);
    } else if (value.includes('private')) {
      setErrorText(`Channel name can't include "private"`);
      setError(true);
    } else {
      setErrorText('Perfect!');
      setError(false);
    }
  };

  // eslint-disable-next-line no-unused-vars
  const createChannelOnClick = () => {
    if (selectedServer.name !== 'Default' && selectedServer.name !== 'Games') {
      setErrorText(`Success! ${inputValue} created in ${selectedServer.name}.`);
      dispatch(createChannel(selectedServer, inputValue, isVoice || false));
      setInputValue('');
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
          <div className={classes.modalHeading}>Create channel</div>
          <div className={classes.modalInputContainer}>
            <div className={classes.inputLabel}>Channel name</div>
            <TextField
              className={classes.input}
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
              onClick={createChannelOnClick}
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
