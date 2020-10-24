import React from 'react';
import GitHubIcon from '@material-ui/icons/GitHub';

import CustomButton from 'components/Misc/Button';

const GithubButton = () => {
  const openGithub = () => {
    window.open('https://github.com/ozcanonur/Discord-clone', '_blank');
  };

  return (
    <CustomButton onClick={openGithub} tooltipText='GitHub'>
      <GitHubIcon />
    </CustomButton>
  );
};

export default GithubButton;
