import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import makeStyles from '@material-ui/core/styles/makeStyles';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Slide from '@material-ui/core/Slide';
import LockOpenRoundedIcon from '@material-ui/icons/LockOpenRounded';
import Typography from '@material-ui/core/Typography';
import axios from 'axios';

import loginStyles from './styles/login';

const useStyles = makeStyles(loginStyles);

interface Props {
  registerOpen: boolean;
  setRegisterOpen: (x: boolean) => void;
  blob: HTMLCanvasElement;
}

const Register = ({ registerOpen, setRegisterOpen, blob }: Props) => {
  const classes = useStyles();

  const [username, setUserName] = useState('Onur');
  const [usernameError, setUsernameError] = useState(false);
  const [usernameErrorText, setUsernameErrorText] = useState('');

  const [password, setPassword] = useState('asdasd');
  const [passwordError, setPasswordError] = useState(false);
  const [passwordErrorText, setPasswordErrorText] = useState('');

  const history = useHistory();

  const registerOnClick = async () => {
    if (username.trim() === '') {
      setUsernameError(true);
      setUsernameErrorText(`Username can't be empty.`);
    } else if (username.length < 3 || username.length > 8) {
      setUsernameError(true);
      setUsernameErrorText(`Username length must be between 3 and 8 characters.`);
    } else if (password.trim() === '') {
      setPasswordError(true);
      setPasswordErrorText(`Password can't be empty.`);
    } else if (password.length < 6) {
      setPasswordError(true);
      setPasswordErrorText('Password length needs to be at least 6 characters.');
    } else {
      const params = { username, password };
      try {
        const response = await axios.post('/register', params, { withCredentials: true });
        if (response.status === 201) {
          blob.style.transform = 'scale(10)';

          setTimeout(() => {
            blob.style.transform = 'scale(0)';
            history.push('/main');
          }, 1000);
        }
      } catch (err) {
        setUsernameError(true);
        setUsernameErrorText('User already exists.');
      }
    }
  };

  const closeRegister = () => {
    setRegisterOpen(false);
  };

  return (
    <Slide in={registerOpen} direction='right' timeout={500} mountOnEnter unmountOnExit>
      <div className={classes.container}>
        <Avatar className={classes.avatar}>
          <LockOpenRoundedIcon classes={{ root: classes.avatarIcon }} />
        </Avatar>
        <Typography component='h1' variant='h5' className={classes.title}>
          Create a new account
        </Typography>
        <Typography component='h1' variant='h5' className={classes.subtitle}>
          And get in!
        </Typography>
        <form className={classes.form} noValidate>
          <TextField
            variant='outlined'
            margin='normal'
            required
            fullWidth
            id='name'
            label='Name'
            name='name'
            autoComplete='name'
            autoFocus
            value={username}
            onChange={(e) => setUserName(e.target.value)}
            classes={{ root: classes.textFieldRoot }}
            InputProps={{
              classes: {
                root: classes.inputProps,
              },
            }}
            InputLabelProps={{
              classes: {
                root: classes.inputLabelProps,
              },
            }}
            error={usernameError}
            helperText={usernameErrorText}
            FormHelperTextProps={{
              className: usernameError ? classes.helperErrorText : classes.helperText,
            }}
          />
          <TextField
            variant='outlined'
            margin='normal'
            required
            fullWidth
            name='password'
            label='Password'
            type='password'
            id='password'
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            autoComplete='new-password'
            InputProps={{
              classes: {
                root: classes.inputProps,
              },
              autoComplete: 'off',
            }}
            InputLabelProps={{
              classes: {
                root: classes.inputLabelProps,
              },
            }}
            error={passwordError}
            helperText={passwordErrorText}
            FormHelperTextProps={{
              className: passwordError ? classes.helperErrorText : classes.helperText,
            }}
          />
          <div className={classes.buttons}>
            <Button
              fullWidth
              variant='contained'
              color='primary'
              className={classes.button}
              onClick={closeRegister}
            >
              Back to Login
            </Button>
            <Button
              fullWidth
              variant='contained'
              color='primary'
              className={classes.button}
              onClick={registerOnClick}
            >
              Confirm
            </Button>
          </div>
        </form>
      </div>
    </Slide>
  );
};

export default Register;
