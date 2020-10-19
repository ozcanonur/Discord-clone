import createStyles from '@material-ui/core/styles/createStyles';

const contextMenuStyles = createStyles({
  menuPaper: {
    backgroundColor: '#202225',
    color: '#dcddde',
    borderRadius: '1rem',
  },
  menuList: {
    padding: '1rem',
  },
  menuItem: {
    fontSize: '1.5rem',
    fontWeight: 600,
    padding: '1rem 2rem',
    borderRadius: '1rem',

    '&:hover': {
      backgroundColor: '#dcddde',
      color: 'black',
    },
  },
  menuItemDelete: {
    fontSize: '1.5rem',
    fontWeight: 600,
    padding: '1rem 2rem',
    borderRadius: '1rem',

    '&:hover': {
      backgroundColor: 'red',
      color: 'white',
    },
  },
});

export default contextMenuStyles;
