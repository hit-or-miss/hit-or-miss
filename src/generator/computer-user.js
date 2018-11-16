'use strict';

import User from '../models/user-model.js';

// CREATING THE USER INSTANCE FOR THE COMPUTER
async function createComputerUser() {
  return await User.create({ username: 'Computer', password: 'PCMASTERRACE' } );
}



// CREATING A RANDOM PLACING GENERATOR - NOT IN USE RIGHT NOW
function placementGenerator(){
  let columnArray = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j'];
  let randomColumn = Math.floor(Math.random() * 10);
  let randomRow = Math.floor(Math.random() * 10);
  let columnPlacement = columnArray[randomColumn];
  let rowPlacement = randomRow.toString();
  let location = columnPlacement + rowPlacement;
  return location;
}

export default createComputerUser;