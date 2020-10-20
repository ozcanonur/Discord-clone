import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import makeStyles from '@material-ui/core/styles/makeStyles';
import List from '@material-ui/core/List';
import KeyboardArrowRightRoundedIcon from '@material-ui/icons/KeyboardArrowRightRounded';
import KeyboardArrowDownRoundedIcon from '@material-ui/icons/KeyboardArrowDownRounded';
import Add from '@material-ui/icons/Add';
import IconButton from '@material-ui/core/IconButton';
import Slide from '@material-ui/core/Slide';

import VoiceChannel from './VoiceChannel';
import Channel from './Channel';
import ChannelCreateModal from './ChannelCreateModal';
import channelsStyles from '../styles/channels';

const useStyles = makeStyles(channelsStyles);

interface Props {
  channels: Channel[];
  isVoice?: boolean;
}

const Channels = ({ channels, isVoice }: Props) => {
  const classes = useStyles();

  const { id } = useSelector((state: RootState) => state.user);
  const servers = useSelector((state: RootState) => state.servers);
  const selectedServerName = useSelector((state: RootState) => state.selectedServerName);
  const [modalOpen, setModalOpen] = useState(false);
  const [listOpen, setListOpen] = useState(true);

  const selectedServer = servers.find((server) => server.name === selectedServerName) || {
    _id: '',
    name: '',
    channels: [],
    admin: '',
  };

  const toggleListOpen = () => {
    setListOpen(!listOpen);
  };

  const openCreateChannelModal = () => {
    if (selectedServer.admin === id) setModalOpen(true);
  };

  return (
    <div className={classes.category}>
      <div className={classes.categoryDescription}>
        <IconButton className={classes.iconButton} onClick={toggleListOpen}>
          {listOpen ? (
            <KeyboardArrowDownRoundedIcon className={classes.categoryIcon} />
          ) : (
            <KeyboardArrowRightRoundedIcon className={classes.categoryIcon} />
          )}
        </IconButton>
        <div className={classes.categoryText}>{isVoice ? 'Voice channels' : 'Text channels'}</div>
        <IconButton className={classes.iconButton} onClick={openCreateChannelModal}>
          <Add
            className={classes.categoryIcon}
            style={{ opacity: selectedServer.admin !== id ? '0.3' : 'inherit' }}
          />
        </IconButton>
      </div>
      <Slide in={listOpen} direction='right' unmountOnExit mountOnEnter>
        <div>
          {channels.length > 0 ? (
            <List className={classes.channelList}>
              {isVoice
                ? channels.map((channel: Channel, key: number) => (
                    <VoiceChannel key={key} channel={channel} selectedServer={selectedServer} />
                  ))
                : channels.map((channel: Channel, key: number) => (
                    <Channel
                      key={key}
                      channel={channel}
                      isVoice={isVoice}
                      selectedServer={selectedServer}
                    />
                  ))}
            </List>
          ) : null}
        </div>
      </Slide>
      <ChannelCreateModal
        modalOpen={modalOpen}
        setModalOpen={setModalOpen}
        selectedServer={selectedServer}
        isVoice={isVoice}
      />
    </div>
  );
};

export default Channels;
