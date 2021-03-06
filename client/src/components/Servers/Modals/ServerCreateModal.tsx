import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import makeStyles from '@material-ui/core/styles/makeStyles';
import Modal from '@material-ui/core/Modal';
import Backdrop from '@material-ui/core/Backdrop';
import Slide from '@material-ui/core/Slide';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';

import { clearIoResponse } from 'actions/react';
import { createServer } from 'actions/socket';
import serverCreateModalStyles from '../styles/serverCreateModal';

const useStyles = makeStyles(serverCreateModalStyles);

interface Props {
  modalOpen: boolean;
  setModalOpen: (x: boolean) => void;
}

const ServerCreateModal = ({ modalOpen, setModalOpen }: Props) => {
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
    dispatch(clearIoResponse());
    if (value.split(' ').length > 3) {
      setErrorText(`Server name can't be longer than 4 words.`);
      setError(true);
    } else if (value.trim().length === 0) {
      setErrorText(`Server name can't be empty.`);
      setError(true);
    } else if (value === 'private') {
      setErrorText(`Server name can't be "private"`);
      setError(true);
    } else {
      setErrorText('Perfect!');
      setError(false);
    }
  };

  const createServerOnClick = () => {
    setErrorText(`Success! ${inputValue} created.`);
    dispatch(createServer(inputValue));
    setInputValue('');
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
          <div className={classes.modalHeading}>Customize your server</div>
          <div className={classes.modalSubHeading}>
            Give your server a personality with a name and an icon.
          </div>
          <div className={classes.modalSubHeading} style={{ marginBottom: '0.2rem' }}>
            You can always change it later.
          </div>
          <div className={classes.textFieldContainer}>
            <div className={classes.textFieldLabel}>Server name</div>
            <TextField
              className={classes.textField}
              variant='outlined'
              fullWidth
              InputProps={{
                className: classes.inputProps,
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
            <Button variant='contained' className={classes.modalButton} onClick={closeModal}>
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
