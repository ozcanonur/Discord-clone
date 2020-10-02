import React from 'react';
import makeStyles from '@material-ui/core/styles/makeStyles';

const useStyles = makeStyles({
  container: {
    display: 'flex',
    alignItems: 'center',
    padding: '1rem 0',
  },
  avatar: {
    backgroundColor: '#3CB371',
    borderRadius: '50%',
    padding: '2rem',
  },
  message: {
    marginLeft: '1rem',
    display: 'flex',
    flexDirection: 'column',
  },
  header: {
    display: 'flex',
    alignItems: 'center',
  },
  username: {
    color: '#FFA200',
    fontWeight: 1000,
  },
  date: {
    marginLeft: '0.5rem',
    fontSize: '1.2rem',
    color: 'rgb(114,118,125)',
  },
  messageText: {
    fontWeight: 500,
    marginTop: '0.5rem',
    color: 'rgb(220,221,222)',
  },
});

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
