/* eslint-disable indent */
'use strict';

require('dotenv').config();

process.env.APP_SECRET = 'password';

import supergoose, { startDB, stopDB } from './supergoose.js';

import User from '../src/models/user-model.js';
import Board from '../src/models/board-model.js';
// import Ships from '../src/models/ship-model.js';
import Ship from '../src/models/ship-model.js';

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

describe('Setup Routes', () => {

  describe('/setup', () => {

    it('should return a 200 status code if a valid direction value for the ship is input', async () => {

      const userInfo = await User.create( {username: 'foo', password: 'bar',
      });

      const boardInfo = await Board.create({type: 'primary', player: userInfo._id,
        });

      const setupBoard = await mockRequest.get('/setup').auth('foo', 'bar');
      console.log(setupBoard.text);
      // expect(placeShip.status).toBe(200);
    });

    xit('should throw 400 error if an invalid direction value is entered', async () => {

      const userInfo = await User.create( {username: 'foo', password: 'bar',
      });

      const boardInfo = await Board.create({type: 'primary', player: userInfo._id,
      });
  
      const setupBoard = await mockRequest.get('/setup/A-B4-F').auth('foo', 'bar');
      expect(setupBoard.status).toBe(400);
    });

    xit('should throw 200 error if a valid ship value is entered', async () => {

      const userInfo = await User.create( {username: 'foo', password: 'bar',
      });
      const boardInfo = await Board.create({type: 'primary', player: userInfo._id,
      });
  
      const setupBoard = await mockRequest.get('/setup/S-B4-R').auth('foo', 'bar');
      expect(setupBoard.status).toBe(200);
    });

    xit('should throw 404 error if an invalid ship value is entered', async () => {

      const userInfo = await User.create( {username: 'foo', password: 'bar',
      });
      const boardInfo = await Board.create({type: 'primary', player: userInfo._id,
      });
    
      const setupBoard = await mockRequest.get('/setup/F-B4-R').auth('foo', 'bar');
      expect(setupBoard.status).toBe(404);
    });

  });

  xdescribe('/setup/:places', () => {

    it('should return a 200 status code if a valid direction value for the ship is input', async () => {

      const userInfo = await User.create( {username: 'foo', password: 'bar',
      });
      const shipInfoA = await Ship.create( {name: 'A', size: 5, location:['d1', 'd2', 'd3', 'd4', 'd6'], player: userInfo._id,
      });
      const shipInfoB = await Ship.create( {name: 'B', size: 4, location:['d3', 'd4', 'd5', 'd6'], player: userInfo._id,
      });
      const shipInfoC = await Ship.create( {name: 'C', size: 3, location:['d3', 'd4', 'd5', 'd6', 'd7'],player: userInfo._id,
      });
      const shipInfoD = await Ship.create( {name: 'D',size: 2, location:['d3', 'd4', 'd5', 'd6', 'd7'], player: userInfo._id,
      });
      const shipInfoS = await Ship.create( {name: 'S', size: 1, location:['d3', 'd4', 'd5', 'd6', 'd7'], player: userInfo._id,
      });
      const boardInfo = await Board.create({type: 'primary', player: userInfo._id,
        });

      const placeShip = await mockRequest.get('/setup/A-B4-R').auth('foo', 'bar');
      expect(placeShip.status).toBe(200);
    });

    it('should throw 400 error if an invalid direction value is entered', async () => {

      const userInfo = await User.create( {username: 'foo', password: 'bar',
      });
      const shipInfoA = await Ship.create( {name: 'A', size: 5, location:['d1', 'd2', 'd3', 'd4', 'd6'], player: userInfo._id,
      });
      const shipInfoB = await Ship.create( {name: 'B', size: 4, location:['d3', 'd4', 'd5', 'd6'], player: userInfo._id,
      });
      const shipInfoC = await Ship.create( {name: 'C', size: 3, location:['d3', 'd4', 'd5', 'd6', 'd7'],player: userInfo._id,
      });
      const shipInfoD = await Ship.create( {name: 'D',size: 2, location:['d3', 'd4', 'd5', 'd6', 'd7'], player: userInfo._id,
      });
      const shipInfoS = await Ship.create( {name: 'S', size: 1, location:['d3', 'd4', 'd5', 'd6', 'd7'], player: userInfo._id,
      });
      const boardInfo = await Board.create({type: 'primary', player: userInfo._id,
        });
  
        const placeShip = await mockRequest.get('/setup/A-B4-F').auth('foo', 'bar');
        expect(placeShip.status).toBe(400);
      });

      it('should throw 200 error if a valid ship value is entered', async () => {

        const userInfo = await User.create( {username: 'foo', password: 'bar',
      });
      const shipInfoA = await Ship.create( {name: 'A', size: 5, location:['d1', 'd2', 'd3', 'd4', 'd6'], player: userInfo._id,
      });
      const shipInfoB = await Ship.create( {name: 'B', size: 4, location:['d3', 'd4', 'd5', 'd6'], player: userInfo._id,
      });
      const shipInfoC = await Ship.create( {name: 'C', size: 3, location:['d3', 'd4', 'd5', 'd6', 'd7'],player: userInfo._id,
      });
      const shipInfoD = await Ship.create( {name: 'D',size: 2, location:['d3', 'd4', 'd5', 'd6', 'd7'], player: userInfo._id,
      });
      const shipInfoS = await Ship.create( {name: 'S', size: 1, location:['d3', 'd4', 'd5', 'd6', 'd7'], player: userInfo._id,
      });
      const boardInfo = await Board.create({type: 'primary', player: userInfo._id,
        });
    
          const placeShip = await mockRequest.get('/setup/S-B4-R').auth('foo', 'bar');
          expect(placeShip.status).toBe(200);
        });

        it('should throw 404 error if an invalid ship value is entered', async () => {

          const userInfo = await User.create( {username: 'foo', password: 'bar',
        });
        const shipInfoA = await Ship.create( {name: 'A', size: 5, location:['d1', 'd2', 'd3', 'd4', 'd6'], player: userInfo._id,
        });
        const shipInfoB = await Ship.create( {name: 'B', size: 4, location:['d3', 'd4', 'd5', 'd6'], player: userInfo._id,
        });
        const shipInfoC = await Ship.create( {name: 'C', size: 3, location:['d3', 'd4', 'd5', 'd6', 'd7'],player: userInfo._id,
        });
        const shipInfoD = await Ship.create( {name: 'D',size: 2, location:['d3', 'd4', 'd5', 'd6', 'd7'], player: userInfo._id,
        });
        const shipInfoS = await Ship.create( {name: 'S', size: 1, location:['d3', 'd4', 'd5', 'd6', 'd7'], player: userInfo._id,
        });
        const boardInfo = await Board.create({type: 'primary', player: userInfo._id,
          });
      
          const placeShip = await mockRequest.get('/setup/F-B4-R').auth('foo', 'bar');
          expect(placeShip.status).toBe(404);
        });
  });
});