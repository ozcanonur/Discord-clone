const channelCreateModalStyles = {
  modal: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  modalContainer: {
    backgroundColor: 'rgb(54,57,63)',
    boxShadow: '0 1rem 1rem rgb(0, 0, 0)',
    padding: '2rem',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: '6px',
    outline: 'none',
    width: '50vw',
  },
  modalHeading: {
    fontSize: '1.8rem',
    fontWeight: 1000,
    color: 'white',
    alignSelf: 'flex-start',
    textTransform: 'uppercase',
    letterSpacing: '1px',
    marginTop: '0.8rem',
  },
  modalInputContainer: {
    display: 'flex',
    flexDirection: 'column',
    width: '100%',
    marginTop: '2rem',
  },
  inputLabel: {
    fontSize: '1.2rem',
    color: 'white',
    fontWeight: 500,
    textTransform: 'uppercase',
    opacity: 0.6,
  },
  input: {
    marginTop: '1rem',

    '& .Mui-focused': {
      color: 'rgb(220,221,222)',
    },
  },
  inputProps: {
    fontSize: '1.3rem',
    fontWeight: 500,
    color: 'white',
    opacity: 0.9,
    fontFamily: 'Lato, sans-serif',
  },
  modalFooter: {
    display: 'flex',
    justifyContent: 'space-between',
    width: '100%',
    marginTop: '2rem',
  },
  modalButton: {
    fontSize: '1.2rem',
    fontWeight: 500,
    backgroundColor: '#7289da',
    color: 'white',
    padding: '1rem 3rem',
    transition: 'all .2s ease-in-out',

    '&:hover': {
      backgroundColor: '#677bc4',
    },
  },
};

export default channelCreateModalStyles;
