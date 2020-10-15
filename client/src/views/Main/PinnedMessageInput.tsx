/* eslint-disable no-console */
import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import makeStyles from '@material-ui/core/styles/makeStyles';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import EmojiEmotionsIcon from '@material-ui/icons/EmojiEmotions';
import { Picker } from 'emoji-mart';
import 'emoji-mart/css/emoji-mart.css';

import inputStyles from '../../components/styles/input';
import { createPin } from '../../actions/socket';

const useStyles = makeStyles(inputStyles);

const PinnedMessageInput = () => {
  const classes = useStyles();

  const { name } = useSelector((state: RootState) => state.user);
  const [text, setText] = useState('');
  const [emojiMenuVisible, setEmojiMenuVisible] = useState(false);
  const selectedChannel = useSelector((state: RootState) => state.selectedChannel);

  const handleChange = (e: any) => {
    setText(e.target.value);
  };

  const handleEmojiClick = (e: any) => {
    setText(text + e.native);
    setEmojiMenuVisible(false);
  };

  const dispatch = useDispatch();
  const createPinOnClick = () => {
    if (text.trim() === '' || !selectedChannel.name)
      return console.log(`You need to select a channel first`);
    dispatch(createPin(name, text, selectedChannel));
    setText('');
  };

  return (
    <div className={classes.pinFooter}>
      <div className={classes.inputContainer} style={{ marginRight: '2rem' }}>
        <TextField
          placeholder='Create a pin'
          variant='outlined'
          fullWidth
          InputLabelProps={{ className: classes.inputLabel }}
          InputProps={{
            className: `${classes.inputProps} ${classes.pinnedInputProps}`,
          }}
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
      <Button variant='contained' className={classes.pinFooterButton} onClick={createPinOnClick}>
        Create pin
      </Button>
    </div>
  );
};

export default PinnedMessageInput;
