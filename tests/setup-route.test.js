/* eslint-disable indent */
'use strict';

require('dotenv').config();

process.env.APP_SECRET = 'password';

import supergoose, { startDB, stopDB } from './supergoose.js';

import User from '../src/models/user-model.js';
import Board from '../src/models/board-model.js';
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

    it('should delete and create a "Computer" user', async () => {
      await User.create( {username: 'foo', password: 'bar'});
      await mockRequest.get('/setup').auth('foo', 'bar');
      const computer = await User.findOne({ username: 'Computer' });
      expect( computer.username ).toBe('Computer');
    });

    it('should create a Fleet of ships for the "Computer" user', async () => {
      await User.create( {username: 'foo', password: 'bar'});
      await mockRequest.get('/setup').auth('foo', 'bar');
      const computer = await User.findOne({ username: 'Computer' });

      const computerShips = await Ship.find({ player: computer._id });
      for(let i = 0; i<computerShips.length; i++){
        expect(computerShips[i].player).toEqual(computer._id);
      }
    });

    it('should create Boards for the "Computer" user', async () => {
      await User.create( {username: 'foo', password: 'bar'});
      await mockRequest.get('/setup').auth('foo', 'bar');
      const computer = await User.findOne({ username: 'Computer' });

      const computerBoards = await Board.find({ player: computer._id });
      for(let i = 0; i<computerBoards.length; i++){
        expect(computerBoards[i].player).toEqual(computer._id);
      }
    });

    it('should return a 200 status code if url is valid', async () => {

      await User.create( {username: 'foo', password: 'bar'});

      const response = await mockRequest.get('/setup').auth('foo', 'bar');
      expect(response.status).toBe(200);
    });

    it('should return a 404 error if the url is invalid', async () => {

      await User.create( {username: 'foo', password: 'bar'});

      const response = await mockRequest.get('/setdown').auth('foo', 'bar');
      expect(response.status).toBe(404);
    });

    it('should correctly associate a player id with a ship id', async () => {


      const userInfo = await User.create( {username: 'foo', password: 'bar',
      });
      const shipInfoA = await Ship.create( {name: 'A', size: 5, location:['d1', 'd2', 'd3', 'd4', 'd6'], player: userInfo._id,
      });
      await mockRequest.get('/setup').auth('foo', 'bar');

      expect(shipInfoA.player).toEqual(userInfo._id);
    });

    it('should correctly associate a primary board with a player', async () => {

      const userInfo = await User.create( {username: 'foofoo', password: 'foobar',
      });

      const boardInfo = await Board.create({type: 'primary', player: userInfo._id,
      });
      await mockRequest.get('/setup').auth('foofoo', 'foobar');

      expect(boardInfo.player).toEqual(userInfo._id);
    });

  });

  describe('/setup/:places', () => {

    it('should return a 200 status code if a valid url direction identifier is entered', async () => {

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

    it('should throw 400 error if an invalid url direction identifier is entered', async () => {

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

    it('should throw 200 error if a valid ship url identifier is entered', async () => {

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

    it('should throw 404 error if an invalid ship url identifier is entered', async () => {

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

    it('should contain the board text', async () => {

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
      expect(placeShip.text).toContain('  1  2  3  4  5  6  7  8  9  10');
      expect(placeShip.text).toContain('B ~  ~  ~  A  A  A  A  A');
    });

    it('should poplulate the board with the ships location when ships direction is right', async () => {

        const userInfo = await User.create( {username: 'foo', password: 'bar',
      });
      const shipInfoA = await Ship.create( {name: 'A', size: 5, location:[], player: userInfo._id,
      });
      const shipInfoB = await Ship.create( {name: 'B', size: 4, location:[], player: userInfo._id,
      });
      const shipInfoC = await Ship.create( {name: 'C', size: 3, location:[],player: userInfo._id,
      });
      const shipInfoD = await Ship.create( {name: 'D',size: 2, location:[], player: userInfo._id,
      });
      const shipInfoS = await Ship.create( {name: 'S', size: 1, location:[], player: userInfo._id,
      });
      const boardInfo = await Board.create({type: 'primary', player: userInfo._id,
        });

      const placeShip = await mockRequest.get('/setup/A-J1-R').auth('foo', 'bar');
      const updatedShip = await Ship.findById(shipInfoA._id);
      expect(updatedShip.location[3]).toBe('j3');
      });

    it('should poplulate the board with the ships location when ships direction is left', async () => {

      const userInfo = await User.create( {username: 'foo', password: 'bar',
      });
      const shipInfoA = await Ship.create( {name: 'A', size: 5, location:[], player: userInfo._id,
      });
      const shipInfoB = await Ship.create( {name: 'B', size: 4, location:[], player: userInfo._id,
      });
      const shipInfoC = await Ship.create( {name: 'C', size: 3, location:[],player: userInfo._id,
      });
      const shipInfoD = await Ship.create( {name: 'D',size: 2, location:[], player: userInfo._id,
      });
      const shipInfoS = await Ship.create( {name: 'S', size: 1, location:[], player: userInfo._id,
      });
      const boardInfo = await Board.create({type: 'primary', player: userInfo._id,
        });

      const placeShip = await mockRequest.get('/setup/C-B8-L').auth('foo', 'bar');
      const updatedShip = await Ship.findById(shipInfoC._id);
      expect(updatedShip.location[1]).toBe('b6');
    });

    it('should poplulate the board with the ships location when ships direction is up', async () => {

      const userInfo = await User.create( {username: 'foo', password: 'bar',
      });
      const shipInfoA = await Ship.create( {name: 'A', size: 5, location:[], player: userInfo._id,
      });
      const shipInfoB = await Ship.create( {name: 'B', size: 4, location:[], player: userInfo._id,
      });
      const shipInfoC = await Ship.create( {name: 'C', size: 3, location:[],player: userInfo._id,
      });
      const shipInfoD = await Ship.create( {name: 'D',size: 2, location:[], player: userInfo._id,
      });
      const shipInfoS = await Ship.create( {name: 'S', size: 1, location:[], player: userInfo._id,
      });
      const boardInfo = await Board.create({type: 'primary', player: userInfo._id,
        });

      const placeShip = await mockRequest.get('/setup/B-J8-U').auth('foo', 'bar');
      const updatedShip = await Ship.findById(shipInfoB._id);
      expect(updatedShip.location[1]).toBe('h7');
    });

    it('should poplulate the board with the ships location when ships direction is down', async () => {

      const userInfo = await User.create( {username: 'foo', password: 'bar',
      });
      const shipInfoA = await Ship.create( {name: 'A', size: 5, location:[], player: userInfo._id,
      });
      const shipInfoB = await Ship.create( {name: 'B', size: 4, location:[], player: userInfo._id,
      });
      const shipInfoC = await Ship.create( {name: 'C', size: 3, location:[],player: userInfo._id,
      });
      const shipInfoD = await Ship.create( {name: 'D',size: 2, location:[], player: userInfo._id,
      });
      const shipInfoS = await Ship.create( {name: 'S', size: 1, location:[], player: userInfo._id,
      });
      const boardInfo = await Board.create({type: 'primary', player: userInfo._id,
        });

      const placeShip = await mockRequest.get('/setup/D-C1-D').auth('foo', 'bar');
      const updatedShip = await Ship.findById(shipInfoD._id);
      expect(updatedShip.location[1]).toBe('d0');
    });

    it('should poplulate the board with the ships location when ships direction is down', async () => {

      const userInfo = await User.create( {username: 'foo', password: 'bar',
      });
      const shipInfoA = await Ship.create( {name: 'A', size: 5, location:[], player: userInfo._id,
      });
      const shipInfoB = await Ship.create( {name: 'B', size: 4, location:[], player: userInfo._id,
      });
      const shipInfoC = await Ship.create( {name: 'C', size: 3, location:[],player: userInfo._id,
      });
      const shipInfoD = await Ship.create( {name: 'D',size: 2, location:[], player: userInfo._id,
      });
      const shipInfoS = await Ship.create( {name: 'S', size: 1, location:[], player: userInfo._id,
      });
      const boardInfo = await Board.create({type: 'primary', player: userInfo._id,
        });

      const placeShip = await mockRequest.get('/setup/S-C1-D').auth('foo', 'bar');
      const updatedShip = await Ship.findById(shipInfoS._id);
      expect(updatedShip.location[0]).toBe('c0');
    });
  });
});
