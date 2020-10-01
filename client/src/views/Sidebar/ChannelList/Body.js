import React from 'react';
import { useSelector } from 'react-redux';
import makeStyles from '@material-ui/core/styles/makeStyles';
import Channels from './Channels';

const useStyles = makeStyles({
  body: {
    color: 'white',
    fontSize: '1.5rem',
    fontWeight: 1000,
    flexGrow: 1,
  },
});

const Body = () => {
  const classes = useStyles();

  const servers = useSelector((state) => state.servers);
  const selectedServerName = useSelector((state) => state.selectedServerName);
  const selectedServer = servers.find((server) => server.name === selectedServerName) || {
    channels: [],
  };

  const voiceChannels = selectedServer.channels.filter((channel) => channel.voice);
  const textChannels = selectedServer.channels.filter((channel) => !channel.voice);

  return (
    <div className={classes.body}>
      {selectedServerName !== '' ? (
        <>
          <Channels channels={textChannels} voice={false} />
          <Channels channels={voiceChannels} voice />
        </>
      ) : null}
    </div>
  );
};

export default Body;
