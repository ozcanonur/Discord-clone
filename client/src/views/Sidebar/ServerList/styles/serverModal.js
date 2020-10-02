const serverModal = {
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
};

export default serverModal;
