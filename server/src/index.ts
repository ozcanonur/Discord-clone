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

// Middlewares
app.use(express.static('../client/build'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(helmet());
app.use('/login', limiter);
app.use('/register', limiter);
app.use(
  cors({
    // origin: process.env.CORS_ORIGIN,
    // credentials: true,
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

// Make everyone offline for testing, WOOP
(async () => {
  await User.updateMany({}, { online: false });
})();

// Catch all
app.get('/*', function (_req, res) {
  res.sendFile(path.join(__dirname, '../client/build/index.html'), function (err) {
    if (err) res.status(500).send(err);
  });
});

const port = process.env.PORT;
server.listen(port, () => {
  console.log(`Listening on port ${port}.`);
});
