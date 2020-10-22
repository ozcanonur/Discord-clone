import createStyles from '@material-ui/core/styles/createStyles';

const channelsStyles = createStyles({
  container: {
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
  list: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'flex-start',
    cursor: 'pointer',
    padding: 0,
  },
  channelContainer: {
    width: '100%',
  },
  iconButton: {
    color: '#a3a8ad',
    padding: '1rem 0',
  },
});
export default channelsStyles;
