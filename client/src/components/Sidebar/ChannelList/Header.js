import React from 'react';
import makeStyles from '@material-ui/core/styles/makeStyles';
import KeyboardArrowDown from '@material-ui/icons/KeyboardArrowDown';
import IconButton from '@material-ui/core/IconButton';

const useStyles = makeStyles({
  header: {
    height: '5vh',
    color: 'white',
    fontSize: '1.5rem',
    fontWeight: 1000,
    padding: '2rem',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    borderBottom: '2px solid rgb(32,34,37)',
  },
  serverName: {
    display: 'flex',
    justifyContent: 'center',
    alignContent: 'center',
    textAlign: 'center',
  },
  iconButton: {
    display: 'inline-block',
    color: 'white',
    padding: 0,
  },
  item: { fontSize: '2rem' },
});

const Header = () => {
  const classes = useStyles();

  return (
    <div className={classes.header}>
      <div className={classes.serverName}>Onur server</div>
      <IconButton className={classes.iconButton}>
        <KeyboardArrowDown className={classes.item} />
      </IconButton>
    </div>
  );
};

export default Header;
