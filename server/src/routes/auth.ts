import express, { Request } from 'express';
import bcrypt from 'bcryptjs';
import passport from '../index';
import Server from '../db/models/server';
import User from '../db/models/user';
import { setupDefaultServers } from '../utils/api';
import { getRegisterValidationError } from '../utils/validation';

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

router.post('/register', async (req: ExtendedRequest, res) => {
  // Setup default servers if it's the first user ever, will only happen in dev testing
  await setupDefaultServers();

  const user = await User.findOne({ name: req.body.username });
  if (user) return res.status(409).send('User already exists.');

  const validationError = getRegisterValidationError(req.body.username, req.body.password);
  if (validationError) res.status(400).send(validationError);

  const hashedPassword = await bcrypt.hash(req.body.password, 8);
  const newUser = new User({
    name: req.body.username,
    password: hashedPassword,
    online: true,
    lastActiveAt: new Date(),
  });

  const defaultServer = await Server.findOne({ name: 'Default' }).populate('channels');
  const secondaryServer = await Server.findOne({ name: 'Games' }).populate('channels');
  for (let server of [defaultServer, secondaryServer]) {
    newUser.servers.push(server);
    server.users.push(newUser);
    await newUser.save();
    await server.save();
  }

  req.login(newUser, (err) => {
    if (err) throw err;
    return res.status(201).send();
  });
});

export default router;
