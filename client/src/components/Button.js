import React from 'react';
import makeStyles from '@material-ui/core/styles/makeStyles';
import IconButton from '@material-ui/core/IconButton';
import buttonStyles from './styles/button';

const useStyles = makeStyles(buttonStyles);

const Button = ({ children, onClick, style }) => {
  const classes = useStyles();

  return (
    <IconButton className={classes.button} onClick={onClick} style={style}>
      {children}
    </IconButton>
  );
};

export default Button;
