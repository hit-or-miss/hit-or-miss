'use strict';

import { startDB, stopDB } from './supergoose.js';

import User from '../src/models/user-model.js';
import createComputerUser from '../src/generator/computer-user.js';
import CompShips from '../src/generator/computer-ships.js';
import CompBoards from '../src/generator/computer-boards.js';


beforeAll(startDB);
afterAll(stopDB);


beforeEach(async () => {
  await User.deleteMany({});
});

describe('Testing the CompUser Generation', () => {

  it('should create a new user called "CompUser"', async () => {
    const computer = await createComputerUser();
    console.log('THIS IS THE COMPUTER',computer);
    console.log('THIS IS THE COMPUTER',computer._id);

    expect( computer.username ).toBe('Computer');
  });

  it('should create an "Aircraft Carrier" referencing the User "CompUser"', async () => {
    const computer = await CompShips.computerUser;
    console.log('THIS IS THE COMPUTER',computer);
    // console.log('THIS IS THE COMPUTER',computer._id);
    const A = await CompShips.aircraftCarrier;
    console.log(A);
    console.log(A);
    console.log(A);
    console.log(A);
    expect(A.player).toBeDefined();
  });

  xit('should create an "Battleship" referencing the User "CompUser"', async () => {
    const computer = await CompUser.computer;
    const B = await CompUser.battlship;
    console.log(B);
    expect(B.player).toBe('B');
  });

  xit('should create an "Cruiser" referencing the User "CompUser"', async () => {
    const computer = await CompUser.computer;
    const C = await CompUser.cruiser;
    console.log(C);
    expect(C.player).toBe('C');
  });

  xit('should create an "Destroyer" referencing the User "CompUser"', async () => {
    const computer = await CompUser.computer;
    const D = await CompUser.destroyer;
    console.log(D);
    expect(D.player).toBe('D');
  });

  xit('should create an "Submarine" referencing the User "CompUser"', async () => {
    const computer = await CompUser.computer;
    const S = await CompUser.submarine;
    console.log(S);
    expect(S.player).toBe('S');
  });

});