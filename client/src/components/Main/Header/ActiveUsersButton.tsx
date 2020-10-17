import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import PeopleAlt from '@material-ui/icons/PeopleAlt';

import { toggleActiveUsers } from '../../../actions/react';
import CustomButton from '../../Misc/Button';

const ActiveUsersButton = () => {
  const activeUsersOpen = useSelector((state: RootState) => state.activeUsersOpen);

  const dispatch = useDispatch();
  const toggleActiveUsersOnClick = () => {
    dispatch(toggleActiveUsers());
  };

  return (
    <CustomButton
      onClick={toggleActiveUsersOnClick}
      style={{
        backgroundColor: activeUsersOpen ? 'rgba(220,221,222,0.2)' : 'inherit',
      }}
      tooltipText='Toggle Active Users'
      marginRight
    >
      <PeopleAlt />
    </CustomButton>
  );
};

export default ActiveUsersButton;
