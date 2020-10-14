import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import makeStyles from '@material-ui/core/styles/makeStyles';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Slide from '@material-ui/core/Slide';
import LockOpenRoundedIcon from '@material-ui/icons/LockOpenRounded';
import Typography from '@material-ui/core/Typography';
import loginStyles from './loginStyles';
import ParticlesBg from 'particles-bg';

const useStyles = makeStyles(loginStyles);

interface Props {
  registerOpen: boolean;
  setRegisterOpen: (x: boolean) => void;
}

const Register = ({ registerOpen, setRegisterOpen }: Props) => {
  const classes = useStyles();

  const [name, setName] = useState('Onur');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setName(e.target.value);
  };

  return (
    <Slide in={registerOpen} direction='left' timeout={500} enter mountOnEnter unmountOnExit>
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
            value={name}
            onChange={handleChange}
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
              type='submit'
              fullWidth
              variant='contained'
              color='primary'
              className={classes.submit}
              component={Link}
              to={`/main?name=${name}`}
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
