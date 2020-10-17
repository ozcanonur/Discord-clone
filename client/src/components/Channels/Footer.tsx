import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import axios from 'axios';
import { useHistory } from 'react-router-dom';
import makeStyles from '@material-ui/core/styles/makeStyles';
import MicRoundedIcon from '@material-ui/icons/MicRounded';
import Zoom from '@material-ui/core/Zoom';
import Tooltip from '@material-ui/core/Tooltip';
import MicOffRoundedIcon from '@material-ui/icons/MicOffRounded';
import VolumeUpRoundedIcon from '@material-ui/icons/VolumeUpRounded';
import VolumeOffRoundedIcon from '@material-ui/icons/VolumeOffRounded';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import { ReactComponent as DiscordIcon } from '../../assets/discordIcon.svg';

import Button from '../Misc/Button';
import footerStyles from './styles/footer';

const useStyles = makeStyles(footerStyles);

const Footer = () => {
  const classes = useStyles();

  const { name, id } = useSelector((state: RootState) => state.user);
  const [micOpen, setMicOpen] = useState(true);
  const [soundOpen, setSoundOpen] = useState(true);

  const history = useHistory();
  const logoutOnClick = () => {
    axios
      .post('/logout', {}, { withCredentials: true })
      .then((_res) => {
        history.push('/login');
      })
      .catch((err) => console.log(err));
  };

  return (
    <div className={classes.footer}>
      <div className={classes.iconContainer}>
        <div style={{ display: 'flex', position: 'relative' }}>
          <DiscordIcon style={{ height: '2.4rem' }} />
          <div className={classes.onlineCircle} />
        </div>
      </div>
      <div className={classes.user}>
        <div className={classes.userName}>{name}</div>
        <div className={classes.userId}>{`#${id?.slice(-5)}`}</div>
      </div>
      <div className={classes.buttons}>
        <Tooltip
          enterDelay={0}
          title={micOpen ? 'Mute' : 'Unmute'}
          TransitionComponent={Zoom}
          classes={{ tooltip: classes.notificationTooltip }}
        >
          <div>
            <Button onClick={() => setMicOpen(!micOpen)}>
              {micOpen ? <MicRoundedIcon /> : <MicOffRoundedIcon />}
            </Button>
          </div>
        </Tooltip>
        <Tooltip
          enterDelay={0}
          title={micOpen ? 'Deafen' : 'Undeafen'}
          TransitionComponent={Zoom}
          classes={{ tooltip: classes.notificationTooltip }}
        >
          <div>
            <Button onClick={() => setSoundOpen(!soundOpen)}>
              {soundOpen ? <VolumeUpRoundedIcon /> : <VolumeOffRoundedIcon />}
            </Button>
          </div>
        </Tooltip>
        <Tooltip
          enterDelay={0}
          title='Log out'
          TransitionComponent={Zoom}
          classes={{ tooltip: classes.notificationTooltip }}
        >
          <div>
            <Button onClick={logoutOnClick}>
              <ExitToAppIcon />
            </Button>
          </div>
        </Tooltip>
      </div>
    </div>
  );
};

export default Footer;
