import createStyles from '@material-ui/core/styles/createStyles';

const messageOptionsStyles = createStyles({
  container: {
    position: 'relative',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  optionIcon: {
    fontSize: '2.3rem',
    cursor: 'pointer',
    transition: 'transform .2s',

    '&:hover': {
      transform: 'scale(1.2)',
    },
  },
  notificationTooltip: {
    backgroundColor: '#202225',
    color: '#dcddde',
    fontSize: '1.2rem',
    fontWeight: 700,
    textAlign: 'center',
    letterSpacing: 0,
    padding: '1rem',
  },
  pinLogo: {
    marginLeft: '0.5rem',
    height: '2rem',
    fill: '#dcddde',
  },
});

export default messageOptionsStyles;
