import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import makeStyles from '@material-ui/core/styles/makeStyles';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';

const useStyles = makeStyles({
  container: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    height: '100%',
    backgroundColor: 'rgb(47,49,54)',
  },
  avatar: {
    backgroundColor: '#3CB371',
    marginBottom: '1rem',
  },
  form: { color: 'rgb(220,221,222)' },
  submit: {
    backgroundColor: '#3CB371',
    color: 'black',
  },
  InputProps: {
    color: 'rgb(220,221,222)',
    fontSize: '2rem',
  },
  title: {
    fontSize: '2rem',
    color: 'rgb(220,221,222)',
  },
});

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
