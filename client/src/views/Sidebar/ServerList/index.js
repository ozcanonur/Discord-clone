import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import makeStyles from '@material-ui/core/styles/makeStyles';
import Add from '@material-ui/icons/Add';
import { createServer } from 'redux/actions/socket';
import { selectServer } from 'redux/actions/react';
import ServerIcon from 'components/ServerIcon';
import qs from 'qs';

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

  const { name } = qs.parse(window.location.search, { ignoreQueryPrefix: true });

  const dispatch = useDispatch();
  const selectServerOnClick = (server) => {
    dispatch(selectServer(server));
  };

  const createServerOnClick = () => {
    dispatch(createServer(name, 'Rm'));
  };

  return (
    <div className={classes.serverList}>
      <ServerIcon onClick={createServerOnClick}>
        <Add />
      </ServerIcon>
      {servers.map((server, key) => (
        <ServerIcon key={key} onClick={() => selectServerOnClick(server)}>
          {server.name}
        </ServerIcon>
      ))}
    </div>
  );
};

export default ServerList;
