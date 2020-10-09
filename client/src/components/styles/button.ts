import createStyles from '@material-ui/core/styles/createStyles';

const buttonStyles = createStyles({
  button: {
    color: 'rgb(220,221,222)',
    '& > span > svg': {
      fontSize: '2rem',
    },
    '&:hover': {
      backgroundColor: 'rgba(220,221,222,0.2)',
    },
  },
  notificationTooltip: {
    backgroundColor: 'rgb(32,34,37)',
    color: 'rgb(220,221,222)',
    fontSize: '1.5rem',
    fontWeight: 700,
    textAlign: 'center',
    letterSpacing: 0,
    padding: '1rem 2rem',
  },
});

export default buttonStyles;