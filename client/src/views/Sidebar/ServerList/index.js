import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import makeStyles from '@material-ui/core/styles/makeStyles';
import Add from '@material-ui/icons/Add';
import { createServer, selectServerName } from 'redux/actions/index';

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
});

const ServerList = () => {
  const classes = useStyles();

  const servers = useSelector((state) => state.servers);
  const serverNames = servers.map((server) => server.name);

  const dispatch = useDispatch();
  const createServerOnClick = () => {
    dispatch(createServer('Rm'));
  };

  const selectServerNameOnClick = (serverName) => {
    dispatch(selectServerName(serverName));
  };

  return (
    <div className={classes.serverList}>
      <ServerIcon>
        <Add onClick={createServerOnClick} />
      </ServerIcon>
      {serverNames.map((serverName, key) => (
        <ServerIcon key={key} onClick={() => selectServerNameOnClick(serverName)}>
          {serverName}
        </ServerIcon>
      ))}
    </div>
  );
};

export default ServerList;
