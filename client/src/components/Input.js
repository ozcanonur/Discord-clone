import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import makeStyles from '@material-ui/core/styles/makeStyles';
import TextField from '@material-ui/core/TextField';
import InputAdornment from '@material-ui/core/InputAdornment';
import AddCircle from '@material-ui/icons/AddCircle';
import { Picker } from 'emoji-mart';
import 'emoji-mart/css/emoji-mart.css';
import EmojiEmotionsIcon from '@material-ui/icons/EmojiEmotions';
import { message } from 'redux/actions/socket';
import qs from 'qs';
import inputStyles from './styles/input';

const useStyles = makeStyles(inputStyles);

const Input = () => {
  const classes = useStyles();

  const [text, setText] = useState('');
  const [emojiMenuVisible, setEmojiMenuVisible] = useState(false);
  const selectedChannel = useSelector((state) => state.selectedChannel);

  const handleChange = (e) => {
    setText(e.target.value);
  };

  const { name } = qs.parse(window.location.search, { ignoreQueryPrefix: true });

  // Check if message is empty
  const isEmptyMessage = (message) => {
    if (message.trim() === '') return true;
    return false;
  };

  const dispatch = useDispatch();
  const handleSubmit = (e) => {
    if (e.which === 13 && !e.shiftKey) {
      if (isEmptyMessage(e.target.value)) return;
      dispatch(message(name, e.target.value));
      setText('');
    }
  };

  const handleEmojiClick = (e) => {
    setText(text + e.native);
    setEmojiMenuVisible(false);
  };

  return (
    <div className={classes.inputContainer}>
      <TextField
        multiline
        placeholder={`Message # ${selectedChannel.name}`}
        variant='outlined'
        fullWidth
        InputLabelProps={{ className: classes.inputLabel }}
        InputProps={{
          className: classes.inputProps,
          startAdornment: (
            <InputAdornment position='start' className={classes.button}>
              <AddCircle className={classes.buttonIcon} />
            </InputAdornment>
          ),
        }}
        onKeyPress={(e) => handleSubmit(e)}
        value={text}
        onChange={(e) => handleChange(e)}
      />
      <EmojiEmotionsIcon
        className={classes.emojiMenuIcon}
        onClick={() => setEmojiMenuVisible(!emojiMenuVisible)}
      />
      <div
        className={classes.emojiMenu}
        style={{ visibility: emojiMenuVisible ? 'visible' : 'hidden' }}
      >
        <div className=''>
          <Picker set='google' onSelect={(e) => handleEmojiClick(e)} />
        </div>
      </div>
    </div>
  );
};

export default Input;
