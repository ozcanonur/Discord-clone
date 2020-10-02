import React, { useState } from 'react';
import makeStyles from '@material-ui/core/styles/makeStyles';
import Modal from '@material-ui/core/Modal';
import Backdrop from '@material-ui/core/Backdrop';
import Slide from '@material-ui/core/Slide';
import Button from '@material-ui/core/Button';
import ServerCreateModal from './ServerCreateModal';
import ServerJoinModal from './ServerJoinModal';
import serverModalStyles from './styles/serverModal';

const useStyles = makeStyles(serverModalStyles);

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
