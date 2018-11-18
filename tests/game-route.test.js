
/* eslint-disable indent */
'use strict';

require('dotenv').config();

process.env.APP_SECRET = 'password';

import supergoose, { startDB, stopDB } from './supergoose.js';

import User from '../src/models/user-model.js';
import Board from '../src/models/board-model.js';
import Ship from '../src/models/ship-model.js';
import userText from '../src/middleware/user-text.js';

const { app } = require('../src/app.js');
const mockRequest = supergoose(app);

beforeAll(startDB);
afterAll(stopDB);

beforeEach(async () => {
  await User.deleteMany({});
  await Board.deleteMany({});
  await Ship.deleteMany({});
});

process.env.APP_SECRET = 'password';

describe('Play Route', () => {

  it('should test if the ship player id is equal to the user id, meaning they are associated', async () => {

    const computer = await User.create({
      username: 'Computer', password: 'pass',
    });

    const shipInfoA = await Ship.create({
      name: 'A', size: 5, location: ['d7'], player: computer._id,
    });

    const primaryBoardInfo = await Board.create({
      type: 'primary', player: computer._id, board: {
        a: ['~', '~', '~', '~', '~', '~', '~', '~', '~', '~'],
        b: ['~', '~', '~', '~', '~', '~', '~', '~', '~', '~'],
        c: ['~', '~', '~', '~', '~', '~', '~', '~', '~', '~'],
        d: ['~', '~', '~', '~', '~', '~', '~', '~', '~', '~'],
        e: ['~', '~', '~', '~', '~', '~', '~', '~', '~', '~'],
        f: ['~', '~', '~', '~', '~', '~', '~', '~', '~', '~'],
        g: ['~', '~', '~', '~', '~', '~', '~', '~', '~', '~'],
        h: ['~', '~', '~', '~', '~', '~', '~', '~', '~', '~'],
        i: ['~', '~', '~', '~', '~', '~', '~', '~', '~', '~'],
        j: ['~', '~', '~', '~', '~', '~', '~', '~', '~', '~'],
      },
    });
    const trackingBoardInfo = await Board.create({
      type: 'tracking', player: computer._id, board: {
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
    });

    const computerShips = await Ship.find({ player: computer._id });
    await mockRequest.get('/play/d9').auth('Computer', 'pass');

    expect(shipInfoA._id).toEqual(computerShips[0]._id);
  });

  it('should test if the shot is correctly placed on the users target board', async () => {

    const user = await User.create({
      username: 'Computer', password: 'pass',
    });

    const shipInfoA = await Ship.create({
      name: 'A', size: 5, location: [], player: user._id,
    });

    const primaryBoardInfo = await Board.create({
      type: 'primary', player: user._id, board: {
        a: ['~', '~', '~', '~', '~', '~', '~', '~', '~', '~'],
        b: ['~', '~', '~', '~', '~', '~', '~', '~', '~', '~'],
        c: ['~', '~', '~', '~', '~', '~', '~', '~', '~', '~'],
        d: ['~', '~', '~', '~', '~', '~', '~', '~', '~', '~'],
        e: ['~', '~', '~', '~', '~', '~', '~', '~', '~', '~'],
        f: ['~', '~', '~', '~', '~', '~', '~', '~', '~', '~'],
        g: ['~', '~', '~', '~', '~', '~', '~', '~', '~', '~'],
        h: ['~', '~', '~', '~', '~', '~', '~', '~', '~', '~'],
        i: ['~', '~', '~', '~', '~', '~', '~', '~', '~', '~'],
        j: ['~', '~', '~', '~', '~', '~', '~', '~', '~', '~'],
      },
    });
    const trackingBoardInfo = await Board.create({
      type: 'tracking', player: user._id, board: {
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
    });

    await mockRequest.get('/play/b6').auth('Computer', 'pass');

    const updatedBoard = await Board.findById(trackingBoardInfo._id);

    expect(updatedBoard.pastHits).toContain(['b6']);
  });

  it('should test if the shot is correctly placed on the users target board', async () => {

    const user = await User.create({
      username: 'Computer', password: 'pass',
    });

    const shipInfoA = await Ship.create({
      name: 'A', size: 5, location: [], player: user._id,
    });

    const primaryBoardInfo = await Board.create({
      type: 'primary', player: user._id, board: {
        a: ['~', '~', '~', '~', '~', '~', '~', '~', '~', '~'],
        b: ['~', '~', '~', '~', '~', '~', '~', '~', '~', '~'],
        c: ['~', '~', '~', '~', '~', '~', '~', '~', '~', '~'],
        d: ['~', '~', '~', '~', '~', '~', '~', '~', '~', '~'],
        e: ['~', '~', '~', '~', '~', '~', '~', '~', '~', '~'],
        f: ['~', '~', '~', '~', '~', '~', '~', '~', '~', '~'],
        g: ['~', '~', '~', '~', '~', '~', '~', '~', '~', '~'],
        h: ['~', '~', '~', '~', '~', '~', '~', '~', '~', '~'],
        i: ['~', '~', '~', '~', '~', '~', '~', '~', '~', '~'],
        j: ['~', '~', '~', '~', '~', '~', '~', '~', '~', '~'],
      },
    });
    const trackingBoardInfo = await Board.create({
      type: 'tracking', player: user._id, board: {
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
    });

    await mockRequest.get('/play/b6').auth('Computer', 'pass');
    const updatedBoard = await Board.findById(primaryBoardInfo._id);

    let hit = false;
    if (updatedBoard.board.a.includes('O') || updatedBoard.board.b.includes('O') || updatedBoard.board.c.includes('O') || updatedBoard.board.d.includes('O') || updatedBoard.board.e.includes('O') || updatedBoard.board.f.includes('O') || updatedBoard.board.g.includes('O') || updatedBoard.board.h.includes('O') || updatedBoard.board.i.includes('O') || updatedBoard.board.j.includes('O')
    ) {
      hit = true;
    }
    expect(hit).toBe(true);
  });

  it('should throw a 404 error if user enters an incorrect url', async () => {
    const computer = await User.create({
      username: 'Computer', password: 'pass',
    });
    const response = await mockRequest.get('/pla').auth('Computer', 'pass');

    expect(response.status).toBe(404);
  });

  it('should throw a 401 error if user enters an incorrect username', async () => {
    const computer = await User.create({
      username: 'Computer', password: 'pass',
    });
    const response = await mockRequest.get('/play/b6').auth('User', 'pass');

    expect(response.status).toBe(401);
  });

  it('should test length and text properties of /play route', async () => {

    const computer = await User.create({
      username: 'Computer', password: 'pass',
    });

    const shipInfoA = await Ship.create({
      name: 'A', size: 5, location: [], player: computer._id,
    });


    const primaryBoardInfo = await Board.create({
      type: 'primary', player: computer._id, board: {
        a: ['~', '~', '~', '~', '~', '~', '~', '~', '~', '~'],
        b: ['~', '~', '~', '~', '~', '~', '~', '~', '~', '~'],
        c: ['~', '~', '~', '~', '~', '~', '~', '~', '~', '~'],
        d: ['~', '~', '~', '~', '~', '~', '~', '~', '~', '~'],
        e: ['~', '~', '~', '~', '~', '~', '~', '~', '~', '~'],
        f: ['~', '~', '~', '~', '~', '~', '~', '~', '~', '~'],
        g: ['~', '~', '~', '~', '~', '~', '~', '~', '~', '~'],
        h: ['~', '~', '~', '~', '~', '~', '~', '~', '~', '~'],
        i: ['~', '~', '~', '~', '~', '~', '~', '~', '~', '~'],
        j: ['~', '~', '~', '~', '~', '~', '~', '~', '~', '~'],
      },
    });
    const trackingBoardInfo = await Board.create({
      type: 'tracking', player: computer._id, board: {
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
    });

    const response = await mockRequest.get('/play').auth('Computer', 'pass');
    const playHelpText = userText.playHelp();

    expect(response.text).toContain(playHelpText);
    expect(response.status).toBe(200);
    expect(response.text.length).toEqual(1162);
  });

});

