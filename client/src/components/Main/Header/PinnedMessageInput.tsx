/* eslint-disable no-console */
import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import makeStyles from '@material-ui/core/styles/makeStyles';
import TextField from '@material-ui/core/TextField';
import EmojiEmotionsIcon from '@material-ui/icons/EmojiEmotions';
import { Picker } from 'emoji-mart';
import OutsideClickHandler from 'react-outside-click-handler';
import 'emoji-mart/css/emoji-mart.css';

import inputStyles from '../styles/input';
import { createPin } from '../../../actions/socket';

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
  const createPinOnClick = (e: any) => {
    if (e.which === 13 && !e.shiftKey) {
      if (text.trim() === '' || !selectedChannel.name)
        return console.log(`You need to select a channel first`);
      dispatch(
        // @ts-ignore
        createPin({ _id: '', username: name, message: text, createdAt: '' }, selectedChannel)
      );
      setText('');
      e.preventDefault();
    }
  };

  return (
    <div className={classes.pinFooter}>
      <div className={classes.inputContainer}>
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
          onKeyPress={(e) => createPinOnClick(e)}
        />
        <EmojiEmotionsIcon
          className={classes.emojiMenuIcon}
          onClick={() => setEmojiMenuVisible(!emojiMenuVisible)}
        />
        <OutsideClickHandler onOutsideClick={() => setEmojiMenuVisible(false)}>
          <div
            className={classes.emojiMenu}
            style={{
              visibility: emojiMenuVisible ? 'visible' : 'hidden',
              bottom: '1rem',
              right: '5rem',
            }}
          >
            <div>
              <Picker theme='dark' set='google' onSelect={(e) => handleEmojiClick(e)} />
            </div>
          </div>
        </OutsideClickHandler>
      </div>
    </div>
  );
};

export default PinnedMessageInput;
