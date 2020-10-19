import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import makeStyles from '@material-ui/core/styles/makeStyles';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';

import { sendFriendRequest } from '../../actions/socket';
import { clearIoResponse } from '../../actions/react';
import addFriendBoxStyles from './styles/addFriendBox';

const useStyles = makeStyles(addFriendBoxStyles);

const AddFriendBox = () => {
  const classes = useStyles();

  const [inputValue, setInputValue] = useState('');
  const [error, setError] = useState(false);
  const [errorText, setErrorText] = useState('');
  const ioResponse = useSelector((state: RootState) => state.ioResponse);

  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(clearIoResponse());
  }, [dispatch]);

  // Validate
  const handleChange = (value: string) => {
    setInputValue(value);
    dispatch(clearIoResponse());
    if (value.trim() === '') {
      setErrorText(`Username can't be empty.`);
      setError(true);
    } else {
      setErrorText(``);
      setError(false);
    }
  };

  const addFriendOnClick = () => {
    setErrorText('');
    dispatch(sendFriendRequest(inputValue));
  };

  const onBlur = () => {
    setError(false);
    setErrorText('');
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
              onClick={addFriendOnClick}
              disabled={!!error}
            >
              Add Friend
            </Button>
          ),
        }}
        value={inputValue}
        onChange={(e) => handleChange(e.target.value)}
        error={error || ioResponse.error !== undefined}
        helperText={ioResponse.error || errorText}
        FormHelperTextProps={{
          className: error ? classes.helperErrorText : classes.helperText,
        }}
        onBlur={onBlur}
      />
      <hr className={classes.hr} />
    </div>
  );
};

export default AddFriendBox;
