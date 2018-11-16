'use strict';

import express from 'express';
import auth from '../middleware/auth';
import userText from '../middleware/user-text.js';

const helpRouter = express.Router();

// This will display the rules for the user to read
helpRouter.get('/rules', auth(), (req, res) => {
  const rulesText = userText.rules();
  res.write(rulesText);
  res.end();
});

// This will display help text for the user to read
helpRouter.get('/help', auth(), (req, res) => {
  const helpText = userText.help();
  res.write(helpText);
  res.end();
});

// This will display setup specific help text for the user to read
helpRouter.get('/setuphelp', auth(), (req, res) => {
  const setupHelpText = userText.setupHelp();
  res.write(setupHelpText);
  res.end();
});

// This will display play specific help text for the user to read
helpRouter.get('/playhelp', auth(), (req, res) => {
  const playHelpText = userText.playHelp();
  res.write(playHelpText);
  res.end();
});

export default helpRouter;
