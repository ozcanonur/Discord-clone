import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import axios from 'axios';
import makeStyles from '@material-ui/core/styles/makeStyles';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Slide from '@material-ui/core/Slide';
import VpnKeyRoundedIcon from '@material-ui/icons/VpnKeyRounded';
import Typography from '@material-ui/core/Typography';

import loginStyles from './styles/login';

const useStyles = makeStyles(loginStyles);

interface Props {
  registerOpen: boolean;
  setRegisterOpen: (x: boolean) => void;
  blob: HTMLCanvasElement;
}

const Login = ({ registerOpen, setRegisterOpen, blob }: Props) => {
  const classes = useStyles();

  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(false);
  const [errorText, setErrorText] = useState('');

  const history = useHistory();
  const loginOnClick = async () => {
    const params = { username, password };

    try {
      const response = await axios.post('/login', params, { withCredentials: true });
      if (response.status === 200) {
        blob.style.transform = 'scale(10)';

        setTimeout(() => {
          blob.style.transform = 'scale(0)';
          history.push('/main');
        }, 1000);
      }
    } catch (err) {
      console.error(err.response);
      if (err.response.status === 409) {
        setError(true);
        setErrorText('User is already logged in.');
      } else if (err.response.status === 401) {
        setError(true);
        setErrorText('Wrong username or password.');
      }
    }
  };

  const openRegister = () => {
    setRegisterOpen(true);
  };

  return (
    <Slide in={!registerOpen} direction='right' timeout={500} mountOnEnter unmountOnExit>
      <div className={classes.container}>
        <Avatar className={classes.avatar}>
          <VpnKeyRoundedIcon classes={{ root: classes.avatarIcon }} />
        </Avatar>
        <Typography component='h1' variant='h5' className={classes.title}>
          Welcome back!
        </Typography>
        <Typography component='h1' variant='h5' className={classes.subtitle}>
          We're so excited to see you again!
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
            autoFocus
            autoComplete='name'
            value={username}
            onChange={(e) => setUsername(e.target.value)}
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
            error={error}
            helperText={errorText}
            FormHelperTextProps={{
              className: error ? classes.helperErrorText : classes.helperText,
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
            autoComplete='current-password'
            value={password}
            onChange={(e) => setPassword(e.target.value)}
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
          />
          <div className={classes.buttons}>
            <Button fullWidth variant='contained' color='primary' className={classes.button} onClick={openRegister}>
              Register new account
            </Button>
            <Button fullWidth variant='contained' color='primary' className={classes.button} onClick={loginOnClick}>
              Sign in
            </Button>
          </div>
        </form>
      </div>
    </Slide>
  );
};

export default Login;
