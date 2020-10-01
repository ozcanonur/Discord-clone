import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import makeStyles from '@material-ui/core/styles/makeStyles';
import { createServer } from 'redux/actions/socket';
import ServerIcon from 'components/ServerIcon';
import qs from 'qs';
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
    backgroundColor: 'white',
    boxShadow: '0 1rem 1rem rgb(0, 0, 0)',
    padding: '2rem',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: '6px',
    outline: 'none',
  },
  modalHeading: {
    fontSize: '2.5rem',
    fontWeight: 1000,
    color: 'rgb(6,6,7)',
    marginBottom: '1rem',
  },
  modalSubHeading: {
    fontSize: '1.6rem',
    fontWeight: 400,
    color: 'rgb(79, 86, 96)',
    opacity: 0.8,
  },
  modalIconUpload: {
    color: 'white',
    marginTop: '1rem',
  },
  modalInputContainer: {
    display: 'flex',
    flexDirection: 'column',
    width: '100%',
  },
  inputLabel: {
    fontSize: '1.3rem',
    color: 'rgb(79, 86, 96)',
    fontWeight: 900,
    textTransform: 'uppercase',
    opacity: 0.8,
  },
  input: {
    marginTop: '1rem',
  },
  inputProps: {
    fontSize: '1.3rem',
    fontWeight: 500,
    color: 'rgb(79, 86, 96)',
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

const ServerCreateModal = ({ modalOpen, setModalOpen }) => {
  const classes = useStyles();

  const { name } = qs.parse(window.location.search, { ignoreQueryPrefix: true });
  const [modalInputValue, setModalInputValue] = useState(`${name}'s server`);

  const handleModalInputChange = (e) => {
    setModalInputValue(e.target.value);
  };

  const dispatch = useDispatch();
  const createServerOnClick = () => {
    dispatch(createServer(name, modalInputValue));
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
          <div className={classes.modalHeading}>Customize your server</div>
          <div className={classes.modalSubHeading}>
            Give your server a personality with a name and an icon.
          </div>
          <div className={classes.modalSubHeading} style={{ marginBottom: '0.2rem' }}>
            You can always change it later.
          </div>
          <div className={classes.modalIconUpload}>
            <ServerIcon style={{ height: '10rem', width: '10rem' }}>Icon</ServerIcon>
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
