import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import makeStyles from '@material-ui/core/styles/makeStyles';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import qs from 'qs';

import { sendFriendRequest } from '../../actions/socket';
import { clearIoResponse } from '../../actions/react';
import addFriendBoxStyles from './styles/addFriendBox';

const useStyles = makeStyles(addFriendBoxStyles);

const AddFriendBox = () => {
  const classes = useStyles();

  const { name }: any = qs.parse(window.location.search, { ignoreQueryPrefix: true });
  const [friendName, setFriendName] = useState('');
  const [error, setError] = useState(false);
  const [errorText, setErrorText] = useState('');
  const ioResponse = useSelector((state: RootState) => state.ioResponse);

  const dispatch = useDispatch();
  const handleChange = (e: any) => {
    setFriendName(e.target.value);
    dispatch(clearIoResponse());
    if (e.target.value.length === 0) {
      setErrorText(`Username can't be empty.`);
      setError(true);
    } else {
      setErrorText(``);
      setError(false);
    }
  };

  const sendFriendRequestOnClick = () => {
    setErrorText('');
    dispatch(sendFriendRequest(name, friendName));
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
              Add Friend
            </Button>
          ),
        }}
        value={friendName}
        onChange={(e) => handleChange(e)}
        error={error || ioResponse.error !== undefined}
        helperText={ioResponse.error || errorText}
        FormHelperTextProps={{
          className: error ? classes.helperErrorText : classes.helperText,
        }}
        onBlur={() => {
          setError(false);
          setErrorText('');
        }}
      />
      <hr className={classes.hr} />
    </div>
  );
};

export default AddFriendBox;