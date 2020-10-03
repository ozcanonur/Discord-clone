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
import indexStyles from './styles/index';

const useStyles = makeStyles(indexStyles);

const ServerList = () => {
  const classes = useStyles();

  const [modalOpen, setModalOpen] = useState(false);
  const servers = useSelector((state) => state.servers);

  const dispatch = useDispatch();
  const selectServerOnClick = (serverName) => {
    dispatch(selectServerName(serverName));
    dispatch(selectFriend(''));
  };

  const { name } = qs.parse(window.location.search, { ignoreQueryPrefix: true });

  return (
    <>
      <div className={classes.serverList}>
        <NavLink to={`/private?name=${name}`}>
          <Tooltip
            title='Friends / Private Messages'
            arrow
            placement='right'
            enterDelay={0}
            classes={{ tooltip: classes.tooltip, arrow: classes.arrow }}
          >
            <div>
              <ServerIcon onClick={() => selectServerOnClick('private')} privateRoute>
                <PeopleAlt style={{ color: 'rgb(220,221,222)' }} />
              </ServerIcon>
            </div>
          </Tooltip>
        </NavLink>
        <Tooltip
          title='Add / Join Server'
          arrow
          placement='right'
          enterDelay={0}
          classes={{ tooltip: classes.tooltip, arrow: classes.arrow }}
        >
          <div>
            <ServerIcon onClick={() => setModalOpen(true)} privateRoute={false}>
              <Add />
            </ServerIcon>
          </div>
        </Tooltip>
        {servers.map((server, key) => (
          <NavLink key={key} to={`/main?name=${name}`} style={{ textDecoration: 'none' }}>
            <Tooltip
              title={server.name}
              arrow
              placement='right'
              enterDelay={0}
              classes={{ tooltip: classes.tooltip, arrow: classes.arrow }}
            >
              <div>
                <ServerIcon onClick={() => selectServerOnClick(server.name)} privateRoute={false}>
                  {server.name}
                </ServerIcon>
              </div>
            </Tooltip>
          </NavLink>
        ))}
      </div>
      <ServerModal modalOpen={modalOpen} setModalOpen={setModalOpen} />
    </>
  );
};

export default ServerList;
