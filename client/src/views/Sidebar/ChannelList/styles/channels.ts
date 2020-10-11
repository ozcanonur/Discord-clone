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
    color: 'rgb(163, 168, 173)',
    textTransform: 'uppercase',
    letterSpacing: '2',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: '0 5px',
  },
  categoryIcon: {
    fontSize: '2rem',
  },
  categoryText: {},
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
      backgroundColor: 'rgb(64, 67, 74)',
      borderRadius: '4px',
    },
    marginBottom: '4px',
    padding: '0.5rem',
  },
  channelSelected: {
    backgroundColor: 'rgb(64, 67, 74) !important',
    borderRadius: '4px',
    '& *': {
      color: 'white',
    },
  },
  text: {
    color: 'rgb(163, 168, 173)',
    '& span': {
      fontSize: '1.5rem',
      fontFamily: 'Lato, sans-serif',
      fontWeight: 600,
    },
  },
  icon: { fontSize: '2rem', color: 'rgb(163, 168, 173)' },
  iconButton: {
    color: 'rgb(163, 168, 173)',
    padding: '1rem 0',
  },
  menuPaper: {
    backgroundColor: 'rgb(32,34,37)',
    color: 'rgb(220,221,222)',
    borderRadius: '1rem',
  },
  menuList: {
    padding: '1rem',
  },
  menuItem: {
    fontFamily: 'Lato, sans-serif',
    fontSize: '1.5rem',
    fontWeight: 600,
    padding: '1rem 2rem',
    borderRadius: '1rem',

    '&:hover': {
      backgroundColor: 'rgb(220,221,222)',
      color: 'black',
    },
  },
});
export default channelsStyles;
