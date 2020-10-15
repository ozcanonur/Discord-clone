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
import loginStyles from './loginStyles';

const useStyles = makeStyles(loginStyles);

interface Props {
  registerOpen: boolean;
  setRegisterOpen: (x: boolean) => void;
}

const Login = ({ registerOpen, setRegisterOpen }: Props) => {
  const classes = useStyles();

  const [username, setUsername] = useState('Onur');
  const [password, setPassword] = useState('');

  const history = useHistory();
  const loginOnClick = () => {
    const params = { username, password };
    axios
      .post('/login', params, { withCredentials: true })
      .then((res) => {
        if (res.status === 200) history.push('/main');
      })
      .catch((error) => console.log(error));
  };

  return (
    <Slide in={!registerOpen} direction='right' timeout={500} mountOnEnter unmountOnExit>
      <div className={classes.login}>
        <Avatar className={classes.avatar}>
          <VpnKeyRoundedIcon classes={{ root: classes.avatarIcon }} />
        </Avatar>
        <Typography component='h1' variant='h5' className={classes.title}>
          Sign in
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
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            classes={{ root: classes.root }}
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
            <Button
              fullWidth
              variant='contained'
              color='primary'
              className={classes.submit}
              onClick={() => setRegisterOpen(true)}
            >
              Register
            </Button>
            <Button
              fullWidth
              variant='contained'
              color='primary'
              className={classes.submit}
              onClick={loginOnClick}
            >
              Sign in
            </Button>
          </div>
        </form>
      </div>
    </Slide>
  );
};

export default Login;
