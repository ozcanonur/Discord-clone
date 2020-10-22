import React from 'react';
import makeStyles from '@material-ui/core/styles/makeStyles';

import Header from './Header';
import Body from './Body/Body';
import Footer from './Footer';
import indexStyles from './styles/index';

const useStyles = makeStyles(indexStyles);

const ChannelList = () => {
  const classes = useStyles();

  return (
    <div className={classes.container}>
      <Header />
      <Body />
      <Footer />
    </div>
  );
};

export default ChannelList;
