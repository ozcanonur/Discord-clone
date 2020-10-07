import React, { useState } from 'react';
import makeStyles from '@material-ui/core/styles/makeStyles';
import AccountCircleRoundedIcon from '@material-ui/icons/AccountCircleRounded';
import Fade from '@material-ui/core/Fade';
import OutsideClickHandler from 'react-outside-click-handler';

import UserTooltip from './UserTooltip';
import messageStyles from './styles/message';

const useStyles = makeStyles(messageStyles);

const convertCreatedAt = (date) => {
  // eslint-disable-next-line prefer-const
  let [yyyymmdd, time] = date.split('T');
  [time] = time.split('.');
  time = time.substring(0, time.length - 3);

  if (new Date().toISOString().split('T')[0] === yyyymmdd) yyyymmdd = 'Today';

  return `${yyyymmdd} at ${time}`;
};

const Message = ({ message, pinned = false }) => {
  const classes = useStyles();

  const [userTooltipOpen, setUserTooltipOpen] = useState(false);
  const [tooltipPositionTop, setTooltipPositionTop] = useState(false);

  const { user, createdAt } = message;
  const messageText = message.message;

  const handleUserIconClick = (e) => {
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
            <AccountCircleRoundedIcon
              className={classes.icon}
              onClick={(e) => handleUserIconClick(e)}
            />
            <Fade in={userTooltipOpen} unmountOnExit mountOnEnter>
              <div>
                <UserTooltip name={user.name} positionTop={tooltipPositionTop} />
              </div>
            </Fade>
          </div>
        </OutsideClickHandler>
      ) : null}
      <div className={classes.message}>
        <div className={classes.header}>
          <div className={classes.username}>{user.name}</div>
          <div className={classes.date}>{convertCreatedAt(createdAt)}</div>
        </div>
        <div className={classes.messageText}>{messageText}</div>
      </div>
    </div>
  );
};

export default Message;
