import express from 'express';

const authRouter = express.Router();

import User from '../models/user-model.js';
import auth from '../middleware/auth.js';
import error from '../middleware/error.js';

authRouter.post('/signup', (req, res, next) => {
  User.create(req.body)
    .then((user) => {
      req.token = user.generateToken();
      res.send(req.token);
    }).catch(err => error(err, req, res, next));
});

authRouter.post('/signin', auth(), (req, res) => {
  res.send(req.token);
});

export default authRouter;



