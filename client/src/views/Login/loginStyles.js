const loginStyles = (theme) => {
  return {
    container: {
      display: 'flex',
      justifyContent: 'center',
      alignContent: 'center',
    },
    paper: {
      marginTop: theme.spacing(8),
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
    },
    avatar: {
      margin: theme.spacing(1),
      backgroundColor: theme.palette.secondary.main,
    },
    form: {
      width: '100%', // Fix IE 11 issue.
      marginTop: theme.spacing(1),

      '& input': {
        fontSize: '1.5rem',
      },
    },
    submit: {
      margin: theme.spacing(3, 0, 2),
    },
  };
};

export default loginStyles;
