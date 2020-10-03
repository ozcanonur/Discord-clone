const activeUserStyles = {
  user: {
    display: 'flex',
    alignItems: 'center',
    marginTop: '1rem',
    cursor: 'pointer',
    padding: '0.8rem',
    transition: 'all .2s ease-in-out',
    '&:hover': {
      backgroundColor: 'rgb(64, 67, 74)',
    },
  },
  iconContainer: {
    backgroundColor: '#3CB371',
    borderRadius: '50%',
    padding: '1.5rem',
    width: '1.5rem',
    height: '1.5rem',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  icon: {
    width: '2.5rem',
    height: '2.5rem',
    color: 'white',
  },
  username: {
    fontSize: '1.5rem',
    marginLeft: '1rem',
    color: 'rgb(220,221,222)',
  },
};

export default activeUserStyles;
