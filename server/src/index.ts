import express, { Response } from 'express';
import http from 'http';
import bodyParser from 'body-parser';
import helmet from 'helmet';
import path from 'path';
import router from './routes';
import User from './db/models/user';

import bcrypt from 'bcryptjs';
import cors from 'cors';
import passport from 'passport';
import passportLocal from 'passport-local';
import cookieParser from 'cookie-parser';
import session from 'express-session';

const app = express();
const server = http.createServer(app);

export default server;
import './db/mongoose';
import './io/io';

app.use(express.static('../client/build'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(helmet());
app.use('/', router);

app.use(
  cors({
    origin: 'http://localhost:3000',
    credentials: true,
  })
);
app.use(
  session({
    secret: 'secretcode',
    resave: true,
    saveUninitialized: true,
  })
);
app.use(cookieParser('secretcode'));
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

app.post('/login', (req, res, next) => {
  passport.authenticate('local', (err, user, _info) => {
    if (err) res.status(401).send(err);
    else if (!user) res.status(409).send('No user exists.');
    else {
      req.logIn(user, (err) => {
        if (err) throw err;
        res.send('Success!');
      });
    }
  })(req, res, next);
});

app.post('/register', async (req, res) => {
  const user = await User.findOne({ name: req.body.username });

  if (user) return res.status(409).send('User already exists.');

  const hashedPassword = await bcrypt.hash(req.body.password, 8);
  const newUser = new User({
    name: req.body.username,
    password: hashedPassword,
  });
  await newUser.save();
  res.status(201).send('User Created.');
});

// Catch all for deploy
app.get('/*', function (req, res: Response) {
  res.sendFile(path.join(__dirname, '../client/build/index.html'), function (err) {
    if (err) res.status(500).send(err);
  });
});

const port = process.env.PORT || 5000;
server.listen(port, () => {
  console.log(`Listening on port ${port}.`);
});
