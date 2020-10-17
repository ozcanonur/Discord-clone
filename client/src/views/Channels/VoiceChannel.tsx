import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import makeStyles from '@material-ui/core/styles/makeStyles';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import VolumeUp from '@material-ui/icons/VolumeUp';

import { selectChannel } from '../../actions/react';
import { selectVoiceChannel } from '../../actions/socket';
import channelsStyles from './styles/channels';
import VoiceUser from './VoiceUser';
import Peer from 'peerjs';
import { setPeer } from '../../actions/react';
import useSound from 'use-sound';
import joinSound from '../../assets/discord-join.mp3';

const useStyles = makeStyles(channelsStyles);

interface ChannelProps {
  channel: Channel;
  selectedServer: Server;
}

const addAudio = (audio: HTMLAudioElement, remoteStream: MediaStream) => {
  audio.srcObject = remoteStream;
  audio.addEventListener('loadedmetadata', () => {
    audio.play();
  });
  document.querySelector('#root')?.append(audio);
};

const VoiceChannel = ({ channel, selectedServer }: ChannelProps) => {
  const classes = useStyles();

  const { name, id } = useSelector((state: RootState) => state.user);
  const selectedChannel = useSelector((state: RootState) => state.selectedChannel);
  const peer: Peer = useSelector((state: RootState) => state.peer);
  const [playJoinSound] = useSound(joinSound);

  const voiceUsersInChannel =
    selectedServer.channels.find((c) => c._id === channel._id)?.voiceUsers || [];

  const dispatch = useDispatch();
  const selectChannelOnClick = (channel: Channel) => {
    dispatch(selectChannel(channel));
    dispatch(selectVoiceChannel(name, channel));

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
          if (voiceUser._id !== id) {
            peer.call(voiceUser._id, stream);
          }
        });
      })
      .catch((error) => console.log(error));

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
        .catch((error) => console.log(error));
    });
  }, [voiceUsersInChannel.length]);

  return (
    <>
      <div style={{ width: '100%' }}>
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
        {voiceUsersInChannel.map((u, key) => (
          <VoiceUser key={key} name={u.name} />
        ))}
      </div>
    </>
  );
};

export default VoiceChannel;
