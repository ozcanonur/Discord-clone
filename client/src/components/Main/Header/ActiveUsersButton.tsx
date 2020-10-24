import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import PeopleAlt from '@material-ui/icons/PeopleAlt';

import { toggleActiveUsers } from 'actions/react';
import CustomButton from 'components/Misc/Button';

const ActiveUsersButton = () => {
  const activeUsersOpen = useSelector((state: RootState) => state.activeUsersOpen);

  const dispatch = useDispatch();
  const toggleActiveUsersOnClick = () => {
    dispatch(toggleActiveUsers());
  };

  const backgroundColor = activeUsersOpen ? 'rgba(220,221,222,0.2)' : 'inherit';

  return (
    <CustomButton
      onClick={toggleActiveUsersOnClick}
      style={{
        backgroundColor,
      }}
      tooltipText='Toggle Active Users'
      marginRight
    >
      <PeopleAlt />
    </CustomButton>
  );
};

export default ActiveUsersButton;
