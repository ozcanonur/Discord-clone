import React from 'react';
import makeStyles from '@material-ui/core/styles/makeStyles';

const useStyles = makeStyles({
  channel: {
    display: 'flex',
    alignItems: 'center',
    cursor: 'pointer',
    padding: '1rem 2rem',

    '&:hover': {
      backgroundColor: 'rgb(64, 67, 74)',
    },
  },
  icon: {
    fontSize: '2rem',
  },
  channelName: {
    marginLeft: '1rem',
  },
});

const Channel = ({ channelIcon, channelName }) => {
  const classes = useStyles();

  return (
    <div className={classes.channel}>
      <div className={classes.icon}>{channelIcon}</div>
      <div className={classes.channelName}>{channelName}</div>
    </div>
  );
};

export default Channel;
