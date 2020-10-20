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
import authRouter from './routes/auth';
import discordRouter from './routes/discord';

const app = express();
const server = http.createServer(app);

// Middlewares
app.use(express.static('../client/build'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(helmet());
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
