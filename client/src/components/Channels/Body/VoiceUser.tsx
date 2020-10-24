import React from 'react';
import makeStyles from '@material-ui/core/styles/makeStyles';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';

import { ReactComponent as DiscordIcon } from 'assets/discordIcon.svg';
import voiceUserStyles from '../styles/voiceUser';

const useStyles = makeStyles(voiceUserStyles);

interface Props {
  name: string;
}

const VoiceUser = ({ name }: Props) => {
  const classes = useStyles();

  return (
    <ListItem button classes={{ root: classes.container }} disableGutters>
      <ListItemIcon className={classes.listItemIcon}>
        <div className={classes.iconContainer}>
          <div className={classes.discordIconContainer}>
            <DiscordIcon className={classes.discordIcon} />
          </div>
        </div>
      </ListItemIcon>
      <ListItemText primary={name} className={classes.text} />
    </ListItem>
  );
};

export default VoiceUser;
