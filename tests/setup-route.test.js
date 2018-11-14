'use strict';

require('dotenv').config();

process.env.APP_SECRET = 'password';

import supergoose, { startDB, stopDB } from './supergoose.js';

import User from '../src/models/user-model.js';
import Board from '../src/models/board-model.js';
import Ships from '../src/models/ship-model.js';
import Ship from '../src/models/ship-model.js';

const { app } = require('../src/app.js');
const mockRequest = supergoose(app);

beforeAll(startDB);
afterAll(stopDB);

beforeEach(async () => {
  await User.deleteMany({});
  await Board.deleteMany({});
  await Ships.deleteMany({});
});


describe('Setup Routes', () => {
  
  // if user.data === 0, data should === a new empty board.
  xdescribe('/setup', () => {
    it('should create a new empty playing board', async() => {
    });
    xit('should...', () => {
});

process.env.APP_SECRET = 'password';

xdescribe('Setup Routes', () => {

  describe('/setup', () => {
    it('should...', () => {

    });

    it('should...', () => {

    });
  });

  describe('/setup/:places', () => {

    it('should pass in a valid endpoint for the ship', async() => {
      const userInfo = await User.create( {
        username: 'foo',
        password: 'bar',
      });
      const placeShip = 
      await mockRequest
        .get('/setup/A-A1-R')
        .auth('foo', 'bar');

      expect(placeShip.text).toBe('SUCCESSFUL RIGHT PLACED SHIP');
      
      
       
  

    it('should...', () => {


    });

    it('should...', () => {

    });
  });


});