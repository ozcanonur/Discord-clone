import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import makeStyles from '@material-ui/core/styles/makeStyles';
import { createChannel } from 'redux/actions/socket';
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
