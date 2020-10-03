const inputStyles = {
  inputContainer: {
    backgroundColor: 'rgb(64,68,75)',
    display: 'flex',
    fontSize: '1.5rem',
    borderRadius: '1rem',
    alignItems: 'center',
    position: 'relative',

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
};

export default inputStyles;
