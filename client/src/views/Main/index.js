import React from 'react';
import makeStyles from '@material-ui/core/styles/makeStyles';

import Header from './Header';
import Chat from './Body';
import indexStyles from './styles/index';

const useStyles = makeStyles(indexStyles);

const Main = () => {
  const classes = useStyles();

  return (
    <div className={classes.container}>
      <Header className={classes.header} />
      <Chat className={classes.chat} />
    </div>
  );
};

export default Main;
