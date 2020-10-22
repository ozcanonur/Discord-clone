import createStyles from '@material-ui/core/styles/createStyles';

const channelsStyles = createStyles({
  container: {
    width: '100%',
  },
  channel: {
    transition: 'all .2s ease-in-out',
    '&:hover': {
      backgroundColor: '#40434a',
      borderRadius: '4px',
    },
    marginBottom: '4px',
    padding: '0.3rem',
    paddingLeft: '0.9rem',
  },
  channelSelected: {
    backgroundColor: '#40434a !important',
    borderRadius: '4px',
    '& *': {
      color: 'white',
    },
  },
  text: {
    color: '#a3a8ad',
    '& span': {
      fontSize: '1.6rem',
      fontFamily: 'Whitney Book Regular, sans-serif',
    },
  },
  listItemIcon: {
    minWidth: '3.5rem',
  },
  icon: { fontSize: '2rem', color: '#a3a8ad' },
  pinLogo: {
    height: '1.5rem',
    fill: 'rgb(220,221,222)',
  },
  voiceUsersList: {
    paddingLeft: '4rem',
    display: 'flex',
    flexDirection: 'column',
    width: '100%',
    cursor: 'default',
  },
});
export default channelsStyles;
