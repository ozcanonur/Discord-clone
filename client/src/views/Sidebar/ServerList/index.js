import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import makeStyles from '@material-ui/core/styles/makeStyles';
import Add from '@material-ui/icons/Add';
import { createRoom } from 'redux/actions/index';

import ServerIcon from 'components/ServerIcon';

const useStyles = makeStyles({
  serverList: {
    height: '100vh',
    backgroundColor: 'rgb(32,34,37)',
    color: 'white',
    fontSize: '2rem',
    overflow: 'hidden',
    padding: '0.8rem',
  },
  roomText: {
    fontSize: '1rem',
  },
});

const ServerList = () => {
  const classes = useStyles();

  const rooms = useSelector((state) => state.rooms);

  const dispatch = useDispatch();
  const createRoomOnClick = () => {
    dispatch(createRoom('Rm'));
  };

  return (
    <div className={classes.serverList}>
      <ServerIcon>
        <Add onClick={createRoomOnClick} />
      </ServerIcon>
      {rooms.map((room, key) => (
        <ServerIcon key={key}>{room}</ServerIcon>
      ))}
    </div>
  );
};

export default ServerList;
