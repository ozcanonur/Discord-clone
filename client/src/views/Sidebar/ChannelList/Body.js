import React from 'react';
import { useSelector } from 'react-redux';
import makeStyles from '@material-ui/core/styles/makeStyles';
import Channel from 'components/Channel';

const useStyles = makeStyles({
  body: {
    color: 'white',
    fontSize: '1.5rem',
    fontWeight: 1000,
    flexGrow: 1,
  },
});

const Body = () => {
  const classes = useStyles();

  const servers = useSelector((state) => state.servers);
  const selectedServerName = useSelector((state) => state.selectedServerName);
  const selectedServer = servers.find((server) => server.name === selectedServerName);

  return (
    <div className={classes.body}>
      {selectedServer
        ? selectedServer.channels.map(({ name, type }, key) => (
            <Channel key={key} channelIcon={type === 'voice' ? 'V' : '#'} channelName={name} />
          ))
        : null}
    </div>
  );
};

export default Body;
