import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import makeStyles from '@material-ui/core/styles/makeStyles';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import { selectChannel } from 'redux/actions/react';
import { selectChannel as selectChannelIo, createChannel } from 'redux/actions/socket';
import qs from 'qs';
import VolumeUp from '@material-ui/icons/VolumeUp';
import KeyboardArrowRight from '@material-ui/icons/KeyboardArrowRight';
import Forum from '@material-ui/icons/Forum';
import Add from '@material-ui/icons/Add';
import IconButton from '@material-ui/core/IconButton';

const useStyles = makeStyles({
  body: {
    color: 'white',
    fontSize: '1.5rem',
    fontWeight: 1000,
    flexGrow: 1,
  },
  category: {
    padding: '0 1rem',
  },
  categoryDescription: {
    fontSize: '1.3rem',
    color: 'rgb(163, 168, 173)',
    textTransform: 'uppercase',
    letterSpacing: '2',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  categoryIcon: {
    fontSize: '2rem',
  },
  categoryText: {
    marginRight: '0.8rem',
  },
  channelList: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'flex-start',
    cursor: 'pointer',
    padding: 0,
    paddingLeft: '1rem',
  },
  channel: {
    '&:hover': {
      backgroundColor: 'rgb(64, 67, 74)',
      borderRadius: '4px',
    },
    marginBottom: '4px',
  },
  channelSelected: {
    backgroundColor: 'rgb(64, 67, 74) !important',
    borderRadius: '4px',
    '& *': {
      color: 'white',
    },
  },
  text: {
    color: 'rgb(163, 168, 173)',
    '& span': {
      fontSize: '1.5rem',
    },
  },
  icon: { fontSize: '2rem', color: 'rgb(163, 168, 173)' },
  iconButton: {
    color: 'rgb(163, 168, 173)',
  },
});

const Channels = ({ channels, voice }) => {
  const classes = useStyles();

  const servers = useSelector((state) => state.servers);
  const selectedServerName = useSelector((state) => state.selectedServerName);
  const selectedChannel = useSelector((state) => state.selectedChannel);

  const { name } = qs.parse(window.location.search, { ignoreQueryPrefix: true });

  const dispatch = useDispatch();
  const selectChannelOnClick = (channel) => {
    dispatch(selectChannel(channel));
    dispatch(selectChannelIo(name, channel));
  };

  const selectedServer = servers.find((server) => server.name === selectedServerName) || {
    channels: [],
  };
  const createChannelOnClick = (channelName, isVoice) => {
    dispatch(createChannel(selectedServer, channelName, isVoice));
  };

  return (
    <div className={classes.category}>
      <div className={classes.categoryDescription}>
        <IconButton className={classes.iconButton}>
          <KeyboardArrowRight className={classes.categoryIcon} />
        </IconButton>
        <div className={classes.categoryText}>{voice ? 'Voice channels' : 'Text channels'}</div>
        <IconButton
          className={classes.iconButton}
          onClick={() => createChannelOnClick('New channel', false)}
        >
          <Add className={classes.categoryIcon} />
        </IconButton>
      </div>
      {channels.length > 0 ? (
        <List className={classes.channelList}>
          {channels.map((channel, key) => (
            <ListItem
              key={key}
              button
              onClick={() => selectChannelOnClick(channel)}
              selected={selectedChannel.name === channel.name}
              classes={{ selected: classes.channelSelected, root: classes.channel }}
              disableGutters
            >
              <ListItemIcon>
                {channel.voice ? (
                  <VolumeUp className={classes.icon} />
                ) : (
                  <Forum className={classes.icon} />
                )}
              </ListItemIcon>
              <ListItemText primary={channel.name} className={classes.text} />
            </ListItem>
          ))}
        </List>
      ) : null}
    </div>
  );
};

export default Channels;
