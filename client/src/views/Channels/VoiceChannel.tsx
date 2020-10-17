import React from 'react';
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

const useStyles = makeStyles(channelsStyles);

interface ChannelProps {
  channel: Channel;
  selectedServer: Server;
}

const VoiceChannel = ({ channel, selectedServer }: ChannelProps) => {
  const classes = useStyles();

  const { name, id } = useSelector((state: RootState) => state.user);
  const selectedChannel = useSelector((state: RootState) => state.selectedChannel);
  const peer: Peer = useSelector((state: RootState) => state.peer);

  const voiceUsersInChannel =
    selectedServer.channels.find((c) => c._id === channel._id)?.voiceUsers || [];

  const dispatch = useDispatch();
  const selectChannelOnClick = (channel: Channel) => {
    dispatch(selectChannel(channel));
    dispatch(selectVoiceChannel(name, channel));

    // @ts-ignore
    const newPeer = new Peer(id);
    dispatch(setPeer(newPeer));
  };

  if (peer.id === id && selectedChannel._id === channel._id && voiceUsersInChannel.length > 1) {
    navigator.mediaDevices
      .getUserMedia({ audio: true })
      .then((stream) => {
        const remotePeerId = voiceUsersInChannel[1]._id;
        console.log(remotePeerId);
        const call = peer.call(remotePeerId, stream);
        call.on('stream', (remoteStream) => {
          const audio = document.createElement('audio');
          audio.srcObject = remoteStream;
          audio.addEventListener('loadedmetadata', () => {
            audio.play();
          });
          document.querySelector('#root')?.append(audio);
        });
      })
      .catch((error) => console.log(error));

    peer.on('call', (call) => {
      navigator.mediaDevices
        .getUserMedia({ audio: true })
        .then((stream) => {
          call.answer(stream);
          call.on('stream', (remoteStream) => {
            const audio = document.createElement('audio');
            audio.srcObject = remoteStream;
            audio.addEventListener('loadedmetadata', () => {
              audio.play();
            });
            document.querySelector('#root')?.append(audio);
          });
        })
        .catch((error) => console.log(error));
    });
  }

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
          <ListItemIcon style={{ minWidth: '3.5rem' }}>
            <VolumeUp className={classes.icon} />
          </ListItemIcon>
          <ListItemText primary={channel.name} className={classes.text} />
        </ListItem>
      </div>
      <div style={{ paddingLeft: '4rem', display: 'flex', flexDirection: 'column', width: '100%' }}>
        {voiceUsersInChannel.map((u, key) => (
          <VoiceUser key={key} name={u.name} />
        ))}
      </div>
    </>
  );
};

export default VoiceChannel;
