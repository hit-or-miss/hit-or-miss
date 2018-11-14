require('dotenv').config();

process.env.APP_SECRET = 'THRPPP';

import supergoose, { startDB, stopDB } from './supergoose.js';

import User from '../src/models/user-model.js';
import Board from '../src/models/board-model.js';
import Ships from '../src/models/ship-model.js';
import Ship from '../src/models/ship-model.js';

const { app } = require('../src/app.js');
const mockRequest = supergoose(app);

const userInfo = { username: 'foo', password: 'foobar', role: 'user' };

const compInfo = { username: 'comp', password: 'foobar', role: 'user' };

const newShip = { title: 'Aircraft Carrier', size: 5, location: ['d3', 'd4', 'd5', 'd6', 'd7'], sunk: false, player: userInfo._id };

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
    const computer = await new User(compInfo);
    console.log(computer);

    const userInfo = { username: 'foo', email: 'foo@bar.com', password: 'foobar', role: 'user', opponent: computer._id };

    const user = await new User(userInfo);

    console.log(user);
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

    const newBoard = {
      type: 'targeting',
      board: {
        a: ['a1', '-', '-', '-', '-', '-', '-', '-', '-', '-'],
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

    const targetBoard = await new Board(newBoard);

    console.log(targetBoard);

    expect(targetBoard.type).toBe('targeting');
    expect(targetBoard.board.a[0]).toBe('a1');
    expect(targetBoard.player).toBe(user._id);

  });

});

describe('Test targeting imput and results', () => {

  it('should give the user feedback if the command is incorrect', () => { });

  it('should receive the right target coordinates', async () => {

    const computer = await User.create(compInfo);
    console.log(computer);

    const userInfo = { username: 'foo', email: 'foo@bar.com', password: 'foobar', role: 'user', opponent: computer._id };

    const user = await User.create(userInfo);

    console.log(user);

    await mockRequest
      .get('/play/a2')
      .auth('foo', 'foobar');

    // expect(response.text.split('.').length).toBe(3);
    // expect(response.status).toBe(200);

    expect(computer).toBeDefined();
  });

  it('should find a boat with those coordinates', () => { });

  it('should update the target board with a HIT symbol if there is a boat', () => { });

  it('should update the found boat as hit', () => { });

  it('should not find a boat with the target coordinates.', () => { });

  it('should update the target board with a MISS symbol if there is a boat', () => { });

  it('should check if there are boats remaining.', () => { });


});