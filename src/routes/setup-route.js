import express from 'express';

const setupRouter = express.Router();

import Board from '../models/board-model.js';
import Ship from '../models/ship-model.js';
import auth from '../middleware/auth.js';
//import error from '../middleware/error.js';

setupRouter.get('/setup', auth(), async (req, res) => {
  let userData = await Board.find({ type: 'primary', player: req.user._id });

  // If user already has a board setup, render that board
  if (userData.length > 0) {
    let data = await Board.find({ type: 'primary', player: req.user._id });

    // FIXME: David - Should we create a header row as part of the model so we can always be lined up?
    // FIXME: David - we talked about working with lowercase letters for everything.  Do you want to change?

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
    await Ship.create({ name: 'A', size: 5, player: req.user._id });
    await Ship.create({ name: 'B', size: 4, player: req.user._id });
    await Ship.create({ name: 'C', size: 3, player: req.user._id });
    await Ship.create({ name: 'D', size: 2, player: req.user._id });
    await Ship.create({ name: 'S', size: 1, player: req.user._id });
    //render a new board
    let data = await Board.create({
      type: 'primary', player: req.user._id, board: {
        A: [' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' '],
        B: [' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' '],
        C: [' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' '],
        D: [' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' '],
        E: [' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' '],
        F: [' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' '],
        G: [' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' '],
        H: [' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' '],
        I: [' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' '],
        J: [' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' '],
      }
    });
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

setupRouter.get('/setup/:place', auth(), async (req, res) => {
  let placeArray = req.params.place.split('-');
  let ship = await Ship.find({ name: placeArray[0], player: req.user._id });
  let size = ship[0].size;
  ship[0].location = [];
  if (placeArray[2] === 'R') {
    let initialLocation = placeArray[1];
    let startNum = parseInt(initialLocation.slice(1));
    let row = initialLocation[0];
    for (let i = startNum; i < startNum + size; i++) {
      ship[0].location.push(row + i);
    }
    await Ship.findOneAndUpdate({ name: placeArray[0], player: req.user._id }, { location: ship[0].location });
  }
  if (placeArray[2] === 'D') {
    let initialLocation = placeArray[1];
    let num = parseInt(initialLocation.slice(1));
    let row = initialLocation[0];
    // FIXME: David - lowercase?
    let rowArray = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J'];
    let startIndex = rowArray.findIndex(x => x === row);
    for (let i = startIndex; i < startIndex + size; i++) {
      ship[0].location.push(rowArray[i] + num);
    }
    await Ship.findOneAndUpdate({ name: placeArray[0], player: req.user._id }, { location: ship[0].location });
  }
  res.send(ship[0].location);

  await Board.findOneAndUpdate({ type: 'primary', player: req.user._id },
    {
      board: {
        A: [' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' '],
        B: [' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' '],
        C: [' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' '],
        D: [' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' '],
        E: [' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' '],
        F: [' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' '],
        G: [' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' '],
        H: [' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' '],
        I: [' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' '],
        J: [' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' '],
      },
    });

});



export default setupRouter;
