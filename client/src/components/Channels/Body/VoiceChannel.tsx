/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import Peer from 'peerjs';
import useSound from 'use-sound';
import makeStyles from '@material-ui/core/styles/makeStyles';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import VolumeUp from '@material-ui/icons/VolumeUp';

import ChannelContextMenu from './ChannelContextMenu';
import VoiceUser from './VoiceUser';
import joinSound from '../../../assets/discord-join.mp3';
import { selectChannel, setPeer } from '../../../actions/react';
import { selectChannel as selectChannelIo } from '../../../actions/socket';
import channelsStyles from '../styles/channels';

const useStyles = makeStyles(channelsStyles);

const addAudio = (audio: HTMLAudioElement, remoteStream: MediaStream) => {
  audio.srcObject = remoteStream;
  audio.addEventListener('loadedmetadata', () => {
    audio.play();
  });
  document.querySelector('#root')?.append(audio);
};

interface ChannelProps {
  channel: Channel;
  selectedServer: Server;
}

const VoiceChannel = ({ channel, selectedServer }: ChannelProps) => {
  const classes = useStyles();

  const { id } = useSelector((state: RootState) => state.user);
  const selectedChannel = useSelector((state: RootState) => state.selectedChannel);
  const peer: Peer = useSelector((state: RootState) => state.peer);
  const [playJoinSound] = useSound(joinSound);

  const voiceUsersInChannel =
    selectedServer.channels.find((c) => c._id === channel._id)?.voiceUsers || [];

  const dispatch = useDispatch();
  const selectChannelOnClick = (channel: Channel) => {
    dispatch(selectChannel(channel));
    dispatch(selectChannelIo(channel));

    // @ts-ignore
    const newPeer = new Peer(id);
    dispatch(setPeer(newPeer));
    playJoinSound();
  };

  useEffect(() => {
    if (!(peer.id === id && selectedChannel._id === channel._id && voiceUsersInChannel.length > 1))
      return;

    navigator.mediaDevices
      .getUserMedia({ audio: true })
      .then((stream) => {
        voiceUsersInChannel.forEach((voiceUser) => {
          if (voiceUser._id !== id) peer.call(voiceUser._id, stream);
        });
      })
      .catch((err) => console.log(err));

    peer.on('call', (call) => {
      navigator.mediaDevices
        .getUserMedia({ audio: true })
        .then((stream) => {
          call.answer(stream);
          const audio = document.createElement('audio');
          call.on('stream', (remoteStream) => {
            addAudio(audio, remoteStream);
          });
          call.on('close', () => {
            audio.remove();
          });
        })
        .catch((err) => console.log(err));
    });
  }, [voiceUsersInChannel.length]);

  const [anchorEl, setAnchorEl] = useState(null);
  const openContextMenu = (e: any) => {
    e.preventDefault();
    setAnchorEl(e.currentTarget);
  };

  return (
    <>
      <div style={{ width: '100%' }} onContextMenu={(e) => openContextMenu(e)}>
        <ListItem
          button
          onClick={() => selectChannelOnClick(channel)}
          selected={selectedChannel.name === channel.name}
          classes={{ selected: classes.channelSelected, root: classes.channel }}
          disableGutters
        >
          <ListItemIcon className={classes.listItemIcon}>
            <VolumeUp className={classes.icon} />
          </ListItemIcon>
          <ListItemText primary={channel.name} className={classes.text} />
        </ListItem>
      </div>
      <div className={classes.voiceUsersList}>
        {voiceUsersInChannel.map((user, key) => (
          <VoiceUser key={key} name={user.name} />
        ))}
      </div>
      <ChannelContextMenu channel={channel} anchorEl={anchorEl} setAnchorEl={setAnchorEl} />
    </>
  );
};

export default VoiceChannel;
