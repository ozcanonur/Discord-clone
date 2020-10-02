import React from 'react';
import makeStyles from '@material-ui/core/styles/makeStyles';
import IconButton from '@material-ui/core/IconButton';

const useStyles = makeStyles({
  button: {
    color: 'rgb(220,221,222)',
    '& > span > svg': {
      fontSize: '2rem',
    },
  },
});

const Button = ({ children, onClick, style }) => {
  const classes = useStyles();

  return (
    <IconButton className={classes.button} onClick={onClick} style={style}>
      {children}
    </IconButton>
  );
};

export default Button;
