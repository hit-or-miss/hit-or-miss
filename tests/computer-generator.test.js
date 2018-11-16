'use strict';

import { startDB, stopDB } from './supergoose.js';

import User from '../src/models/user-model.js';
import createComputerUser from '../src/generator/computer-user.js';
import Fleet from '../src/generator/computer-fleet.js';
import CompBoards from '../src/generator/computer-boards.js';


beforeAll(startDB);
afterAll(stopDB);


beforeEach(async () => {
  await User.deleteMany({});
});

describe('Testing the CompUser Generation', () => {

  xit('should create a new user called "CompUser"', async () => {
    const computer = await createComputerUser();
    console.log('THIS IS THE COMPUTER',computer);
    console.log('THIS IS THE COMPUTER',computer._id);

    expect( computer.username ).toBe('Computer');
  });

  it('should create an "Aircraft Carrier" referencing the User "CompUser"', async () => {
    const user = await createComputerUser();
    const fleet = new Fleet(user);
    // const ac = await fleet.init();
    // const bs = await fleet.bs();
    
    // console.log('THIS IS THE COMPUTER',computer._id);
    // const A = await CompShips.aircraftCarrier();
    // console.log(fleet.user);
    // console.log('A');
    // expect(ac.player).toBe(bs.player);
    await fleet.init();
    console.log(fleet.ac);
    console.log(fleet.ac);
    console.log(fleet.ac);
    expect(fleet.ac).toBeDefined();
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