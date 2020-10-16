import React from 'react';
import { useSelector } from 'react-redux';
import makeStyles from '@material-ui/core/styles/makeStyles';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import { ReactComponent as DiscordIcon } from '../../assets/discordIcon.svg';

const useStyles = makeStyles({
  container: {
    transition: 'all .2s ease-in-out',
    '&:hover': {
      backgroundColor: '#40434a !important',
      borderRadius: '4px',
    },
    marginBottom: '4px',
    padding: '0.3rem',
  },
  iconContainer: {
    backgroundColor: '#7289da',
    borderRadius: '50%',
    padding: '1.3rem',
    width: '0.5rem',
    height: '0.5rem',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    alignSelf: 'flex-start',
    position: 'relative',
    cursor: 'pointer',
  },
  text: {
    color: 'rgba(220,221,222,0.8)',
    '& span': {
      fontSize: '1.6rem',
      fontFamily: 'Whitney Medium, sans-serif',
    },
  },
});

interface Props {
  name: string;
}

const VoiceUser = ({ name }: Props) => {
  const classes = useStyles();

  return (
    <ListItem button classes={{ root: classes.container }} disableGutters>
      <ListItemIcon style={{ minWidth: '4rem' }}>
        <div className={classes.iconContainer}>
          <div style={{ display: 'flex' }}>
            <DiscordIcon style={{ height: '2rem' }} />
          </div>
        </div>
      </ListItemIcon>
      <ListItemText primary={name} className={classes.text} />
    </ListItem>
  );
};

export default VoiceUser;
