import React from 'react';
import { useSelector } from 'react-redux';
import makeStyles from '@material-ui/core/styles/makeStyles';

import Channels from './Channels';
import bodyStyles from './styles/body';

const useStyles = makeStyles(bodyStyles);

const Body = () => {
  const classes = useStyles();

  const selectedServer = useSelector((state: RootState) => state.selectedServer);

  return (
    <div className={classes.body}>
      {selectedServer.name !== '' ? (
        <>
          <Channels
            channels={selectedServer.channels.filter((channel) => !channel.voice)}
            voice={false}
          />
          <Channels channels={selectedServer.channels.filter((channel) => channel.voice)} voice />
        </>
      ) : null}
    </div>
  );
};

export default Body;
