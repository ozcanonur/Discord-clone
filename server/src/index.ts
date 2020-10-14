import express, { Response } from 'express';
import http from 'http';
import bodyParser from 'body-parser';
import helmet from 'helmet';
import bcrypt from 'bcryptjs';
import path from 'path';
import router from './routes';

import User from './db/models/user';

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
