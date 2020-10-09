import createStyles from '@material-ui/core/styles/createStyles';

const activeUsersStyles = createStyles({
  activeUsers: {
    minWidth: '23rem',
    backgroundColor: 'rgb(47,49,54)',
    padding: '2rem',
    overflowY: 'auto',
  },
  usersStatus: {
    color: 'rgb(142,146,151)',
    fontSize: '1.3rem',
    paddingTop: 0,
  },
  listItem: {
    padding: 0,
  },
});
export default activeUsersStyles;