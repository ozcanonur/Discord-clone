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
  const [inputValue, setInputValue] = useState('');
  const [emojiMenuVisible, setEmojiMenuVisible] = useState(false);
  const selectedChannel = useSelector((state: RootState) => state.selectedChannel);

  const handleChange = (value: string) => {
    setInputValue(value);
  };

  const dispatch = useDispatch();

  const createPinOnClick = (e: any) => {
    if (e.which === 13 && !e.shiftKey) {
      if (inputValue.trim() === '' || selectedChannel.name === '')
        return console.warn(`You need to select a channel first`);
      dispatch(
        // @ts-ignore
        createPin({ _id: '', username: name, message: inputValue, createdAt: '' }, selectedChannel)
      );
      setInputValue('');
      e.preventDefault();
    }
  };

  const toggleEmojiMenu = () => {
    setEmojiMenuVisible(!emojiMenuVisible);
  };

  const closeEmojiMenu = () => {
    setEmojiMenuVisible(false);
  };

  const chooseEmoji = (e: any) => {
    setInputValue(inputValue + e.native);
    setEmojiMenuVisible(false);
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
          value={inputValue}
          onChange={(e) => handleChange(e.target.value)}
          onKeyPress={(e) => createPinOnClick(e)}
        />
        <EmojiEmotionsIcon className={classes.emojiMenuIcon} onClick={toggleEmojiMenu} />
        <OutsideClickHandler onOutsideClick={closeEmojiMenu}>
          <div
            className={classes.emojiMenu}
            style={{
              visibility: emojiMenuVisible ? 'visible' : 'hidden',
              bottom: '1rem',
              right: '5rem',
            }}
          >
            <div>
              <Picker theme='dark' set='google' onSelect={(e) => chooseEmoji(e)} />
            </div>
          </div>
        </OutsideClickHandler>
      </div>
    </div>
  );
};

export default PinnedMessageInput;
