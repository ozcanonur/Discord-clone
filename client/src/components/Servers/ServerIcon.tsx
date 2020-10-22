import React from 'react';
import { useSelector } from 'react-redux';
import makeStyles from '@material-ui/core/styles/makeStyles';
import { Theme } from '@material-ui/core/styles/createMuiTheme';
import Tooltip from '@material-ui/core/Tooltip';
import Zoom from '@material-ui/core/Zoom';

interface StyleProps {
  isSelected: boolean | undefined;
  isOption: boolean | undefined;
}

const useStyles = makeStyles<Theme, StyleProps>({
  container: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    padding: '1rem',
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
    cursor: 'pointer',

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
  tooltip: {
    backgroundColor: 'black',
    color: '#dcddde',
    fontSize: '1.5rem',
    textAlign: 'center',
    padding: '1rem 2rem',
    letterSpacing: 0,
  },
  arrow: {
    color: 'black',
  },
});

interface Props {
  children: React.ReactNode;
  onClick?: () => void;
  style?: any;
  privateRoute?: boolean;
  isOption?: boolean;
  name: string;
}

const ServerIcon = ({ children, onClick, style, privateRoute, isOption, name }: Props) => {
  const selectedServerName = useSelector((state: RootState) => state.selectedServerName);

  // To get the selected bg color, children(string) is either selected server name, OR
  // It's the private route (children is a Mui Icon in this case)
  const isSelected =
    selectedServerName === children || (privateRoute && selectedServerName === 'private');

  const styleProps = { isSelected, isOption };
  const classes = useStyles(styleProps);

  const shortenServerName = (name: string) => name.split(' ').map((word) => word.slice(0, 1));

  return (
    <div onClick={onClick} className={classes.container}>
      <Tooltip
        title={name}
        arrow
        placement='right'
        enterDelay={0}
        TransitionComponent={Zoom}
        classes={{ tooltip: classes.tooltip, arrow: classes.arrow }}
      >
        <div className={classes.server} style={style}>
          {typeof children === 'string' ? shortenServerName(children) : children}
        </div>
      </Tooltip>
    </div>
  );
};

export default ServerIcon;
