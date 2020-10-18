import React, { useState } from 'react';
import makeStyles from '@material-ui/core/styles/makeStyles';
import Fade from '@material-ui/core/Fade';
import OutsideClickHandler from 'react-outside-click-handler';

import UserTooltip from '../../Misc/UserTooltip';
import messageStyles from '../styles/message';
import { ReactComponent as DiscordIcon } from '../../../assets/discordIcon.svg';

const useStyles = makeStyles(messageStyles);

const convertCreatedAt = (date: string) => {
  // eslint-disable-next-line prefer-const
  let [yyyymmdd, time] = date.split('T');
  [time] = time.split('.');
  time = time.substring(0, time.length - 3);

  if (new Date().toISOString().split('T')[0] === yyyymmdd) yyyymmdd = 'Today';

  return `${yyyymmdd} at ${time}`;
};

interface Props {
  message: Message;
  pinned?: boolean;
}

const Message = ({ message, pinned = false }: Props) => {
  const classes = useStyles();

  const [userTooltipOpen, setUserTooltipOpen] = useState(false);
  const [tooltipPositionTop, setTooltipPositionTop] = useState(false);

  const { username, createdAt } = message;
  const messageText = message.message;

  const handleUserIconClick = (e: any) => {
    // Display tooltip facing top or bottom depending on the view height
    if (e.clientY < window.innerHeight / 2) setTooltipPositionTop(true);
    else setTooltipPositionTop(false);

    setUserTooltipOpen(!userTooltipOpen);
  };

  return (
    <div className={classes.container}>
      {!pinned ? (
        <OutsideClickHandler onOutsideClick={() => setUserTooltipOpen(false)}>
          <div className={classes.iconContainer}>
            <div onClick={(e) => handleUserIconClick(e)} style={{ display: 'flex' }}>
              <DiscordIcon className={classes.icon} />
            </div>
            <Fade in={userTooltipOpen} unmountOnExit mountOnEnter>
              <div>
                <UserTooltip name={username} positionTop={tooltipPositionTop} />
              </div>
            </Fade>
          </div>
        </OutsideClickHandler>
      ) : null}
      <div className={classes.message}>
        <div className={classes.header}>
          <div className={classes.username}>{username}</div>
          <div className={classes.date}>{convertCreatedAt(createdAt)}</div>
        </div>
        <div className={classes.messageText}>{messageText}</div>
      </div>
    </div>
  );
};

export default Message;