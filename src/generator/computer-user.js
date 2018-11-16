'use strict';

import User from '../models/user-model.js';

// CREATING THE USER INSTANCE FOR THE COMPUTER
async function createComputerUser() {
  return await User.create({ username: 'Computer', password: 'PCMASTERRACE' } );
}

export default createComputerUser;