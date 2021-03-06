import React from 'react';
import makeStyles from '@material-ui/core/styles/makeStyles';
import Zoom from '@material-ui/core/Zoom';
import IconButton from '@material-ui/core/IconButton';
import Tooltip from '@material-ui/core/Tooltip';

import buttonStyles from './styles/button';

const useStyles = makeStyles(buttonStyles);

interface Props {
  children: React.ReactNode | string;
  onClick?: () => void;
  style?: any;
  tooltipText?: any;
  marginRight?: boolean;
}

const Button = ({ children, onClick, style, tooltipText = '', marginRight }: Props) => {
  const classes = useStyles();

  const margin = marginRight ? '2.4rem' : 'inherit';

  return (
    <Tooltip
      enterDelay={0}
      title={tooltipText}
      TransitionComponent={Zoom}
      classes={{ tooltip: classes.notificationTooltip }}
    >
      <div style={{ marginRight: margin }}>
        <IconButton className={classes.button} onClick={onClick} style={{ ...style }}>
          {children}
        </IconButton>
      </div>
    </Tooltip>
  );
};

export default Button;
