import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import makeStyles from '@material-ui/core/styles/makeStyles';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Slide from '@material-ui/core/Slide';
import LockOpenRoundedIcon from '@material-ui/icons/LockOpenRounded';
import Typography from '@material-ui/core/Typography';
import axios from 'axios';

import { login } from '../../actions/react';
import loginStyles from './loginStyles';

const useStyles = makeStyles(loginStyles);

interface Props {
  registerOpen: boolean;
  setRegisterOpen: (x: boolean) => void;
}

const Register = ({ registerOpen, setRegisterOpen }: Props) => {
  const classes = useStyles();

  const [username, setUserName] = useState('Onur');
  const [password, setPassword] = useState('');

  const history = useHistory();
  const dispatch = useDispatch();
  const registerOnClick = () => {
    const params = { username, password };
    axios
      .post('/register', params, { withCredentials: true })
      .then((res) => {
        if (res.status === 201) {
          dispatch(login(username));
          history.push('/main');
        } else if (res.status === 409) console.log('User already exists');
      })
      .catch((error) => console.log(error));
  };

  return (
    <Slide in={registerOpen} direction='left' timeout={500} mountOnEnter unmountOnExit>
      <div className={classes.login}>
        <Avatar className={classes.avatar}>
          <LockOpenRoundedIcon classes={{ root: classes.avatarIcon }} />
        </Avatar>
        <Typography component='h1' variant='h5' className={classes.title}>
          Create a new account
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
            classes={{ root: classes.root }}
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
            autoComplete='current-password'
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
              onClick={() => setRegisterOpen(false)}
            >
              Back
            </Button>
            <Button
              fullWidth
              variant='contained'
              color='primary'
              className={classes.submit}
              onClick={registerOnClick}
              // component={Link}
              // to={`/main?name=${name}`}
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
