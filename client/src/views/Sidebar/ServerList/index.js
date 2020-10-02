import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import makeStyles from '@material-ui/core/styles/makeStyles';
import Tooltip from '@material-ui/core/Tooltip';
import qs from 'qs';
import Add from '@material-ui/icons/Add';
import PeopleAlt from '@material-ui/icons/PeopleAlt';
import { selectServerName, selectFriend } from 'redux/actions/react';
import ServerIcon from 'components/ServerIcon';
import ServerModal from './ServerModal';

const useStyles = makeStyles({
  serverList: {
    height: '100vh',
    backgroundColor: 'rgb(32,34,37)',
    color: 'white',
    fontSize: '2rem',
    overflow: 'hidden',
    padding: '0.8rem',
  },
  tooltip: {
    backgroundColor: 'black',
    color: 'rgb(220,221,222)',
    fontSize: '1.5rem',
    fontWeight: 700,
    textAlign: 'center',
    letterSpacing: 0,
  },
  arrow: {
    color: 'black',
  },
});

const ServerList = () => {
  const classes = useStyles();

  const [modalOpen, setModalOpen] = useState(false);
  const servers = useSelector((state) => state.servers);

  const dispatch = useDispatch();
  const selectServerOnClick = (serverName) => {
    dispatch(selectServerName(serverName));
    dispatch(selectFriend(''));
  };

  const shortenServerName = (name) => name.split(' ').map((word) => word.slice(0, 1));

  const { name } = qs.parse(window.location.search, { ignoreQueryPrefix: true });

  return (
    <>
      <div className={classes.serverList}>
        <NavLink to={`/private?name=${name}`}>
          <ServerIcon onClick={() => selectServerOnClick('private')} privateRoute>
            <PeopleAlt style={{ color: 'rgb(220,221,222)' }} />
          </ServerIcon>
        </NavLink>
        <ServerIcon onClick={() => setModalOpen(true)} privateRoute={false}>
          <Add />
        </ServerIcon>
        {servers.map((server, key) => (
          <Tooltip
            key={key}
            title={server.name}
            arrow
            placement='right'
            classes={{ tooltip: classes.tooltip, arrow: classes.arrow }}
          >
            <NavLink to={`/main?name=${name}`} style={{ textDecoration: 'none' }}>
              <ServerIcon onClick={() => selectServerOnClick(server.name)} privateRoute={false}>
                {shortenServerName(server.name)}
              </ServerIcon>
            </NavLink>
          </Tooltip>
        ))}
      </div>
      <ServerModal modalOpen={modalOpen} setModalOpen={setModalOpen} />
    </>
  );
};

export default ServerList;
