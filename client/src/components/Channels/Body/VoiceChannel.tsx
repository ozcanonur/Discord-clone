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
import channelStyles from '../styles/channel';

const useStyles = makeStyles(channelStyles);

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
  const selectChannelOnClick = () => {
    // Don't select the same channel if attempted
    if (channel._id === selectedChannel._id) return;

    dispatch(selectChannel(channel));
    dispatch(selectChannelIo(channel));

    // Initialize the peer id if haven't already
    if (peer.id !== id) {
      // @ts-ignore
      const newPeer = new Peer(id);
      dispatch(setPeer(newPeer));
    }
    playJoinSound();
  };

  useEffect(() => {
    if (!(peer.id === id && selectedChannel._id === channel._id && voiceUsersInChannel.length > 1))
      return;

    // @ts-ignore
    window.streams = [];
    navigator.mediaDevices
      .getUserMedia({ audio: true })
      .then((stream) => {
        // Answer if somebody calls
        peer.on('call', (call) => {
          call.answer(stream);

          const audio = document.createElement('audio');
          // Send them your stream
          call.on('stream', (remoteStream) => {
            addAudio(audio, remoteStream);
          });
        });

        // Call others and send your stream
        for (let voiceUser of voiceUsersInChannel) {
          // Don't call yourself :)
          if (voiceUser._id === id) continue;

          const call = peer.call(voiceUser._id, stream);
          // Keep track of the stream for muting/unmuting mic
          // @ts-ignore
          window.streams.push(stream);

          const audio = document.createElement('audio');
          call.on('stream', (remoteStream) => {
            addAudio(audio, remoteStream);
          });
        }
      })
      .catch((err) => console.error(err));
  }, [voiceUsersInChannel.length]);

  const [anchorEl, setAnchorEl] = useState<any>(null);
  const openContextMenu = (e: React.MouseEvent) => {
    e.preventDefault();
    setAnchorEl(e.currentTarget);
  };

  return (
    <>
      <div style={{ width: '100%' }} onContextMenu={(e) => openContextMenu(e)}>
        <ListItem
          button
          onClick={selectChannelOnClick}
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
