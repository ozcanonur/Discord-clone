import createStyles from '@material-ui/core/styles/createStyles';

const confirmationModalStyles = createStyles({
  modal: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  modalContainer: {
    backgroundColor: '#36393f',
    boxShadow: '0 1rem 1rem #000000',
    padding: '2rem',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: '6px',
    outline: 'none',
  },
  warningTextContainer: {
    width: '100%',
    fontSize: '1.8rem',
    color: '#dcddde',
    fontWeight: 600,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  warningText: {},
  warningItem: {
    marginLeft: '0.5rem',
    color: 'red',
  },
  buttons: {
    width: '100%',
    marginTop: '2rem',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  cancelButton: {
    fontSize: '1.3rem',
    fontFamily: 'Whitney Medium, sans-serif',
    backgroundColor: '#7289da',
    color: 'white',
    padding: '1rem 3rem',
    transition: 'all .2s ease-in-out',
    '&:hover': {
      backgroundColor: '#5869a8',
    },
  },
  confirmButton: {
    fontSize: '1.3rem',
    fontFamily: 'Whitney Medium, sans-serif',
    backgroundColor: 'rgba(210,77,87,0.5)',
    color: 'white',
    padding: '1rem 3rem',
    transition: 'all .2s ease-in-out',
    '&:hover': {
      backgroundColor: 'red',
    },
  },
});

export default confirmationModalStyles;
