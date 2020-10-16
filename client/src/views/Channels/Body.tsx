import React from 'react';
import { useSelector } from 'react-redux';
import makeStyles from '@material-ui/core/styles/makeStyles';

import Channels from './Channels';
import bodyStyles from './styles/body';

const useStyles = makeStyles(bodyStyles);

const Body = () => {
  const classes = useStyles();

  const servers = useSelector((state: RootState) => state.servers);
  const selectedServerName = useSelector((state: RootState) => state.selectedServerName);
  const selectedServer = servers.find((server: Server) => server.name === selectedServerName) || {
    channels: [],
  };

  const voiceChannels = selectedServer.channels.filter((channel) => channel.isVoice);
  const textChannels = selectedServer.channels.filter((channel) => !channel.isVoice);

  return (
    <div className={classes.body}>
      {selectedServerName !== '' ? (
        <>
          <Channels channels={textChannels} isVoice={false} />
          <Channels channels={voiceChannels} isVoice />
        </>
      ) : null}
    </div>
  );
};

export default Body;
