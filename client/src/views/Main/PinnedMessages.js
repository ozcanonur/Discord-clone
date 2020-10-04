import React from 'react';
import { useSelector } from 'react-redux';
import makeStyles from '@material-ui/core/styles/makeStyles';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import Fade from '@material-ui/core/Fade';
import Message from 'components/Message';
import PinnedMessageInput from './PinnedMessageInput';
import pinnedMessagesStyles from './styles/pinnedMessages';

const useStyles = makeStyles(pinnedMessagesStyles);

const PinnedMessages = ({ pinOpen }) => {
  const classes = useStyles();

  const pinnedMessages = useSelector((state) => state.pinnedMessages);

  return (
    <Fade in={pinOpen}>
      <div className={classes.pinContainer}>
        <div className={classes.pinHeading}>Pinned Messages</div>
        <div className={classes.pinBody}>
          <List className={classes.pinnedMessagesList}>
            {pinnedMessages.map((message, key) => (
              <ListItem key={key} disableGutters className={classes.pinnedMessage}>
                <Message message={message} pinned />
              </ListItem>
            ))}
          </List>
        </div>
        <PinnedMessageInput />
      </div>
    </Fade>
  );
};

export default PinnedMessages;

// const messages = [
//   {
//     user: 'Onur',
//     createdAt: '2020-10-04T11:08:15.863Z',
//     message: `This channel doesn't have any pinned messages... yet.`,
//   },
//   {
//     user: 'Onur',
//     createdAt: '2020-10-04T11:08:15.863Z',
//     message: `This channel doesn't have any pinned messages... yet.This channel doesn't have any pinned messages... yet.This channel doesn't have any pinned messages... yet.`,
//   },
//   {
//     user: 'Onur',
//     createdAt: '2020-10-04T11:08:15.863Z',
//     message: `This channel doesn't have any pinned messages... yet.`,
//   },
//   {
//     user: 'Onur',
//     createdAt: '2020-10-04T11:08:15.863Z',
//     message: `This channel doesn't have any pinned messages... yet.`,
//   },
//   {
//     user: 'Onur',
//     createdAt: '2020-10-04T11:08:15.863Z',
//     message: `This channel doesn't have any pinned messages... yet.`,
//   },
//   {
//     user: 'Onur',
//     createdAt: '2020-10-04T11:08:15.863Z',
//     message: `This channel doesn't have any pinned messages... yet.This channel doesn't have any pinned messages... yet.This channel doesn't have any pinned messages... yet.`,
//   },
// ];
