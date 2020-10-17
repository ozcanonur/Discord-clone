import createStyles from '@material-ui/core/styles/createStyles';

const channelsStyles = createStyles({
  body: {
    color: 'white',
    fontSize: '1.5rem',
    fontWeight: 1000,
    flexGrow: 1,
  },
  category: {
    padding: '0 1rem',
  },
  categoryDescription: {
    fontSize: '1.3rem',
    color: '#a3a8ad',
    textTransform: 'uppercase',
    letterSpacing: '2',
    display: 'flex',
    alignItems: 'center',
    padding: '0 5px',
  },
  categoryIcon: {
    fontSize: '2rem',
  },
  categoryText: {
    flexGrow: 1,
    marginLeft: '1.5rem',
  },
  channelList: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'flex-start',
    cursor: 'pointer',
    padding: 0,
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
  iconButton: {
    color: '#a3a8ad',
    padding: '1rem 0',
  },
  pinLogo: {
    height: '1.5rem',
    fill: 'rgb(220,221,222)',
  },
  menuPaper: {
    backgroundColor: '#202225',
    color: '#dcddde',
    borderRadius: '1rem',
  },
  menuList: {
    padding: '1rem',
  },
  menuItem: {
    fontFamily: 'Whitney Medium, sans-serif',
    fontSize: '1.5rem',
    padding: '1rem 2rem',
    borderRadius: '1rem',

    '&:hover': {
      backgroundColor: '#dcddde',
      color: 'black',
    },
  },
  voiceUsersList: {
    paddingLeft: '4rem',
    display: 'flex',
    flexDirection: 'column',
    width: '100%',
  },
});
export default channelsStyles;
