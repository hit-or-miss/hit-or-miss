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

const newShip = { name: 'Aircraft Carrier', size: 5, location: ['d3', 'd4', 'd5', 'd6', 'd7'], sunk: false, player: userInfo._id };

// Hooks for Jest
beforeAll(startDB);
afterAll(stopDB);

afterEach(async () => {
  // Clear the documents after tests
  await User.deleteMany({});
  await Board.deleteMany({});
  await Ships.deleteMany({});
});

xdescribe('Test the creation of each model', () => {

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

  xit('should give the user feedback if the command is incorrect', async () => {
    try {
      const user = await User.create(userInfo);

      const response = await mockRequest.get('/play/123').auth('foo', 'foobar');

      // expect(response).toBe();
    } catch(err) {
      console.error(err);
    }

  });

  it('should receive the right target coordinates', async () => {

    // const computer = await User.create(compInfo);
    // console.log('---I AM THE COMPUTER',computer);

    const user = await User.create(userInfo);
    console.log('---I AM THE USER',user);

    const newUserShip = { name: 'Aircraft Carrier', size: 5, location: ['d3', 'd4', 'd5', 'd6', 'd7'], sunk: false, player: user._id };
    const newUserBattleShip = { name: 'Battleship', size: 4, location: ['j3', 'j4', 'j5', 'j6'], sunk: false, player: user._id };

    // const newCompShip = { name: 'Aircraft Carrier', size: 5, location: ['d3', 'd4', 'd5', 'd6', 'd7'], sunk: false, player: computer._id };
    const userShip = await Ship.create(newUserShip);
    const userBattleShip = await Ship.create(newUserBattleShip);

    const newBoard = {
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

    const targetBoard = await new Board(newBoard);

    console.log(targetBoard);

    // const compShip = await Ship.create(newCompShip);
    console.log('---I AM A USER SHIP', userShip);
    // console.log('---I AM A COMP SHIP', compShip);
    try {

      const response = await mockRequest
        .get('/play/d5')
        .auth('foo', 'foobar');
        // .then(result => { return result; });

      console.log(response.text);
      expect(response.text).toBe('End of game route.');
    } catch(err) {
      console.error(err);
    }
    
   
    // expect(userShip.player).toBe(user._id);
    // expect(compShip.player).toBe(computer._id);
    

    // expect(response.text.split('.').length).toBe(3);
    // expect(response.status).toBe(200);

    // expect(computer).toBeDefined();
  });

  xit('should find a boat with those coordinates', () => { });

  xit('should update the target board with a HIT symbol if there is a boat', () => { });

  xit('should update the found boat as hit', () => { });

  xit('should not find a boat with the target coordinates.', () => { });

  xit('should update the target board with a MISS symbol if there is a boat', () => { });

  xit('should check if there are boats remaining.', () => { });


});