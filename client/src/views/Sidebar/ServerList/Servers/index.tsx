import React from 'react';
import { useSelector } from 'react-redux';
import makeStyles from '@material-ui/core/styles/makeStyles';
import List from '@material-ui/core/List';

import Server from './Server';
import indexStyles from '../styles/index';

const useStyles = makeStyles(indexStyles);

const Servers = () => {
  const classes = useStyles();

  const servers = useSelector((state: RootState) => state.servers);

  return (
    <List className={classes.list}>
      {servers.map((server: Server, key) => (
        <Server key={key} server={server} />
      ))}
    </List>
  );
};

export default Servers;
