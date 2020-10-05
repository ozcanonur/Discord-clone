import React from 'react';
import CustomButton from 'components/Button';
import GitHubIcon from '@material-ui/icons/GitHub';

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
