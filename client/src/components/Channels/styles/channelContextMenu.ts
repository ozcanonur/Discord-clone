import createStyles from '@material-ui/core/styles/createStyles';

const channelContextMenuStyles = createStyles({
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
});
export default channelContextMenuStyles;
