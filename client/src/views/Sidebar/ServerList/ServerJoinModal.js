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
import serverJoinModalStyles from './styles/serverJoinModal';

const useStyles = makeStyles(serverJoinModalStyles);

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
