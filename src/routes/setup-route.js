import express from 'express';

const setupRouter = express.Router();

import Board from '../models/board-model.js';
import Ship from '../models/ship-model.js';
import auth from '../middleware/auth.js';
//import error from '../middleware/error.js';

setupRouter.get('/setup', auth(), async (req, res) => {
  let userData = await Board.find({type:'primary', player:req.user._id});
  // If user already has a board setup, render that board
  if (userData.length > 0) {
    let data = await Board.find({type:'primary', player:req.user._id});
    res.write('    1  2  3  4  5  6  7  8  9  10\n');
    res.write('A' + data[0].board.A.join('  ') + '\n');
    res.write('B' + data[0].board.B.join('  ') + '\n');
    res.write('C' + data[0].board.C.join('  ') + '\n');
    res.write('D' + data[0].board.D.join('  ') + '\n');
    res.write('E' + data[0].board.E.join('  ') + '\n');
    res.write('F' + data[0].board.F.join('  ') + '\n');
    res.write('G' + data[0].board.G.join('  ') + '\n');
    res.write('H' + data[0].board.H.join('  ') + '\n');
    res.write('I' + data[0].board.I.join('  ') + '\n');
    res.write('J' + data[0].board.J.join('  ') + '\n');
    res.end();
  }
  else if (userData.length === 0) {
    await Ship.create({name:'Aircraft Carrier', size: 5, player:req.user._id});
    await Ship.create({name:'Battleship', size: 4, player: req.user._id});
    await Ship.create({name:'Carrier', size: 3, player: req.user._id});
    await Ship.create({name:'Destroyer', size: 2, player: req.user._id});
    await Ship.create({name:'Submarine', size: 1, player: req.user._id});
    //render a new board
    let data = await Board.create({type:'primary', player:req.user._id, board: {
      A: [ ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', 'A'],
      B: [ ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', 'A'],
      C: [ ' ', ' ', ' ', ' ', ' ', ' ', 'D', ' ', ' ', 'A'],
      D: [ ' ', ' ', ' ', ' ', ' ', ' ', 'D', ' ', ' ', 'A'],
      E: [ ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', 'A'],
      F: [ ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' '],
      G: [ ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' '],
      H: [ ' ', ' ', ' ', ' ', ' ', 'C', 'C', 'C', ' ', ' '],
      I: [ ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' '],
      J: [ ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' '],
    }});
    res.write('    1  2  3  4  5  6  7  8  9  10\n');
    res.write('A' + data.board.A.join('  ') + '\n');
    res.write('B' + data.board.B.join('  ') + '\n');
    res.write('C' + data.board.C.join('  ') + '\n');
    res.write('D' + data.board.D.join('  ') + '\n');
    res.write('E' + data.board.E.join('  ') + '\n');
    res.write('F' + data.board.F.join('  ') + '\n');
    res.write('G' + data.board.G.join('  ') + '\n');
    res.write('H' + data.board.H.join('  ') + '\n');
    res.write('I' + data.board.I.join('  ') + '\n');
    res.write('J' + data.board.J.join('  ') + '\n');
    res.end();
  }
});

setupRouter.get('/setup/:place', auth(), (req, res) => {
  Board.find({type:'primary', player:req.user._id});
   
});



export default setupRouter;
