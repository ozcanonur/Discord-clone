import React from 'react';
import { useSelector } from 'react-redux';
import makeStyles from '@material-ui/core/styles/makeStyles';

const useStyles = makeStyles({
  serverContainer: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    padding: '1rem',
    cursor: 'pointer',
    borderLeft: (isSelected) => (isSelected ? '3px solid white' : 'none'),
  },
  server: {
    backgroundColor: (isSelected) => (isSelected ? 'rgb(114,137,218)' : 'rgb(54,57,63)'),
    borderRadius: '50%',
    width: '5rem',
    height: '5rem',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    fontSize: '1.6rem',
    fontWeight: 1000,
    textAlign: 'center',
    color: 'rgb(220,221,222)',
    letterSpacing: '1.5px',
    transition: 'all .2s ease-in-out',

    '& > svg': {
      fontSize: '3rem',
      color: '#3CB371',
    },

    '&:hover': {
      backgroundColor: 'rgb(114,137,218)',
      borderRadius: '40%',

      '& > *': {
        color: 'white',
      },
    },

    '&:active': {
      transform: 'translateY(2px)',
    },
  },
});

interface Props {
  children: React.ReactNode;
  onClick?: () => void;
  style?: any;
  privateRoute?: boolean;
}

const shortenServerName = (name: string) => name.split(' ').map((word) => word.slice(0, 1));

const ServerIcon = ({ children, onClick, style, privateRoute }: Props) => {
  const selectedServerName = useSelector((state: RootState) => state.selectedServerName);
  const isSelected =
    selectedServerName === children || (privateRoute && selectedServerName === 'private');

  const classes = useStyles(isSelected);

  return (
    <div onClick={onClick} className={classes.serverContainer}>
      <div className={classes.server} style={style}>
        {typeof children === 'string' ? shortenServerName(children) : children}
      </div>
    </div>
  );
};

export default ServerIcon;
