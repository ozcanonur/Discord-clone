import React, { useState } from 'react';
import makeStyles from '@material-ui/core/styles/makeStyles';
import AccountCircleRoundedIcon from '@material-ui/icons/AccountCircleRounded';
import Fade from '@material-ui/core/Fade';
import OutsideClickHandler from 'react-outside-click-handler';
import activeUserStyles from './styles/activeUser';
import UserTooltip from './UserTooltip';
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
      style={{ backgroundColor: user.name === name ? 'rgb(64, 67, 74)' : 'inherit' }}
    >
      <div className={classes.iconContainer}>
        <AccountCircleRoundedIcon
          className={classes.icon}
          onClick={() => setUserTooltipOpen(!userTooltipOpen)}
        />
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
