import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import makeStyles from '@material-ui/core/styles/makeStyles';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import loginStyles from './loginStyles';

const useStyles = makeStyles(loginStyles);

const Login = () => {
  const classes = useStyles();

  const [name, setName] = useState('Onur');

  const handleChange = (e) => {
    setName(e.target.value);
  };

  return (
    <div className={classes.container}>
      <Avatar className={classes.avatar}>
        <LockOutlinedIcon />
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
          autoComplete='name'
          autoFocus
          value={name}
          onChange={handleChange}
          InputProps={{ className: classes.InputProps }}
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
          InputProps={{ className: classes.InputProps }}
        />
        <Button
          type='submit'
          fullWidth
          variant='contained'
          color='primary'
          className={classes.submit}
          component={Link}
          to={`/main?name=${name}`}
        >
          Sign In
        </Button>
      </form>
    </div>
  );
};

export default Login;
