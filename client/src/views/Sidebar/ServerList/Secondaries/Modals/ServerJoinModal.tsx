import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import makeStyles from '@material-ui/core/styles/makeStyles';
import Modal from '@material-ui/core/Modal';
import Backdrop from '@material-ui/core/Backdrop';
import Slide from '@material-ui/core/Slide';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import qs from 'qs';

import { clearIoResponse } from '../../../../../actions/react';
import { joinServer } from '../../../../../actions/socket';
import serverJoinModalStyles from '../../styles/serverJoinModal';

const useStyles = makeStyles(serverJoinModalStyles);

interface Props {
  modalOpen: boolean;
  setModalOpen: (x: boolean) => void;
}

const ServerJoinModal = ({ modalOpen, setModalOpen }: Props) => {
  const classes = useStyles();

  const { name }: any = qs.parse(window.location.search, { ignoreQueryPrefix: true });
  const [modalInputValue, setModalInputValue] = useState('');
  const [error, setError] = useState(false);
  const [errorText, setErrorText] = useState('Perfect!');
  const ioResponse = useSelector((state: RootState) => state.ioResponse);

  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(clearIoResponse());
  }, [dispatch]);

  const handleModalInputChange = (e: any) => {
    setModalInputValue(e.target.value);
    if (e.target.value.trim().length === 0) {
      setErrorText(`Server name can't be empty.`);
      setError(true);
    } else {
      setErrorText(`Perfect!`);
      setError(false);
    }
  };

  const joinServerOnClick = () => {
    if (modalInputValue.trim().length === 0) {
      setErrorText(`Server name can't be empty.`);
      setError(true);
      return;
    }
    setErrorText(`Success! Joined ${modalInputValue}.`);
    dispatch(joinServer(name, modalInputValue));
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
              error={error || ioResponse.error !== undefined}
              helperText={ioResponse.error || errorText}
              FormHelperTextProps={{
                className: error ? classes.helperErrorText : classes.helperText,
              }}
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
