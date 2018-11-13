import supergoose, { startDB, stopDB } from './supergoose.js';

import User from '../src/models/user-model.js';
import Board from '../src/models/board-model.js';
import Ships from '../src/models/ship-model.js';
import Ship from '../src/models/ship-model.js';

const { app } = require('../src/app.js');
const mockRequest = supergoose(app);

const userInfo = { username: 'foo', email: 'foo@bar.com', password: 'foobar', role: 'user' };

const newShip = { title: 'Aircraft Carrier', size: 5, location: ['d3', 'd4', 'd5', 'd6', 'd7'], sunk: false, player: userInfo._id };

const newTargetingBoard = {
  type: 'targeting',
  board: {
    a: ['-', '-', '-', '-', '-', '-', '-', '-', '-', '-'],
    b: ['-', '-', '-', '-', '-', '-', '-', '-', '-', '-'],
    c: ['-', '-', '-', '-', '-', '-', '-', '-', '-', '-'],
    d: ['-', '-', '-', '-', '-', '-', '-', '-', '-', '-'],
    e: ['-', '-', '-', '-', '-', '-', '-', '-', '-', '-'],
    f: ['-', '-', '-', '-', '-', '-', '-', '-', '-', '-'],
    g: ['-', '-', '-', '-', '-', '-', '-', '-', '-', '-'],
    h: ['-', '-', '-', '-', '-', '-', '-', '-', '-', '-'],
    i: ['-', '-', '-', '-', '-', '-', '-', '-', '-', '-'],
    j: ['-', '-', '-', '-', '-', '-', '-', '-', '-', '-'],
  },
  player: userInfo._id,
};

// Hooks for Jest
beforeAll(startDB);
afterAll(stopDB);

afterEach(async () => {
  // Clear the documents after tests
  await User.deleteMany({});
  await Board.deleteMany({});
  await Ships.deleteMany({});
});

describe('Test the creation of each model', () => {

  it('should create a new user model', async () => {

    const user = await new User(userInfo);
    expect(user.username).toBe(userInfo.username);

  });

  it('should create a new ship model', async () => {

    const user = await new User(userInfo);

    const newShip = { title: 'Aircraft Carrier', size: 5, location: ['d3', 'd4', 'd5', 'd6', 'd7'], sunk: false, player: user._id };

    const shipA = await new Ship(newShip);

    console.log(shipA);

    expect(shipA.location[2]).toBe('d5');
    expect(shipA.player).toBe(user._id);
  });

  it('should create a new targeting board model', async () => {

    const user = await new User(userInfo);

    const newTargetingBoard = {
      type: 'targeting',
      board: {
        a: ['-', '-', '-', '-', '-', '-', '-', '-', '-', '-'],
        b: ['-', '-', '-', '-', '-', '-', '-', '-', '-', '-'],
        c: ['-', '-', '-', '-', '-', '-', '-', '-', '-', '-'],
        d: ['-', '-', '-', '-', '-', '-', '-', '-', '-', '-'],
        e: ['-', '-', '-', '-', '-', '-', '-', '-', '-', '-'],
        f: ['-', '-', '-', '-', '-', '-', '-', '-', '-', '-'],
        g: ['-', '-', '-', '-', '-', '-', '-', '-', '-', '-'],
        h: ['-', '-', '-', '-', '-', '-', '-', '-', '-', '-'],
        i: ['-', '-', '-', '-', '-', '-', '-', '-', '-', '-'],
        j: ['-', '-', '-', '-', '-', '-', '-', '-', '-', '-'],
      },
      player: user._id,
    };

    const targetBoard = await new Board(newTargetingBoard);

    console.log(targetBoard);

    expect(targetBoard.type).toBe('target');
    expect(targetBoard.player).toBe(user._id);


  });



});