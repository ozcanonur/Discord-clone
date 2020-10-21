import createStyles from '@material-ui/core/styles/createStyles';

const inputStyles = createStyles({
  inputContainer: {
    backgroundColor: '#40444b',
    display: 'flex',
    fontSize: '1.5rem',
    borderRadius: '1rem',
    alignItems: 'center',
    position: 'relative',
    boxShadow: '0 1rem 1rem rgba(0, 0, 0, 0.2)',
    fontFamily: 'Whitney Book Regular, sans-serif',

    '& input': {
      color: '#dcddde',
    },

    '& > label': {
      color: '#dcddde',
      fontSize: '1.5rem',
      opacity: 0.5,
    },

    '& fieldset': {
      border: 'none',
    },

    '& .Mui-focused': {
      color: '#dcddde',
    },

    '& textarea': {
      color: '#dcddde',
    },
  },
  inputLabel: {
    fontSize: '1.6rem',
  },
  inputProps: {
    fontSize: '1.6rem',
    fontFamily: 'Whitney Book Regular, sans-serif',
  },
  button: {
    color: '#dcddde',
  },
  buttonIcon: {
    fontSize: '2rem',
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
    backgroundColor: '#202225',
    padding: '2rem',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  pinFooterButton: {
    fontSize: '1.5rem',
    fontFamily: 'Whitney Medium, sans-serif',
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
  typingContainer: {
    display: 'flex',
    position: 'absolute',
    bottom: '-2.8rem',
    left: '1rem',
    alignItems: 'center',
    fontSize: '1.2rem',
    overflow: 'hidden',
  },
  typingSvg: {
    width: '2.5rem',
    height: '2.5rem',
  },
  typingUser: {
    marginLeft: '0.7rem',
    fontWeight: 1000,
  },
  typingText: {
    marginLeft: '0.4rem',
    fontWeight: 400,
  },
});

export default inputStyles;
