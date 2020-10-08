import createStyles from '@material-ui/core/styles/createStyles';

const inputStyles = createStyles({
  inputContainer: {
    backgroundColor: 'rgb(64,68,75)',
    display: 'flex',
    fontSize: '1.5rem',
    borderRadius: '1rem',
    alignItems: 'center',
    position: 'relative',
    boxShadow: '0 1rem 1rem rgba(0, 0, 0, 0.2)',

    '& input': {
      color: 'rgb(220,221,222)',
    },

    '& > label': {
      color: 'rgb(220,221,222)',
      fontSize: '1.5rem',
      opacity: 0.5,
    },

    '& fieldset': {
      border: 'none',
    },

    '& .Mui-focused': {
      color: 'rgb(220,221,222)',
    },

    '& textarea': {
      color: 'rgb(220,221,222)',
    },
  },
  inputLabel: {
    fontSize: '1.6rem',
  },
  inputProps: {
    fontSize: '1.6rem',
  },
  button: {
    color: 'rgb(220,221,222)',
  },
  buttonIcon: {
    fontSize: '3rem',
    cursor: 'pointer',
    transition: 'all .2s',
    '&:hover': {
      transform: 'scale(1.2)',
      color: '#3CB371',
    },
  },
  emojiMenuIcon: {
    fontSize: '3rem',
    marginRight: '1rem',
    cursor: 'pointer',
    transition: 'all .2s',

    '&:hover': {
      transform: 'scale(1.2)',
      color: '#3CB371',
    },
  },
  emojiMenu: {
    position: 'absolute',
    bottom: '6rem',
    right: 0,
  },
  pinnedInputProps: {
    width: '30vw',
  },
  pinFooter: {
    backgroundColor: 'rgb(32,34,37)',
    padding: '2rem',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  pinFooterButton: {
    fontSize: '1.4rem',
    fontWeight: 700,
    fontFamily: 'Lato, sans-serif',
    backgroundColor: '#7289da',
    color: 'white',
    padding: '0.5rem 2.5rem',
    transition: 'all .2s ease-in-out',

    '&:hover': {
      backgroundColor: '#5869a8',
    },

    '& span': {
      minWidth: '10rem',
    },
  },
});

export default inputStyles;
