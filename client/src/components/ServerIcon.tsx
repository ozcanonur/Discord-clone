import React from 'react';
import { useSelector } from 'react-redux';
import makeStyles from '@material-ui/core/styles/makeStyles';
import { Theme } from '@material-ui/core/styles/createMuiTheme';

const useStyles = makeStyles<Theme, StyleProps>({
  serverContainer: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    padding: '1rem',
    cursor: 'pointer',
    borderLeft: ({ isSelected }) => (isSelected ? '3px solid white' : 'none'),
  },
  server: {
    backgroundColor: ({ isSelected }) => (isSelected ? '#7289da' : '#36393f'),
    borderRadius: '50%',
    width: '5rem',
    height: '5rem',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    fontSize: '1.5rem',
    fontFamily: 'Whitney Medium, sans-serif',
    textAlign: 'center',
    color: '#dcddde',
    letterSpacing: '1.5px',
    transition: 'all .2s ease-in-out, transform 0s',

    '& > svg': {
      fontSize: '3rem',
      color: '#3CB371',
    },

    '&:hover': {
      backgroundColor: ({ isOption }) => (isOption ? '#3CB371' : '#7289da'),
      borderRadius: '30%',

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
  isOption?: boolean;
}

interface StyleProps {
  isSelected: boolean | undefined;
  isOption: boolean | undefined;
}

const shortenServerName = (name: string) => name.split(' ').map((word) => word.slice(0, 1));

const ServerIcon = ({ children, onClick, style, privateRoute, isOption }: Props) => {
  const selectedServerName = useSelector((state: RootState) => state.selectedServerName);
  const isSelected =
    selectedServerName === children || (privateRoute && selectedServerName === 'private');

  const styleProps = { isSelected, isOption };
  const classes = useStyles(styleProps);

  return (
    <div onClick={onClick} className={classes.serverContainer}>
      <div className={classes.server} style={style}>
        {typeof children === 'string' ? shortenServerName(children) : children}
      </div>
    </div>
  );
};

export default ServerIcon;
