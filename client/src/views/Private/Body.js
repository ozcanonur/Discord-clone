import React from 'react';
import { useSelector } from 'react-redux';
import makeStyles from '@material-ui/core/styles/makeStyles';
import Header from './Header';
import Chat from './Chat';
import ActiveUsers from '../Main/ActiveUsers';
import AddFriendBox from './AddFriendBox';
import bodyStyles from './styles/body';

const useStyles = makeStyles(bodyStyles);

const Main = () => {
  const classes = useStyles();

  const selectedTabInPrivate = useSelector((state) => state.selectedTabInPrivate);
  const activeUsersOpen = useSelector((state) => state.activeUsersOpen);

  return (
    <div className={classes.container}>
      <Header className={classes.header} />
      <div className={classes.chatContainer}>
        {selectedTabInPrivate === 'Chat' ? <Chat /> : <AddFriendBox />}
        {activeUsersOpen ? <ActiveUsers /> : null}
      </div>
    </div>
  );
};

export default Main;
