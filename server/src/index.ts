import express, { Request } from 'express';
import http from 'http';
import bodyParser from 'body-parser';
import helmet from 'helmet';
import path from 'path';
import router from './routes';
import User from './db/models/user';
import Server, { IServer } from './db/models/server';
import bcrypt from 'bcryptjs';
import cors from 'cors';
import passport from 'passport';
import passportLocal from 'passport-local';
import cookieParser from 'cookie-parser';
import session from 'express-session';
import { setupServer } from './io/util';

const app = express();
const server = http.createServer(app);

export default server;

app.use(express.static('../client/build'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(helmet());
app.use('/', router);

import './db/mongoose';
import './io/io';

app.use(
  cors({
    origin: process.env.CORS_ORIGIN,
    credentials: true,
  })
);
app.use(
  session({
    secret: process.env.SECRET,
    resave: true,
    saveUninitialized: true,
  })
);
app.use(cookieParser(process.env.SECRET));
app.use(passport.initialize());
app.use(passport.session());

passport.use(
  new passportLocal.Strategy(async (username, password, done) => {
    const user = await User.findOne({ name: username });
    if (!user) return done(null, false);
    if (await bcrypt.compare(password, user.password)) return done(null, user);
    return done(new Error('Wrong password.'), false);
  })
);

passport.serializeUser((user, done) => {
  // @ts-ignore
  done(null, user.id);
});

passport.deserializeUser((id, done) => {
  User.findOne({ _id: id }, (err, user) => {
    done(err, user);
  });
});

interface ExtendedRequest extends Request {
  query: { [key: string]: string | undefined };
}

app.get('/user', (req: ExtendedRequest, res) => {
  if (!req.user) return res.status(401).send();
  // @ts-ignore
  res.send({ name: req.user.name, id: req.user._id });
});

app.post('/login', (req: ExtendedRequest, res, next) => {
  passport.authenticate('local', (err, user, _info) => {
    if (err) res.status(401).send(err);
    else if (!user) res.status(409).send('No user exists.');
    else {
      req.login(user, (err) => {
        if (err) throw err;
        res.send();
      });
    }
  })(req, res, next);
});

app.post('/logout', (req: ExtendedRequest, res) => {
  req.logout();
  res.send();
});

app.post('/register', async (req: ExtendedRequest, res) => {
  // Create default servers if they don't exist
  await setupServer('Default', [
    { name: 'General', isVoice: false },
    { name: 'World news', isVoice: false },
    { name: 'Covid-19', isVoice: false },
    { name: 'Voice', isVoice: true },
  ]);
  await setupServer('Games', [
    { name: 'General', isVoice: false },
    { name: 'World of Warcraft', isVoice: false },
    { name: 'Path of Exile', isVoice: false },
    { name: 'Voice', isVoice: true },
  ]);

  const user = await User.findOne({ name: req.body.username });

  if (user) return res.status(409).send('User already exists.');

  const hashedPassword = await bcrypt.hash(req.body.password, 8);
  const newUser = new User({
    name: req.body.username,
    password: hashedPassword,
    servers: [],
    online: true,
    lastActiveAt: new Date(),
  });

  const defaultServer: IServer = await Server.findOne({ name: 'Default' }).populate('channels');
  const secondaryServer: IServer = await Server.findOne({ name: 'Games' }).populate('channels');
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

// Catch all for deploy
app.get('/*', function (req, res) {
  res.sendFile(path.join(__dirname, '../client/build/index.html'), function (err) {
    if (err) res.status(500).send(err);
  });
});

const port = process.env.PORT;
server.listen(port, () => {
  console.log(`Listening on port ${port}.`);
});
