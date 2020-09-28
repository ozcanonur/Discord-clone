import React from 'react';
import makeStyles from '@material-ui/core/styles/makeStyles';
import TextField from '@material-ui/core/TextField';
import InputAdornment from '@material-ui/core/InputAdornment';
import AddCircle from '@material-ui/icons/AddCircle';

const useStyles = makeStyles({
  inputContainer: {
    backgroundColor: 'rgb(64,68,75)',
    display: 'flex',
    fontSize: '1.5rem',
    borderRadius: '1rem',
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
    fontSize: '2rem',
    cursor: 'pointer',
  },
});

const Input = () => {
  const classes = useStyles();

  const handleSubmit = (e) => {
    if (e.which === 13) console.log('Submitted');
  };

  return (
    <TextField
      className={classes.inputContainer}
      placeholder='Message # general'
      variant='outlined'
      fullWidth
      InputLabelProps={{ className: classes.inputLabel }}
      InputProps={{
        className: classes.inputProps,
        startAdornment: (
          <InputAdornment position='start' className={classes.button}>
            <AddCircle className={classes.buttonIcon} />
          </InputAdornment>
        ),
      }}
      onKeyPress={(e) => handleSubmit(e)}
    />
  );
};

export default Input;
