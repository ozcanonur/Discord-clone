const serverCreateModalStyles = {
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
    fontFamily: 'Lato, sans-serif',
    color: 'rgb(79, 86, 96)',
  },
  modalFooter: {
    display: 'flex',
    justifyContent: 'space-between',
    width: '100%',
    marginTop: '2rem',
  },
  modalButton: {
    fontSize: '1.5rem',
    fontWeight: 700,
    fontFamily: 'Lato, sans-serif',
    backgroundColor: '#7289da',
    color: 'white',
    padding: '1rem 3rem',
    transition: 'all .2s ease-in-out',

    '&:hover': {
      backgroundColor: '#5869a8',
    },
  },
  serverContainer: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    padding: '1rem',
    cursor: 'pointer',
    borderLeft: (isSelected) => (isSelected ? '3px solid white' : 'none'),
  },
  server: {
    backgroundColor: (isSelected) => (isSelected ? 'rgb(114,137,218)' : 'rgb(54,57,63)'),
    borderRadius: '50%',
    width: '10rem',
    height: '10rem',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    fontSize: '1.6rem',
    fontWeight: 1000,
    textAlign: 'center',
    color: 'rgb(220,221,222)',
    letterSpacing: '1.5px',
    transition: 'all .2s ease-in-out',

    '& > svg': {
      fontSize: '3rem',
      color: '#3CB371',
    },

    '&:hover': {
      backgroundColor: 'rgb(114,137,218)',
      borderRadius: '40%',

      '& > *': {
        color: 'white',
      },
    },

    '&:active': {
      transform: 'translateY(2px)',
    },
  },
};

export default serverCreateModalStyles;
