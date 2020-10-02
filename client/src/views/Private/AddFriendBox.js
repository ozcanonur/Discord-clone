import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import makeStyles from '@material-ui/core/styles/makeStyles';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import { sendFriendRequest } from 'redux/actions/socket';
import qs from 'qs';

const useStyles = makeStyles({
  container: {
    padding: '2rem 3rem',
    flexGrow: 1,
  },
  heading: {
    fontSize: '1.6rem',
    fontWeight: 1000,
    color: 'rgb(220,221,222)',
    textTransform: 'uppercase',
  },
  subHeading: {
    fontSize: '1.3rem',
    color: 'rgb(220,221,222)',
    opacity: 0.8,
    marginTop: '1.5rem',
  },
  inputContainer: {
    marginTop: '2rem',
    backgroundColor: 'rgba(0,0,0, 0.1)',
    borderRadius: '1rem',
  },
  inputLabel: {},
  inputProps: {
    fontSize: '1.5rem',
    fontWeight: 500,
    color: 'white',
    opacity: 0.9,
    fontFamily: 'Lato, sans-serif',
  },
  button: {
    fontSize: '1.2rem',
    fontWeight: 700,
    backgroundColor: '#7289da',
    color: 'white',
    fontFamily: 'Lato, sans-serif',
    width: '35rem',

    '&:hover': {
      backgroundColor: '#677bc4',
    },
  },
  hr: {
    height: '1px',
    backgroundColor: 'rgb(41,43,47)',
    marginTop: '3rem',
  },
});

const AddFriendBox = () => {
  const classes = useStyles();

  const [friendName, setFriendName] = useState('');

  const handleChange = (e) => {
    setFriendName(e.target.value);
  };

  const { name } = qs.parse(window.location.search, { ignoreQueryPrefix: true });

  const dispatch = useDispatch();
  const sendFriendRequestOnClick = () => {
    dispatch(sendFriendRequest(name, friendName));
    setFriendName('');
  };

  return (
    <div className={classes.container}>
      <div className={classes.heading}>Add friend</div>
      <div className={classes.subHeading}>
        You can add a friend with their name. It&apos;s cAsE sEnSitIvE!
      </div>
      <TextField
        className={classes.inputContainer}
        placeholder='Enter a Username'
        variant='outlined'
        fullWidth
        InputLabelProps={{ className: classes.inputLabel }}
        InputProps={{
          className: classes.inputProps,
          endAdornment: (
            <Button
              variant='contained'
              className={classes.button}
              onClick={sendFriendRequestOnClick}
            >
              Send Friend Request
            </Button>
          ),
        }}
        value={friendName}
        onChange={(e) => handleChange(e)}
      />
      <hr className={classes.hr} />
    </div>
  );
};

export default AddFriendBox;
