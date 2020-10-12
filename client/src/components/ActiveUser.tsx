import React, { useState } from 'react';
import makeStyles from '@material-ui/core/styles/makeStyles';
import Fade from '@material-ui/core/Fade';
import OutsideClickHandler from 'react-outside-click-handler';
import activeUserStyles from './styles/activeUser';
import UserTooltip from './UserTooltip';
import { ReactComponent as DiscordIcon } from '../assets/discordIcon.svg';
import qs from 'qs';

const useStyles = makeStyles(activeUserStyles);

interface Props {
  name: string;
}

const ActiveUser = ({ name }: Props) => {
  const classes = useStyles();

  const user: any = qs.parse(window.location.search, { ignoreQueryPrefix: true });
  const [userTooltipOpen, setUserTooltipOpen] = useState(false);

  return (
    <div
      className={classes.user}
      style={{ backgroundColor: user.name === name ? '#40434a' : 'inherit' }}
    >
      <div className={classes.iconContainer}>
        <div
          style={{ display: 'flex', position: 'relative' }}
          onClick={() => setUserTooltipOpen(!userTooltipOpen)}
        >
          <DiscordIcon style={{ height: '2.4rem' }} />
          <div className={classes.onlineCircle} />
        </div>
        <Fade in={userTooltipOpen} unmountOnExit mountOnEnter>
          <div>
            <OutsideClickHandler onOutsideClick={() => setUserTooltipOpen(false)}>
              <UserTooltip
                name={name}
                positionTop={false}
                style={{ top: '3rem', right: '18.5rem', left: 'inherit' }}
              />
            </OutsideClickHandler>
          </div>
        </Fade>
      </div>
      <div className={classes.username}>{name}</div>
    </div>
  );
};

export default ActiveUser;
