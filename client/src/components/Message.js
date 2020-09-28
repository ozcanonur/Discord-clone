import React from 'react';
import makeStyles from '@material-ui/core/styles/makeStyles';

const useStyles = makeStyles({
  container: {
    display: 'flex',
    alignItems: 'center',
    padding: '1rem 0',
  },
  avatar: {
    display: 'inline-block',
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
    marginLeft: '1rem',
    fontSize: '1.2rem',
    color: 'rgb(114,118,125)',
  },
  messageText: {
    fontWeight: 500,
    marginTop: '0.5rem',
  },
});

const Message = ({ username, text }) => {
  const classes = useStyles();

  return (
    <div className={classes.container}>
      <div className={classes.avatar} />
      <div className={classes.message}>
        <div className={classes.header}>
          <div className={classes.username}>{username}</div>
          <div className={classes.date}>04/09/2020</div>
        </div>
        <div className={classes.messageText}>{text}</div>
      </div>
    </div>
  );
};

export default Message;
