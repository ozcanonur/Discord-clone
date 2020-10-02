const friendListStyles = {
  container: {
    height: '100vh',
    backgroundColor: 'rgb(47,49,54)',
    color: 'white',
    fontSize: '2rem',
    position: 'relative',
    display: 'flex',
    flexDirection: 'column',
  },
  subContainer: {
    flexGrow: 1,
  },
  heading: {
    backgroundColor: 'rgb(41,43,47)',
    padding: '1rem',
    height: '6rem',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  headingText: {
    fontSize: '1.6rem',
    color: 'rgb(220,221,222)',
    opacity: 0.7,
  },
  titleContainer: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: '2rem',
  },
  friendsIcon: {
    fontSize: '3rem',
    color: 'rgb(220,221,222)',
    opacity: 0.7,
  },
  friendsText: {
    fontSize: '1.5rem',
    fontWeight: 1000,
    color: 'rgb(220,221,222)',
    marginLeft: '1rem',
  },
  friendList: {
    display: 'flex',
    flexDirection: 'column',
    padding: '2rem',
    paddingTop: 0,
    fontWeight: 1000,
  },
  directMessages: {
    fontSize: '1.3rem',
    color: 'rgb(220,221,222)',
    opacity: 0.7,
    textTransform: 'uppercase',
  },
};

export default friendListStyles;
