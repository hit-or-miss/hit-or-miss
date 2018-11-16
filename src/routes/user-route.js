import express from 'express';

const authRouter = express.Router();

import User from '../models/user-model.js';
import auth from '../middleware/auth.js';
import userText from '../middleware/user-text.js';

authRouter.post('/signup', (req, res, next) => {

  User.create(req.body)
    .then((user) => {

      const welcomeText = userText.welcome();
      res.write(welcomeText);

      req.token = user.generateToken();
      res.write(`\n\nToken for Bearer Authorization: \n\n ${req.token} `);

      res.end();

    }).catch(err => {
      err = { status: 400, statusMessage: 'Bad Request' };
      next(err);
    });
});

authRouter.post('/signin', auth(), (req, res) => {
  const welcomeText = userText.welcome();
  res.write(welcomeText);
  res.end();
});

export default authRouter;
