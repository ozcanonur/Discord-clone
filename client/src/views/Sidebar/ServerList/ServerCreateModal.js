import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import makeStyles from '@material-ui/core/styles/makeStyles';
import Modal from '@material-ui/core/Modal';
import Backdrop from '@material-ui/core/Backdrop';
import Slide from '@material-ui/core/Slide';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import qs from 'qs';

import { clearIoResponse } from '../../../actions/react';
import { createServer } from '../../../actions/socket';
import serverCreateModalStyles from './styles/serverCreateModal';

const useStyles = makeStyles(serverCreateModalStyles);

const ServerCreateModal = ({ modalOpen, setModalOpen }) => {
  const classes = useStyles();

  const { name } = qs.parse(window.location.search, { ignoreQueryPrefix: true });
  const [modalInputValue, setModalInputValue] = useState(`${name}'s server`);
  const [error, setError] = useState(false);
  const [errorText, setErrorText] = useState('Perfect!');
  const ioResponse = useSelector((state) => state.ioResponse);

  const dispatch = useDispatch();
  const handleModalInputChange = (e) => {
    setModalInputValue(e.target.value);
    dispatch(clearIoResponse());
    if (e.target.value.split(' ').length > 3) {
      setErrorText(`Server name can't be longer than 4 words.`);
      setError(true);
    } else if (e.target.value.trim().length === 0) {
      setErrorText(`Server name can't be empty.`);
      setError(true);
    } else {
      setErrorText('Perfect!');
      setError(false);
    }
  };

  const createServerOnClick = () => {
    setErrorText(`Success! ${modalInputValue} created.`);
    dispatch(createServer(name, modalInputValue));
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
          <div className={classes.modalHeading}>Customize your server</div>
          <div className={classes.modalSubHeading}>
            Give your server a personality with a name and an icon.
          </div>
          <div className={classes.modalSubHeading} style={{ marginBottom: '0.2rem' }}>
            You can always change it later.
          </div>
          <div className={classes.modalIconUpload}>
            <div className={classes.serverContainer}>
              <div className={classes.server}>Icon</div>
            </div>
          </div>
          <div className={classes.modalInputContainer}>
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
              Back
            </Button>
            <Button
              variant='contained'
              className={classes.modalButton}
              onClick={createServerOnClick}
              disabled={!!error}
            >
              Create
            </Button>
          </div>
        </div>
      </Slide>
    </Modal>
  );
};

export default ServerCreateModal;
