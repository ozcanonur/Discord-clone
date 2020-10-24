import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import makeStyles from '@material-ui/core/styles/makeStyles';
import Fade from '@material-ui/core/Fade';
import OutsideClickHandler from 'react-outside-click-handler';

import UserTooltip from 'components/Misc/UserTooltip';
import { ReactComponent as DiscordIcon } from 'assets/discordIcon.svg';
import activeUserStyles from '../styles/activeUser';

const useStyles = makeStyles(activeUserStyles);

interface Props {
  name: string;
}

const ActiveUser = ({ name }: Props) => {
  const classes = useStyles();

  const user = useSelector((state: RootState) => state.user);
  const [userTooltipOpen, setUserTooltipOpen] = useState(false);

  const toggleUserTooltip = () => {
    setUserTooltipOpen(!userTooltipOpen);
  };

  const closeTooltip = () => {
    setUserTooltipOpen(false);
  };

  return (
    <div
      className={classes.container}
      style={{ backgroundColor: user.name === name ? '#40434a' : 'inherit' }}
    >
      <div className={classes.iconContainer}>
        <div className={classes.discordIconContainer} onClick={toggleUserTooltip}>
          <DiscordIcon className={classes.discordIcon} />
          <div className={classes.onlineCircle} />
        </div>
        <Fade in={userTooltipOpen} unmountOnExit mountOnEnter>
          <div>
            <OutsideClickHandler onOutsideClick={closeTooltip}>
              <UserTooltip name={name} style={{ top: '3rem', right: '18.5rem', left: 'inherit' }} />
            </OutsideClickHandler>
          </div>
        </Fade>
      </div>
      <div className={classes.username}>{name}</div>
    </div>
  );
};

export default ActiveUser;
