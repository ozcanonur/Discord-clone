import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import makeStyles from '@material-ui/core/styles/makeStyles';
import List from '@material-ui/core/List';
import KeyboardArrowRight from '@material-ui/icons/KeyboardArrowRight';
import Add from '@material-ui/icons/Add';
import IconButton from '@material-ui/core/IconButton';

import Channel from './Channel';
import ChannelCreateModal from './ChannelCreateModal';
import channelsStyles from '../styles/channels';

const useStyles = makeStyles(channelsStyles);

interface Props {
  channels: Channel[];
  voice: boolean;
}

const Channels = ({ channels, voice }: Props) => {
  const classes = useStyles();

  const servers = useSelector((state: RootState) => state.servers);
  const selectedServerName = useSelector((state: RootState) => state.selectedServerName);
  const [modalOpen, setModalOpen] = useState(false);

  const selectedServer = servers.find((server) => server.name === selectedServerName) || {
    _id: '',
    name: '',
    channels: [],
  };

  return (
    <div className={classes.category}>
      <div className={classes.categoryDescription}>
        <IconButton className={classes.iconButton}>
          <KeyboardArrowRight className={classes.categoryIcon} />
        </IconButton>
        <div className={classes.categoryText}>{voice ? 'Voice channels' : 'Text channels'}</div>
        <IconButton className={classes.iconButton} onClick={() => setModalOpen(true)}>
          <Add className={classes.categoryIcon} />
        </IconButton>
      </div>
      {channels.length > 0 ? (
        <List className={classes.channelList}>
          {channels.map((channel: Channel, key: number) => (
            <Channel key={key} channel={channel} />
          ))}
        </List>
      ) : null}
      <ChannelCreateModal
        modalOpen={modalOpen}
        setModalOpen={setModalOpen}
        selectedServer={selectedServer}
      />
    </div>
  );
};

export default Channels;
