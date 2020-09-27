import React from 'react';
import makeStyles from '@material-ui/core/styles/makeStyles';

const useStyles = makeStyles({
  messages: {
    flexGrow: 1,
  },
});

const Messages = () => {
  const classes = useStyles();

  return <div className={classes.messages}>Messages</div>;
};

export default Messages;
