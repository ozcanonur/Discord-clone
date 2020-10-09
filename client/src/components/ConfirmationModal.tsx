import React from 'react';
import makeStyles from '@material-ui/core/styles/makeStyles';
import Modal from '@material-ui/core/Modal';
import Backdrop from '@material-ui/core/Backdrop';
import Slide from '@material-ui/core/Slide';
import Button from '@material-ui/core/Button';

import confirmationModalStyles from './styles/confirmationModal';

const useStyles = makeStyles(confirmationModalStyles);

interface Props {
  modalOpen: boolean;
  setModalOpen: (x: boolean) => void;
  itemName: string;
  confirmAction: (x: any) => void;
}

const ConfirmationModal = ({ modalOpen, setModalOpen, itemName, confirmAction }: Props) => {
  const classes = useStyles();

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
          <div className={classes.warningTextContainer}>
            <span className={classes.warningText}>Are you sure you want to delete</span>
            <span className={classes.warningItem}>{`${itemName}?`}</span>
          </div>
          <div className={classes.buttons}>
            <Button
              variant='contained'
              className={classes.cancelButton}
              onClick={() => setModalOpen(false)}
            >
              Cancel
            </Button>
            <Button variant='contained' className={classes.confirmButton} onClick={confirmAction}>
              Yes, I am sure
            </Button>
          </div>
        </div>
      </Slide>
    </Modal>
  );
};

export default ConfirmationModal;
