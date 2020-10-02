import React from 'react';
import { useSelector } from 'react-redux';
import makeStyles from '@material-ui/core/styles/makeStyles';
import Header from './Header';
import Chat from './Chat';
import ActiveUsers from '../Main/Body/ActiveUsers';
import AddFriendBox from './AddFriendBox';

const useStyles = makeStyles({
  container: {
    display: 'flex',
    flexDirection: 'column',
    height: '100%',
  },
  header: {
    flexGrow: 1,
  },
  chatContainer: {
    backgroundColor: '#36393f',
    color: 'white',
    fontWeight: 1000,
    flexGrow: 1,
    display: 'flex',
    height: 0, // for stopping overflow, needs more work
  },
});

const Main = () => {
  const classes = useStyles();

  const selectedTabInPrivate = useSelector((state) => state.selectedTabInPrivate);

  return (
    <div className={classes.container}>
      <Header className={classes.header} />
      <div className={classes.chatContainer}>
        {selectedTabInPrivate === 'Chat' ? <Chat /> : <AddFriendBox />}
        <ActiveUsers />
      </div>
    </div>
  );
};

export default Main;
