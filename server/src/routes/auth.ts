import express, { Request } from 'express';
import bcrypt from 'bcryptjs';
import passport from '../index';
import Server from '../db/models/server';
import User from '../db/models/user';
import { setupDefaultServers } from '../utils';

const router = express.Router();

interface ExtendedRequest extends Request {
  query: { [key: string]: string | undefined };
}

router.get('/user', (req: ExtendedRequest, res) => {
  if (!req.user) return res.status(401).send();
  // @ts-ignore
  res.send({ name: req.user.name, id: req.user._id });
});

router.post('/login', (req: ExtendedRequest, res, next) => {
  if (req.body.password.trim() === '') return res.status(401).send('Wrong username or password.');

  passport.authenticate('local', (err, user, _info) => {
    if (err) res.status(err.status).send(err.message);
    else {
      req.login(user, (err) => {
        if (err) throw err;
        res.send();
      });
    }
  })(req, res, next);
});

router.post('/logout', (req: ExtendedRequest, res) => {
  req.logout();
  res.send();
});

const getRegisterValidationError = (username: string, password: string) => {
  if (username.trim() === '') return `Username can't be empty.`;
  else if (username.length < 3 || username.length > 8)
    return `Username length must be between 3 and 8 characters.`;
  else if (password.trim() === '') return `Password can't be empty.`;
  else if (password.length < 6) return 'Password length needs to be at least 6 characters.';
};

router.post('/register', async (req: ExtendedRequest, res) => {
  // Setup default servers if it's the first user ever, will only happen in dev
  await setupDefaultServers();

  const user = await User.findOne({ name: req.body.username });
  if (user) return res.status(409).send('User already exists.');

  const validationError = getRegisterValidationError(req.body.username, req.body.password);
  if (validationError) res.status(400).send(validationError);

  const hashedPassword = await bcrypt.hash(req.body.password, 8);
  const newUser = new User({
    name: req.body.username,
    password: hashedPassword,
    servers: [],
    online: true,
    lastActiveAt: new Date(),
  });

  const defaultServer = await Server.findOne({ name: 'Default' }).populate('channels');
  const secondaryServer = await Server.findOne({ name: 'Games' }).populate('channels');
  newUser.servers.push(defaultServer);
  newUser.servers.push(secondaryServer);
  await newUser.save();

  // Push the user into the default server, save
  defaultServer.users.push(newUser);
  await defaultServer.save();
  secondaryServer.users.push(newUser);
  await secondaryServer.save();

  req.login(newUser, (err) => {
    if (err) throw err;
    return res.status(201).send();
  });
});

export default router;
