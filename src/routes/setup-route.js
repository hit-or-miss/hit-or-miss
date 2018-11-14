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
    res.write('A' + data[0].board.a.join('  ') + '\n');
    res.write('B' + data[0].board.b.join('  ') + '\n');
    res.write('C' + data[0].board.c.join('  ') + '\n');
    res.write('D' + data[0].board.d.join('  ') + '\n');
    res.write('E' + data[0].board.e.join('  ') + '\n');
    res.write('F' + data[0].board.f.join('  ') + '\n');
    res.write('G' + data[0].board.g.join('  ') + '\n');
    res.write('H' + data[0].board.h.join('  ') + '\n');
    res.write('I' + data[0].board.i.join('  ') + '\n');
    res.write('J' + data[0].board.j.join('  ') + '\n');
    res.end();
  }
  else if (userData.length === 0) {
    await Ship.create({ name: 'A', size: 5, player: req.user._id });
    await Ship.create({ name: 'B', size: 4, player: req.user._id });
    await Ship.create({ name: 'C', size: 3, player: req.user._id });
    await Ship.create({ name: 'D', size: 2, player: req.user._id });
    await Ship.create({ name: 'S', size: 1, player: req.user._id });
    //render a new board
    let data = await Board.create({type: 'primary', player: req.user._id, board: {
      a: [' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' '],
      b: [' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' '],
      c: [' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' '],
      d: [' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' '],
      e: [' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' '],
      f: [' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' '],
      g: [' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' '],
      h: [' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' '],
      i: [' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' '],
      j: [' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' '],
    }});
    res.write('    1  2  3  4  5  6  7  8  9  10\n');
    res.write('A' + data.board.a.join('  ') + '\n');
    res.write('B' + data.board.b.join('  ') + '\n');
    res.write('C' + data.board.c.join('  ') + '\n');
    res.write('D' + data.board.d.join('  ') + '\n');
    res.write('E' + data.board.e.join('  ') + '\n');
    res.write('F' + data.board.f.join('  ') + '\n');
    res.write('G' + data.board.g.join('  ') + '\n');
    res.write('H' + data.board.h.join('  ') + '\n');
    res.write('I' + data.board.i.join('  ') + '\n');
    res.write('J' + data.board.j.join('  ') + '\n');
    res.end();
  }
});

setupRouter.get('/setup/:place', auth(), async (req, res) => {
  let placeArray = req.params.place.split('-');
  let ship = await Ship.findOne({name:placeArray[0], player: req.user._id});
  let size = ship.size;
  ship.location = [];

  // Update ship location array with coordinates going right
  if (placeArray[2] === 'R') {
    let initialLocation = placeArray[1];
    let startNum = parseInt(initialLocation.slice(1));
    let row = initialLocation[0].toLowerCase();
    if (startNum + size > 11) {
      res.write('Bad request\n\n');
    }
    else {
      for (let i = startNum; i < startNum + size; i++) {
        ship.location.push(row + i);
      }
      await Ship.findOneAndUpdate({name:placeArray[0], player: req.user._id}, {location: ship.location});
    }
  }

  // Update ship location array with coordinates going left
  if (placeArray[2] === 'L') {
    let initialLocation = placeArray[1];
    let startNum = parseInt(initialLocation.slice(1));
    let row = initialLocation[0].toLowerCase();
    if (startNum - size < 0) {
      res.write('Bad request\n\n');
    }
    else {
      for (let i = startNum - size + 1; i <= startNum; i++) {
        ship.location.push(row + i);
      }
      await Ship.findOneAndUpdate({name:placeArray[0], player: req.user._id}, {location: ship.location});
    }
  }

  // Update ship location array with coordinates going down
  if (placeArray[2] === 'D') {
    let initialLocation = placeArray[1];
    let num = parseInt(initialLocation.slice(1));
    let row = initialLocation[0].toLowerCase();
    let rowArray = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j'];
    let startIndex = rowArray.findIndex(x => x === row);
    if (startIndex + size > 10) {
      res.write('Bad request\n\n');
    }
    else {
      for (let i = startIndex; i < startIndex + size; i++) {
        ship.location.push(rowArray[i] + num);
      }
      await Ship.findOneAndUpdate({name:placeArray[0], player: req.user._id}, {location: ship.location});
    }  
  }

  // Update ship location array with coordinates going up
  if (placeArray[2] === 'U') {
    let initialLocation = placeArray[1];
    let num = parseInt(initialLocation.slice(1));
    let row = initialLocation[0].toLowerCase();
    let rowArray = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j'];
    let startIndex = rowArray.findIndex(x => x === row);
    if (startIndex - size < -1) {
      res.write('Bad request\n\n');
    }
    else {
      for (let i = startIndex - size + 1; i <= startIndex; i++) {
        ship.location.push(rowArray[i] + num);
      }
      await Ship.findOneAndUpdate({name:placeArray[0], player: req.user._id}, {location: ship.location});
    }
  }

  // Clear the primary board before placing the ships
  let primary = await Board.findOneAndUpdate({type:'primary', player:req.user._id},
    { board: {
      a: [ ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' '],
      b: [ ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' '],
      c: [ ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' '],
      d: [ ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' '],
      e: [ ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' '],
      f: [ ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' '],
      g: [ ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' '],
      h: [ ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' '],
      i: [ ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' '],
      j: [ ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' '],
    } }, { new: true });

  // Find aircraft carrier location and place it on primary board
  let shipA = await Ship.findOne({name:'A', player:req.user._id}); 
  let locationA = shipA.location;
  if (locationA.length > 0) {
    for (let i = 0; i < locationA.length; i++) {
      let row = locationA[i][0].toLowerCase();
      let col = locationA[i].slice(1);
      primary.board[row][col] = shipA.name;
    }
  }

  // Find battleship location and place it on primary board
  let shipB = await Ship.findOne({name:'B', player:req.user._id});
  let locationB = shipB.location;
  if (locationB.length > 0) {
    for (let i = 0; i < locationB.length; i++) {
      let row = locationB[i][0].toLowerCase();
      let col = locationB[i].slice(1);
      primary.board[row][col] = shipB.name;
    }
  }

  // Find cruiser location and place it on primary board
  let shipC = await Ship.findOne({name:'C', player:req.user._id});
  let locationC = shipC.location;
  if (locationC.length > 0) {
    for (let i = 0; i < locationC.length; i++) {
      let row = locationC[i][0].toLowerCase();
      let col = locationC[i].slice(1);
      primary.board[row][col] = shipC.name;
    }
  }

  // Find destroyer location and place it on primary board
  let shipD = await Ship.findOne({name:'D', player:req.user._id});
  let locationD = shipD.location;
  if (locationD.length > 0) {
    for (let i = 0; i < locationD.length; i++) {
      let row = locationD[i][0].toLowerCase();
      let col = locationD[i].slice(1);
      primary.board[row][col] = shipD.name;
    }
  }

  // Find submarine location and place it on primary board
  let shipS = await Ship.findOne({name:'S', player:req.user._id});
  let locationS = shipS.location;
  if (locationS.length > 0) {
    for (let i = 0; i < locationS.length; i++) {
      let row = locationS[i][0].toLowerCase();
      let col = locationS[i].slice(1);
      primary.board[row][col] = shipS.name;
    }
  }

  // Render the board for the user to see
  let print = await Board.findOneAndUpdate({type:'primary', player:req.user._id},
    { board: primary.board }, { new: true });

  res.write('    1  2  3  4  5  6  7  8  9  10\n');
  res.write('A' + print.board.a.join('  ') + '\n');
  res.write('B' + print.board.b.join('  ') + '\n');
  res.write('C' + print.board.c.join('  ') + '\n');
  res.write('D' + print.board.d.join('  ') + '\n');
  res.write('E' + print.board.e.join('  ') + '\n');
  res.write('F' + print.board.f.join('  ') + '\n');
  res.write('G' + print.board.g.join('  ') + '\n');
  res.write('H' + print.board.h.join('  ') + '\n');
  res.write('I' + print.board.i.join('  ') + '\n');
  res.write('J' + print.board.j.join('  ') + '\n');
  res.end();
});

export default setupRouter;
