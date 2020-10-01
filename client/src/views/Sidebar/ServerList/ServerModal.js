import React, { useState } from 'react';
import makeStyles from '@material-ui/core/styles/makeStyles';
import Modal from '@material-ui/core/Modal';
import Backdrop from '@material-ui/core/Backdrop';
import Slide from '@material-ui/core/Slide';
import Button from '@material-ui/core/Button';
import ServerCreateModal from './ServerCreateModal';
import ServerJoinModal from './ServerJoinModal';

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
    width: '30vw',
  },
  modalHeading: {
    fontSize: '2.5rem',
    fontWeight: 1000,
    color: 'rgb(54,57,63)',
    marginBottom: '1rem',
  },
  modalSubHeading: {
    fontSize: '1.6rem',
    fontWeight: 400,
    color: 'rgb(79, 86, 96)',
    opacity: 0.8,
    marginBottom: '1rem',
    textAlign: 'center',
  },
  modalButton: {
    width: '100%',
    fontSize: '1.5rem',
    fontWeight: 700,
    color: 'white',
    marginTop: '2rem',
    fontFamily: 'Lato, sans-serif',
    backgroundColor: 'rgb(79, 86, 96)',

    '&:hover': {
      backgroundColor: 'rgb(54,57,63)',
    },
  },
  hr: {
    height: '1px',
    backgroundColor: 'rgb(54,57,63)',
    width: '100%',
    marginTop: '2rem',
    opacity: 0.5,
  },
  modalSecondaryHeading: {
    fontSize: '1.6rem',
    fontWeight: 400,
    color: 'rgb(79, 86, 96)',
    opacity: 0.8,
    marginTop: '2rem',
  },
  modalButton2: {
    width: '100%',
    fontSize: '1.5rem',
    fontWeight: 500,
    color: 'white',
    marginTop: '2rem',
    backgroundColor: '#7289da',
    fontFamily: 'Lato, sans-serif',

    '&:hover': {
      backgroundColor: '#5869a8',
    },
  },
});

const ServerModal = ({ modalOpen, setModalOpen }) => {
  const classes = useStyles();

  const [createModalServerOpen, setCreateServerModalOpen] = useState(false);
  const [createModalJoinOpen, setCreateModalJoinOpen] = useState(false);

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
            <div className={classes.modalHeading}>Create a server</div>
            <div className={classes.modalSubHeading}>
              Your server is where you and your friends hang out. Make yours and start talking.
            </div>
            <Button
              variant='outlined'
              className={classes.modalButton}
              onClick={() => setCreateServerModalOpen(true)}
            >
              Create My Own
            </Button>
            <hr className={classes.hr} />
            <div className={classes.modalSecondaryHeading}>Know the server name already?</div>
            <Button
              variant='contained'
              className={classes.modalButton2}
              onClick={() => setCreateModalJoinOpen(true)}
            >
              Join a Server
            </Button>
          </div>
        </Slide>
      </Modal>
      <ServerCreateModal
        modalOpen={createModalServerOpen}
        setModalOpen={setCreateServerModalOpen}
        setBaseOpen={setModalOpen}
      />
      <ServerJoinModal
        modalOpen={createModalJoinOpen}
        setModalOpen={setCreateModalJoinOpen}
        setBaseOpen={setModalOpen}
      />
    </>
  );
};

export default ServerModal;
