import React from 'react';
import makeStyles from '@material-ui/core/styles/makeStyles';
import { createStyles } from '@material-ui/core';

const useStyles = makeStyles(
  createStyles({
    container: {
      backgroundColor: 'rgb(32,34,37)',
      color: 'white',
      boxShadow: '0 1rem 1rem rgba(0, 0, 0, 0.2)',
      cursor: 'pointer',
      transition: 'transform .3s',

      '&:hover': {
        transform: 'scale(1.05)',
      },
    },
    imgContainer: {
      backgroundColor: 'black',
      height: '10rem',
      position: 'relative',
    },
    img: {
      height: '100%',
      width: '100%',
      objectFit: 'cover',
    },
    bodyContainer: {
      padding: '1rem',
      color: 'rgb(220,221,222)',
      flexGrow: 1,
    },
    title: {
      marginTop: '1.5rem',
      fontSize: '1.5rem',
      fontWeight: 1000,
    },
    description: {
      opacity: 0.8,
      fontSize: '1.2rem',
      marginTop: '0.7rem',
    },
    footer: {
      marginTop: '3rem',
      display: 'flex',
      justifyContent: 'space-between',
    },
    online: {
      display: 'flex',
      alignItems: 'center',
    },
    smallIcon: {
      backgroundColor: 'green',
      borderRadius: '50%',
      height: '1rem',
      width: '1rem',
      marginRight: '0.5rem',
    },
    smallIcon2: {
      backgroundColor: 'rgb(220,221,222)',
      borderRadius: '50%',
      height: '1rem',
      width: '1rem',
      marginRight: '0.5rem',
    },
    messageCount: {
      display: 'flex',
      alignItems: 'center',
    },
  })
);

interface Props {
  res: {
    serverName: string;
    onlineUsers: number;
    totalUsers: number;
    channelCount: number;
    messageCount: number;
    img: string;
    description: string;
  };
}

const ExploreServer = ({ res }: Props) => {
  const classes = useStyles();

  const { serverName, onlineUsers, totalUsers, channelCount, messageCount, img, description } = res;

  return (
    <div className={classes.container}>
      <div className={classes.imgContainer}>
        <img src={img} className={classes.img} />
      </div>
      <div className={classes.bodyContainer}>
        <div className={classes.title}>{serverName}</div>
        <div className={classes.description}>{description}</div>
        <div className={classes.footer}>
          <div className={classes.online}>
            <div className={classes.smallIcon} />
            <div>{`${onlineUsers} Online, ${totalUsers} Members`}</div>
          </div>
          <div className={classes.messageCount}>
            <div className={classes.smallIcon2} />
            <div>{`${channelCount} Channels, ${messageCount} Messages`}</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ExploreServer;
