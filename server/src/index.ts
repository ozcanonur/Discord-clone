import express from 'express';
import http from 'http';
import socketIo from 'socket.io';
import bodyParser from 'body-parser';
import helmet from 'helmet';
import path from 'path';
import cors from 'cors';
import passport from 'passport';
import cookieParser from 'cookie-parser';
import session from 'express-session';
import rateLimit from 'express-rate-limit';
const peer = require('peer');

import User from './db/models/user';
import authRouter from './routes/auth';
import discordRouter from './routes/discord';

const app = express();
const server = http.createServer(app);

const limiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 50,
  message: 'Too many requests, please try again later.',
});

const staticPath = process.env.DEPLOY_STATIC || '../client/build';

// Middlewares
app.use(express.static(staticPath));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(
  helmet({
    contentSecurityPolicy: false,
  })
);
app.use('/login', limiter);
app.use('/register', limiter);
app.use(
  cors({
    origin: '*',
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
// Setup passport
app.use(passport.initialize());
app.use(passport.session());
export default passport;
import './passport';
// Setup Mongo
import './db/mongoose';
// Setup Socket IO
export const io = socketIo(server);
import './io/io';
// Setup API routes
app.use('/', authRouter);
app.use('/', discordRouter);
// WebRTC server
app.use('/peerjs', peer.ExpressPeerServer(server));

// Make everyone offline for testing, WOOP
(async () => {
  await User.updateMany({}, { online: false });
})();

const catchAllPath = process.env.DEPLOY_CATCH_ALL || '../client/build/index.html';

// Catch all
app.get('/*', function (_req, res) {
  res.sendFile(path.join(__dirname, catchAllPath), function (err) {
    if (err) res.status(500).send(err);
  });
});

const port = process.env.PORT;
server.listen(port, () => {
  console.log(`Listening on port ${port}.`);
});
