import createStyles from '@material-ui/core/styles/createStyles';

const voiceUserStyles = createStyles({
  container: {
    transition: 'all .2s ease-in-out',
    '&:hover': {
      backgroundColor: 'inherit !important',
    },
    marginBottom: '4px',
    padding: '0.3rem',
    cursor: 'default',
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
    boxShadow: '0 1rem 1rem rgba(0, 0, 0, 0.2)',
  },
  text: {
    color: 'rgba(220,221,222,0.8)',
    '& span': {
      fontSize: '1.6rem',
      fontFamily: 'Whitney Medium, sans-serif',
    },
  },
  listItemIcon: {
    minWidth: '4rem',
  },
  discordIconContainer: {
    display: 'flex',
  },
  discordIcon: {
    height: '2rem',
  },
});

export default voiceUserStyles;
