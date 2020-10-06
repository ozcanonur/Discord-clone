import React, { useState } from 'react';
import makeStyles from '@material-ui/core/styles/makeStyles';
import qs from 'qs';
// import Fade from '@material-ui/core/Fade';
import AccountCircleRoundedIcon from '@material-ui/icons/AccountCircleRounded';
import activeUserStyles from './styles/activeUser';
// import UserTooltip from './UserTooltip';

const useStyles = makeStyles(activeUserStyles);

const ActiveUser = ({ name }) => {
  const classes = useStyles();

  const user = qs.parse(window.location.search, { ignoreQueryPrefix: true });
  // const [userTooltipOpen, setUserTooltipOpen] = useState(false);

  return (
    <div
      className={classes.user}
      style={{ backgroundColor: user.name === name ? 'rgb(64, 67, 74)' : 'inherit' }}
    >
      <div className={classes.iconContainer}>
        <AccountCircleRoundedIcon
          className={classes.icon}
          // onClick={() => setUserTooltipOpen(!userTooltipOpen)}
        />
        {/* <Fade in={userTooltipOpen} unmountOnExit mountOnEnter>
          <div>
            <UserTooltip name={user.name} />
          </div>
        </Fade> */}
      </div>
      <div className={classes.username}>{name}</div>
    </div>
  );
};

export default ActiveUser;
