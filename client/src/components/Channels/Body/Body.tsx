import React from 'react';
import { useSelector } from 'react-redux';
import makeStyles from '@material-ui/core/styles/makeStyles';
import partition from 'lodash/partition';

import Channels from './Channels';
import bodyStyles from '../styles/body';

const useStyles = makeStyles(bodyStyles);

const Body = () => {
  const classes = useStyles();

  const servers = useSelector((state: RootState) => state.servers);
  const selectedServerName = useSelector((state: RootState) => state.selectedServerName);
  const selectedServer = servers.find((server: Server) => server.name === selectedServerName) || {
    channels: [],
  };

  const [textChannels, voiceChannels] = partition(selectedServer.channels, { isVoice: false });

  return (
    <div className={classes.body}>
      {selectedServerName !== '' ? (
        <>
          <Channels channels={textChannels} />
          <Channels channels={voiceChannels} isVoice />
        </>
      ) : null}
    </div>
  );
};

export default Body;
