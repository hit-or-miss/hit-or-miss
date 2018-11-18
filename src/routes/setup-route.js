import express from 'express';

const setupRouter = express.Router();

import User from '../models/user-model.js';
import Board from '../models/board-model.js';
import Ship from '../models/ship-model.js';
import auth from '../middleware/auth.js';
import error400 from '../middleware/400.js';
import error from '../middleware/404.js';

// Importing a way to create a Computer user and all ships and boards asscoiated with said user
import createComputerUser from '../generator/computer-user.js';
import Fleet from '../generator/computer-fleet.js';
import Boards from '../generator/computer-boards.js';
import userText from '../middleware/user-text.js';

// Clearing our tracking board and the array with the previous hits whenever the "/setup" path is used.

setupRouter.get('/setup', auth(), async (req, res) => {

  const setupHelpText = userText.setupHelp();
  res.write(setupHelpText);

  // Finds the User with a username of "Computer" and DELETEs it
  await User.findOneAndDelete({ username: 'Computer' });
  // Creates a user called "Computer"
  const computer = await createComputerUser();
  // Creates a fleet of ships for the "Computer"
  const fleet = new Fleet(computer);
  await fleet.init();
  // Creates BOTH boards for the "Computer"
  const boards = new Boards(computer);
  await boards.init();


  await Board.findOneAndUpdate({ type: 'tracking', player: req.user._id }, {
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
    }, pastHits: [],
  });

  // Checking if the player already has a primary board.

  let userData = await Board.find({ type: 'primary', player: req.user._id });

  // If user already has a board, this will render that pre-existing board.

  if (userData.length > 0) {
    let data = await Board.find({ type: 'primary', player: req.user._id });
    res.write('\n');
    res.write('PRIMARY BOARD\n');
    res.write('    1  2  3  4  5  6  7  8  9  10\n');
    res.write('A   ' + data[0].board.a.join('  ') + '\n');
    res.write('B   ' + data[0].board.b.join('  ') + '\n');
    res.write('C   ' + data[0].board.c.join('  ') + '\n');
    res.write('D   ' + data[0].board.d.join('  ') + '\n');
    res.write('E   ' + data[0].board.e.join('  ') + '\n');
    res.write('F   ' + data[0].board.f.join('  ') + '\n');
    res.write('G   ' + data[0].board.g.join('  ') + '\n');
    res.write('H   ' + data[0].board.h.join('  ') + '\n');
    res.write('I   ' + data[0].board.i.join('  ') + '\n');
    res.write('J   ' + data[0].board.j.join('  ') + '\n');
    res.end();
  }
  // If the user doesn't already have a board, this will create brand new ships for the user, new tracking board, and primary board.

  else if (userData.length === 0) {
    await Ship.create({ name: 'A', size: 5, player: req.user._id });
    await Ship.create({ name: 'B', size: 4, player: req.user._id });
    await Ship.create({ name: 'C', size: 3, player: req.user._id });
    await Ship.create({ name: 'S', size: 3, player: req.user._id });
    await Ship.create({ name: 'D', size: 2, player: req.user._id });

    await Board.create({
      type: 'tracking', player: req.user._id, board: {
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
      }, pastHits: [],
    });

    // This prints the primary board to the user.

    let print = await Board.create({
      type: 'primary', player: req.user._id, board: {
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
      }
    });
    res.write('\n');
    res.write('PRIMARY BOARD\n');
    res.write('  1  2  3  4  5  6  7  8  9  10\n');
    res.write('A ' + print.board.a.join('  ') + '\n');
    res.write('B ' + print.board.b.join('  ') + '\n');
    res.write('C ' + print.board.c.join('  ') + '\n');
    res.write('D ' + print.board.d.join('  ') + '\n');
    res.write('E ' + print.board.e.join('  ') + '\n');
    res.write('F ' + print.board.f.join('  ') + '\n');
    res.write('G ' + print.board.g.join('  ') + '\n');
    res.write('H ' + print.board.h.join('  ') + '\n');
    res.write('I ' + print.board.i.join('  ') + '\n');
    res.write('J ' + print.board.j.join('  ') + '\n');

    res.end();
  }
});

// When the user is placing a ship onto the primary board :

setupRouter.get('/setup/:place', auth(), async (req, res) => { //B-B6-R
  let placeArray = req.params.place.split('-');

  // The user will choose A, B, C, D, and S for the ship types and handle incorrect types.

  if (placeArray[0] !== 'A' && placeArray[0] !== 'B' && placeArray[0] !== 'C' && placeArray[0] !== 'D' && placeArray[0] !== 'S') {
    error(req, res);
    return;
  }

  let ship = await Ship.findOne({ name: placeArray[0], player: req.user._id });
  let size = ship.size;
  ship.location = [];

  // This will handle an invalid direction for the ships to be placed.

  if (placeArray[2] !== 'R' && placeArray[2] !== 'L' && placeArray[2] !== 'U' && placeArray[2] !== 'D') {
    error400(req, res);
    return;
  }

  // This will update the ship's location in the array with the coordinates going to the right.

  if (placeArray[2] === 'R') {
    let initialLocation = placeArray[1];
    let startNum = parseInt(initialLocation.slice(1)) - 1;
    let row = initialLocation[0].toLowerCase();
    if (startNum + size > 10) {
      res.write('Please place your ship on the board\n\n');
    }
    else {
      for (let i = startNum; i < startNum + size; i++) {
        ship.location.push(row + i);
      }
      let alreadyPlacedShips = await Ship.find({ player: req.user._id });
      let overlapping = false;
      for (let i = 0; i < alreadyPlacedShips.length; i++) {
        if (alreadyPlacedShips[i].name !== placeArray[0]) {
          for (let j = 0; j < ship.location.length; j++) {
            if (alreadyPlacedShips[i].location.includes(ship.location[j])) {
              res.write('No overlapping ships!\n');
              overlapping = true;
            }
          }
        }
      }
      if (overlapping === false) {
        await Ship.findOneAndUpdate({ name: placeArray[0], player: req.user._id }, { location: ship.location }, { new: true });
      }
    }
  }

  // This will update the ship's location in the array with the coordinates going to the left.

  if (placeArray[2] === 'L') {
    let initialLocation = placeArray[1];
    let startNum = parseInt(initialLocation.slice(1)) - 1;
    let row = initialLocation[0].toLowerCase();
    if (startNum - size < -1) {
      res.write('Please place your ship on the board\n\n');
    }
    else {
      for (let i = startNum - size + 1; i <= startNum; i++) {
        ship.location.push(row + i);
      }
      let alreadyPlacedShips = await Ship.find({ player: req.user._id });
      let overlapping = false;
      for (let i = 0; i < alreadyPlacedShips.length; i++) {
        if (alreadyPlacedShips[i].name !== placeArray[0]) {
          for (let j = 0; j < ship.location.length; j++) {
            if (alreadyPlacedShips[i].location.includes(ship.location[j])) {
              res.write('No overlapping ships!\n');
              overlapping = true;
            }
          }
        }
      }
      if (overlapping === false) {
        await Ship.findOneAndUpdate({ name: placeArray[0], player: req.user._id }, { location: ship.location }, { new: true });
      }
    }
  }

  // This will update the ship's location in the array with the coordinates going down.

  if (placeArray[2] === 'D') {
    let initialLocation = placeArray[1];
    let num = parseInt(initialLocation.slice(1)) - 1;
    let row = initialLocation[0].toLowerCase();
    let rowArray = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j'];
    let startIndex = rowArray.findIndex(x => x === row);
    if (startIndex + size > 10) {
      res.write('Please place your ship on the board\n\n');
    }
    else {
      for (let i = startIndex; i < startIndex + size; i++) {
        ship.location.push(rowArray[i] + num);
      }
      let alreadyPlacedShips = await Ship.find({ player: req.user._id });
      let overlapping = false;
      for (let i = 0; i < alreadyPlacedShips.length; i++) {
        if (alreadyPlacedShips[i].name !== placeArray[0]) {
          for (let j = 0; j < ship.location.length; j++) {
            if (alreadyPlacedShips[i].location.includes(ship.location[j])) {
              res.write('No overlapping ships!\n');
              overlapping = true;
            }
          }
        }
      }
      if (overlapping === false) {
        await Ship.findOneAndUpdate({ name: placeArray[0], player: req.user._id }, { location: ship.location }, { new: true });
      }
    }
  }

  // This will update the ship's location in the array with the coordinates going up.

  if (placeArray[2] === 'U') {
    let initialLocation = placeArray[1];
    let num = parseInt(initialLocation.slice(1)) - 1;
    let row = initialLocation[0].toLowerCase();
    let rowArray = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j'];
    let startIndex = rowArray.findIndex(x => x === row);
    if (startIndex - size < -1) {
      res.write('Please place your ship on the board\n\n');
    }
    else {
      for (let i = startIndex - size + 1; i <= startIndex; i++) {
        ship.location.push(rowArray[i] + num);
      }
      let alreadyPlacedShips = await Ship.find({ player: req.user._id });
      let overlapping = false;
      for (let i = 0; i < alreadyPlacedShips.length; i++) {
        if (alreadyPlacedShips[i].name !== placeArray[0]) {
          for (let j = 0; j < ship.location.length; j++) {
            if (alreadyPlacedShips[i].location.includes(ship.location[j])) {
              res.write('No overlapping ships!\n');
              overlapping = true;
            }
          }
        }
      }
      if (overlapping === false) {
        await Ship.findOneAndUpdate({ name: placeArray[0], player: req.user._id }, { location: ship.location }, { new: true });
      }
    }
  }

  // This will clear the primary board before placing the ships the user has just chosen.

  let primary = await Board.findOneAndUpdate({ type: 'primary', player: req.user._id },
    {
      board: {
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
      }
    }, { new: true });

  // Now begins the placing of the user's ships on the cleared out primary board before gameplay :

  // This finds the user's aircraft carrier location and places it on primary board.

  let shipA = await Ship.findOne({ name: 'A', player: req.user._id });
  let locationA = shipA.location;
  if (locationA.length > 0) {
    for (let i = 0; i < locationA.length; i++) {
      let row = locationA[i][0].toLowerCase();
      let col = locationA[i].slice(1);
      primary.board[row][col] = shipA.name;
    }
  }

  // This finds the user's battleship location and places it on primary board.

  let shipB = await Ship.findOne({ name: 'B', player: req.user._id });
  let locationB = shipB.location;
  if (locationB.length > 0) {
    for (let i = 0; i < locationB.length; i++) {
      let row = locationB[i][0].toLowerCase();
      let col = locationB[i].slice(1);
      primary.board[row][col] = shipB.name;
    }
  }

  // This finds the user's cruiser location and places it on primary board.

  let shipC = await Ship.findOne({ name: 'C', player: req.user._id });
  let locationC = shipC.location;
  if (locationC.length > 0) {
    for (let i = 0; i < locationC.length; i++) {
      let row = locationC[i][0].toLowerCase();
      let col = locationC[i].slice(1);
      primary.board[row][col] = shipC.name;
    }
  }

  // This finds the user's destroyer location and places it on primary board.

  let shipD = await Ship.findOne({ name: 'D', player: req.user._id });
  let locationD = shipD.location;
  if (locationD.length > 0) {
    for (let i = 0; i < locationD.length; i++) {
      let row = locationD[i][0].toLowerCase();
      let col = locationD[i].slice(1);
      primary.board[row][col] = shipD.name;
    }
  }

  // This finds the user's submarine location and places it on primary board.

  let shipS = await Ship.findOne({ name: 'S', player: req.user._id });
  let locationS = shipS.location;
  if (locationS.length > 0) {
    for (let i = 0; i < locationS.length; i++) {
      let row = locationS[i][0].toLowerCase();
      let col = locationS[i].slice(1);
      primary.board[row][col] = shipS.name;
    }
  }

  // This will render the primary board for the user to see.

  let print = await Board.findOneAndUpdate({ type: 'primary', player: req.user._id },
    { board: primary.board }, { new: true });
  res.write('PRIMARY BOARD\n');
  res.write('  1  2  3  4  5  6  7  8  9  10\n');
  res.write('A ' + print.board.a.join('  ') + '\n');
  res.write('B ' + print.board.b.join('  ') + '\n');
  res.write('C ' + print.board.c.join('  ') + '\n');
  res.write('D ' + print.board.d.join('  ') + '\n');
  res.write('E ' + print.board.e.join('  ') + '\n');
  res.write('F ' + print.board.f.join('  ') + '\n');
  res.write('G ' + print.board.g.join('  ') + '\n');
  res.write('H ' + print.board.h.join('  ') + '\n');
  res.write('I ' + print.board.i.join('  ') + '\n');
  res.write('J ' + print.board.j.join('  ') + '\n');

  // This will alert the user when they have successfully placed all 5 of their ships. That is when they should proceed to play the game.

  let shipCheck = await Ship.find({ player: req.user._id });
  for (let i = 0; i < shipCheck.length; i++) {
    if (shipCheck[i].location.length === 0) {
      break;
    }
    else if (i === shipCheck.length - 1) {
      res.write('\n');
      res.write('You are ready to play!\n');
      res.write('START:  GET www.hitormiss.fun/play');
    }
  }
  res.end();
});

export default setupRouter;
