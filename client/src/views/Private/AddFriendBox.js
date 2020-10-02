import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import makeStyles from '@material-ui/core/styles/makeStyles';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import { sendFriendRequest } from 'redux/actions/socket';
import qs from 'qs';
import addFriendBoxStyles from './styles/addFriendBox';

const useStyles = makeStyles(addFriendBoxStyles);

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
