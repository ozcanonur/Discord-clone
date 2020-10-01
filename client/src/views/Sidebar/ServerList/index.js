import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import makeStyles from '@material-ui/core/styles/makeStyles';
import Add from '@material-ui/icons/Add';
import { selectServerName } from 'redux/actions/react';
import ServerIcon from 'components/ServerIcon';
import ServerCreateModal from './ServerCreateModal';

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

  const [modalOpen, setModalOpen] = useState(false);

  const servers = useSelector((state) => state.servers);

  const dispatch = useDispatch();
  const selectServerOnClick = (serverName) => {
    dispatch(selectServerName(serverName));
  };

  return (
    <>
      <div className={classes.serverList}>
        <ServerIcon onClick={() => setModalOpen(true)}>
          <Add />
        </ServerIcon>
        {servers.map((server, key) => (
          <ServerIcon key={key} onClick={() => selectServerOnClick(server.name)}>
            {server.name}
          </ServerIcon>
        ))}
      </div>
      <ServerCreateModal modalOpen={modalOpen} setModalOpen={setModalOpen} />
    </>
  );
};

export default ServerList;
