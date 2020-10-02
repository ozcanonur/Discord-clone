import React from 'react';
import makeStyles from '@material-ui/core/styles/makeStyles';
import messageStyles from './styles/message';

const useStyles = makeStyles(messageStyles);

const convertCreatedAt = (date) => {
  // eslint-disable-next-line prefer-const
  let [yyyymmdd, time] = date.split('T');
  [time] = time.split('.');
  time = time.substring(0, time.length - 3);

  if (new Date().toISOString().split('T')[0] === yyyymmdd) yyyymmdd = 'Today';

  return `${yyyymmdd} at ${time}`;
};

const Message = ({ message }) => {
  const classes = useStyles();
  const { user, createdAt } = message;
  const messageText = message.message;

  return (
    <div className={classes.container}>
      <div className={classes.avatar} />
      <div className={classes.message}>
        <div className={classes.header}>
          <div className={classes.username}>{user.name}</div>
          <div className={classes.date}>{convertCreatedAt(createdAt)}</div>
        </div>
        <div className={classes.messageText}>{messageText}</div>
      </div>
    </div>
  );
};

export default Message;
