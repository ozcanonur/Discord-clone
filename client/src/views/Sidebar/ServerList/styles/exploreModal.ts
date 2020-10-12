import createStyles from '@material-ui/core/styles/createStyles';

const exploreModalStyles = createStyles({
  modal: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  modalContainer: {
    backgroundColor: 'rgb(54,57,63)',
    boxShadow: '0 1rem 1rem rgb(0, 0, 0)',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    borderRadius: '6px',
    outline: 'none',
    maxHeight: '80vh',
    width: '70vw',
  },
  inputContainer: {
    padding: '2rem',
    width: '100%',
  },
  input: {
    backgroundColor: 'rgb(114,118, 125)',
    borderRadius: '1rem',
    boxShadow: '0 1rem 1rem rgba(0, 0, 0, 0.2)',

    '& fieldset': {
      border: 'none',
    },

    '& .Mui-focused': {
      color: 'rgb(220,221,222)',
    },
  },
  inputProps: {
    fontSize: '2rem',
    color: 'rgb(220,221,222)',
    fontFamily: 'Whitney Medium, sans-serif',
  },
  serversContainer: {
    width: '100%',
    padding: '2rem',
    display: 'grid',
    gridGap: '2rem',
    gridTemplateColumns: 'repeat(auto-fill, minmax(248px, 1fr))',
    overflow: 'auto',
    marginBottom: '2rem',
  },
});

export default exploreModalStyles;
