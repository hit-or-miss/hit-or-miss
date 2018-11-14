import express from 'express';

const authRouter = express.Router();

import User from '../models/user-model.js';
import auth from '../middleware/auth.js';
// FIXME: Not sure we need this here
// import error from '../middleware/error.js';

authRouter.post('/signup', (req, res, next) => {
  User.create(req.body)
    .then((user) => {
      req.token = user.generateToken();
      res.send(req.token);
    }).catch(err => {
      err = { status: 400, statusMessage: 'Bad Request' };
      next(err);
    });
});

authRouter.post('/signin', auth(), (req, res) => {
  res.write('HIT OR MISS\n');
  res.write('Please make a GET request to /setup to place your ships\n');
  res.end();
});

export default authRouter;
