import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import makeStyles from '@material-ui/core/styles/makeStyles';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import ForumIcon from '@material-ui/icons/Forum';
import { selectChannel } from 'redux/actions/react';
import { selectChannel as selectChannelIo } from 'redux/actions/socket';
import qs from 'qs';

const useStyles = makeStyles({
  body: {
    color: 'white',
    fontSize: '1.5rem',
    fontWeight: 1000,
    flexGrow: 1,
  },
  channelList: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'flex-start',
    cursor: 'pointer',
    padding: '1rem 1rem',
  },
  channel: {
    '&:hover': {
      backgroundColor: 'rgb(64, 67, 74)',
    },
  },
  channelSelected: {
    backgroundColor: 'rgb(64, 67, 74) !important',
  },
  text: {
    '& span': {
      fontSize: '1.5rem',
    },
  },
  icon: { fontSize: '2rem', color: 'white' },
});

const Body = () => {
  const classes = useStyles();

  const selectedServer = useSelector((state) => state.selectedServer);
  const selectedChannel = useSelector((state) => state.selectedChannel);

  const { name } = qs.parse(window.location.search, { ignoreQueryPrefix: true });

  const dispatch = useDispatch();
  const selectChannelOnClick = (channel) => {
    dispatch(selectChannel(channel));
    dispatch(selectChannelIo(name, channel));
  };

  return (
    <div className={classes.body}>
      <List className={classes.channelList}>
        {selectedServer
          ? selectedServer.channels.map((channel, key) => (
              <ListItem
                key={key}
                button
                onClick={() => selectChannelOnClick(channel)}
                selected={selectedChannel.name === channel.name}
                classes={{ selected: classes.channelSelected, root: classes.channel }}
              >
                <ListItemIcon>
                  <ForumIcon className={classes.icon} />
                </ListItemIcon>
                <ListItemText primary={channel.name} className={classes.text} />
              </ListItem>
            ))
          : null}
      </List>
    </div>
  );
};

export default Body;
