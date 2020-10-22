import React from 'react';
import { useSelector } from 'react-redux';
import makeStyles from '@material-ui/core/styles/makeStyles';
import List from '@material-ui/core/List';

import Options from './Options';
import Server from './Server';
import indexStyles from './styles/index';

const useStyles = makeStyles(indexStyles);

const ServerList = () => {
  const classes = useStyles();

  const servers = useSelector((state: RootState) => state.servers);

  return (
    <div className={classes.container}>
      <Options />
      <List className={classes.list}>
        {servers.map((server: Server, key) => (
          <Server key={key} server={server} />
        ))}
      </List>
    </div>
  );
};

export default ServerList;
