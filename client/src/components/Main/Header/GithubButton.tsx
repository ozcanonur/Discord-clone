import React from 'react';
import GitHubIcon from '@material-ui/icons/GitHub';

import CustomButton from '../../Misc/Button';

const GithubButton = () => {
  return (
    <CustomButton
      onClick={() => window.open('https://github.com/ozcanonur/Discord-clone', '_blank')}
      tooltipText='GitHub'
    >
      <GitHubIcon />
    </CustomButton>
  );
};

export default GithubButton;
