import React from 'react';
import makeStyles from '@material-ui/core/styles/makeStyles';

import Header from './Header';
import Body from './Body';
import Footer from './Footer';

const useStyles = makeStyles({
  channelList: {
    height: '100vh',
    backgroundColor: 'rgb(47,49,54)',
    color: 'white',
    fontSize: '2rem',
    position: 'relative',
    display: 'flex',
    flexDirection: 'column',
  },
});

const ChannelList = () => {
  const classes = useStyles();

  return (
    <div className={classes.channelList}>
      <Header />
      <Body />
      <Footer />
    </div>
  );
};

export default ChannelList;
