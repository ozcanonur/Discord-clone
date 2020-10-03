import React from 'react';
import makeStyles from '@material-ui/core/styles/makeStyles';
import IconButton from '@material-ui/core/IconButton';
import Tooltip from '@material-ui/core/Tooltip';
import buttonStyles from './styles/button';

const useStyles = makeStyles(buttonStyles);

const Button = ({ children, onClick, style, tooltipText = '', marginRight }) => {
  const classes = useStyles();

  return (
    <Tooltip enterDelay={50} title={tooltipText} classes={{ tooltip: classes.notificationTooltip }}>
      <div style={{ marginRight: marginRight ? '2.4rem' : 'inherit' }}>
        <IconButton className={classes.button} onClick={onClick} style={{ ...style }}>
          {children}
        </IconButton>
      </div>
    </Tooltip>
  );
};

export default Button;
