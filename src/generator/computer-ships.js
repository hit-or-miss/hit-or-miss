'use strict';

import Ship from '../models/ship-model.js';
import createComputerUser from './computer-user.js';

let computerUser;
async function createUser() {
  if(computerUser) {
    Promise.resolve(computerUser);
  } else {
    computerUser = await createComputerUser();
  }
}

// CREATING THE SHIPS THAT ARE ATTACHED TO THE COMPUTER USER AND PLACING THEM
async function createAircraftCarrier() {
  await createUser();
  return await Ship.create({ name:'A', size:5, location:['a0','b0','c0','d0','e0'], player: computerUser._id });
}

async function createBattlship() {
  await createUser();
  return await Ship.create({ name:'B', size:4, location:['a1','b1','c1','d1'], player: computerUser._id });
}

async function createCruiser() {
  await createUser();
  return await Ship.create({ name:'C', size:3, location:['a2','b2','c2'], player: computerUser._id });
}

async function createDestroyer() {
  await createUser();
  return await Ship.create({ name:'D', size:3, location:['a3','b3','c3'], player: computerUser._id });
}

async function createSubmarine() {
  await createUser();
  return await Ship.create({ name:'S', size:3, location:['a4','b4','c4'], player: computerUser._id });
}

const aircraftCarrier = createAircraftCarrier().then( ship => { return ship; }).catch(console.error);
const battleship = createBattlship().then( ship => { return ship; }).catch(console.error);
const cruiser = createCruiser().then( ship => { return ship; }).catch(console.error);
const destroyer = createDestroyer().then( ship => { return ship; }).catch(console.error);
const submarine = createSubmarine().then( ship => { return ship; }).catch(console.error);

export default {
  aircraftCarrier,
  battleship,
  cruiser,
  destroyer,
  submarine,
  computerUser,
};