const serverIconStyles = () => {
  return {
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
      width: '5rem',
      height: '5rem',
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
};

export default serverIconStyles;
