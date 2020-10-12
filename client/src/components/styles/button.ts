import createStyles from '@material-ui/core/styles/createStyles';

const buttonStyles = createStyles({
  button: {
    color: '#dcddde',
    '& > span > svg': {
      fontSize: '2rem',
    },
    '&:hover': {
      backgroundColor: 'rgba(220,221,222,0.2)',
    },
  },
  notificationTooltip: {
    backgroundColor: 'black',
    color: '#dcddde',
    fontSize: '1.5rem',
    textAlign: 'center',
    padding: '1rem 2rem',
    letterSpacing: 0,
  },
});

export default buttonStyles;
