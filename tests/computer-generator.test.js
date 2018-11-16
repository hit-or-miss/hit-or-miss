'use strict';

import { startDB, stopDB } from './supergoose.js';

import User from '../src/models/user-model.js';
import createComputerUser from '../src/generator/computer-user.js';
import Fleet from '../src/generator/computer-fleet.js';
import Boards from '../src/generator/computer-boards.js';


beforeAll(startDB);
afterAll(stopDB);


beforeEach(async () => {
  await User.deleteMany({});
});

describe('Testing the computer-user.js file', () => {

  it('should create a new user called "Computer"', async () => {
    const computer = await createComputerUser();
    expect( computer.username ).toBe('Computer');
  });

});

describe('Tesing the computer-fleet.js', () => {

  it('should create an "Aircraft Carrier" referencing the User "CompUser"', async () => {
    const user = await createComputerUser();
    const fleet = new Fleet(user);
    await fleet.init();
    expect( fleet.aircraftCarrier.player ).toBe( user._id );
  });

  it('should create an "Battleship" referencing the User "CompUser"', async () => {
    const user = await createComputerUser();
    const fleet = new Fleet(user);
    await fleet.init();
    expect( fleet.battleship.player ).toBe( user._id );
  });

  it('should create an "Cruiser" referencing the User "CompUser"', async () => {
    const user = await createComputerUser();
    const fleet = new Fleet(user);
    await fleet.init();
    expect( fleet.cruiser.player ).toBe( user._id );
  });

  it('should create an "Destroyer" referencing the User "CompUser"', async () => {
    const user = await createComputerUser();
    const fleet = new Fleet(user);
    await fleet.init();
    expect( fleet.destroyer.player ).toBe( user._id );
  });

  it('should create an "Submarine" referencing the User "CompUser"', async () => {
    const user = await createComputerUser();
    const fleet = new Fleet(user);
    await fleet.init();
    expect( fleet.submarine.player ).toBe( user._id );
  });
});

describe('Testing the computer-boards.js file', () => {

  it('should create new Boards refering to the Computer user', async () => {
    const user = await createComputerUser();
    const boards = new Boards(user);
    await boards.init();
    expect (boards.trackingBoard.player ).toBe( user._id );
  });

  it('should create new Boards refering to the Computer user', async () => {
    const user = await createComputerUser();
    const boards = new Boards(user);
    await boards.init();
    expect( boards.primaryBoard.player ).toBe( user._id );
  });
});