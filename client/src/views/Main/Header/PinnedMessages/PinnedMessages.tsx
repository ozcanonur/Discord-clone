import React from 'react';
import { useSelector } from 'react-redux';
import makeStyles from '@material-ui/core/styles/makeStyles';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import Fade from '@material-ui/core/Fade';

import Message from '../../../../components/Message';
import PinnedMessageInput from './PinnedMessageInput';
import pinnedMessagesStyles from '../../styles/pinnedMessages';

const useStyles = makeStyles(pinnedMessagesStyles);

interface Props {
  pinOpen: boolean;
}

const PinnedMessages = ({ pinOpen }: Props) => {
  const classes = useStyles();

  const pinnedMessages = useSelector((state: RootState) => state.pinnedMessages);

  return (
    <Fade in={pinOpen}>
      <div className={classes.pinContainer}>
        <div className={classes.pinHeading}>Pinned Messages</div>
        <div className={classes.pinBody}>
          <List className={classes.pinnedMessagesList}>
            {pinnedMessages.map((message: Message, key) => (
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
