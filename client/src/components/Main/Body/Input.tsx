import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import makeStyles from '@material-ui/core/styles/makeStyles';
import TextField from '@material-ui/core/TextField';
import InputAdornment from '@material-ui/core/InputAdornment';
import OutsideClickHandler from 'react-outside-click-handler';
import ArrowForwardIosRoundedIcon from '@material-ui/icons/ArrowForwardIosRounded';
import { Picker } from 'emoji-mart';
import EmojiEmotionsIcon from '@material-ui/icons/EmojiEmotions';

import { ReactComponent as TypingSvg } from 'assets/typing.svg';
import { message, typing, stopTyping } from 'actions/socket';
import inputStyles from '../styles/input';

const useStyles = makeStyles(inputStyles);

const Input = () => {
  const classes = useStyles();

  const [inputValue, setInputValue] = useState('');
  const [emojiMenuVisible, setEmojiMenuVisible] = useState(false);
  const selectedChannel = useSelector((state: RootState) => state.selectedChannel);
  const typingUsers = useSelector((state: RootState) => state.typing);

  const usersTypingHere = typingUsers.filter((e) => e.channelId === selectedChannel._id);

  const dispatch = useDispatch();

  const handleChange = (value: string) => {
    setInputValue(value);
  };

  useEffect(() => {
    // Throttle
    const timeoutId = setTimeout(() => {
      if (inputValue.trim() === '') dispatch(stopTyping());
      else dispatch(typing());
    }, 100);

    return () => {
      clearTimeout(timeoutId);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [inputValue]);

  const handleSubmit = (e: React.KeyboardEvent) => {
    if (e.which === 13 && !e.shiftKey) {
      if (inputValue.trim() === '') return;
      dispatch(message(inputValue));
      setInputValue('');
      e.preventDefault();
    }
  };

  const chooseEmoji = (e: any) => {
    setInputValue(inputValue + e.native);
    setEmojiMenuVisible(false);
  };

  const toggleEmojiMenu = () => {
    setEmojiMenuVisible(!emojiMenuVisible);
  };

  const closeEmojiMenu = () => {
    setEmojiMenuVisible(false);
  };

  return (
    <div className={classes.container}>
      <TextField
        multiline
        placeholder={`Message # ${selectedChannel.name}`}
        variant='outlined'
        fullWidth
        InputLabelProps={{ className: classes.textFieldLabel }}
        InputProps={{
          className: classes.inputProps,
          startAdornment: (
            <InputAdornment position='start' className={classes.button}>
              <ArrowForwardIosRoundedIcon className={classes.buttonIcon} />
            </InputAdornment>
          ),
          autoFocus: true,
        }}
        onKeyPress={(e) => handleSubmit(e)}
        value={inputValue}
        onChange={(e) => handleChange(e.target.value)}
      />
      <EmojiEmotionsIcon className={classes.emojiMenuIcon} onClick={toggleEmojiMenu} />
      <OutsideClickHandler onOutsideClick={closeEmojiMenu}>
        <div
          className={classes.emojiMenu}
          style={{ visibility: emojiMenuVisible ? 'visible' : 'hidden' }}
        >
          <div>
            <Picker theme='dark' set='apple' onSelect={(e) => chooseEmoji(e)} />
          </div>
        </div>
      </OutsideClickHandler>
      {usersTypingHere.length > 0 ? (
        <div className={classes.typingContainer}>
          <TypingSvg className={classes.typingSvg} />
          <div className={classes.typingUser}>
            {usersTypingHere.map((e, key) => {
              const comma =
                usersTypingHere.length !== 0 && key !== usersTypingHere.length - 1 ? ', ' : '';
              return <span key={key}>{`${e.username}${comma}`}</span>;
            })}
          </div>
          <div className={classes.typingText}>typing...</div>
        </div>
      ) : null}
    </div>
  );
};

export default Input;
