'use strict';

import express from 'express';

const fireRouter = express.Router();

import User from '../models/user-model.js';
import Ship from '../models/ship-model.js';
import Board from '../models/board-model.js';
import auth from '../middleware/auth';

// This will be creating a route for firing at a ship during gameplay :

// The route is being created for users to pass in certain coordinates.

fireRouter.get('/play/:fire', auth(), async (request, response, next) => {

  let tracker = await Board.findOne({ type: 'tracking', player: request.user._id });
  let computer = await User.findOne({ username: 'Computer' });

  let coordinates = request.params.fire.toLowerCase();


  // Handling the multiple shots by checking the tracking board for previous hits.

  let tracking3 = await Board.findOne({ type: 'tracking', player: request.user._id });
  if (tracking3.pastHits.includes(coordinates)){
    response.write('This shot has already been taken, please shoot somewhere else\n');
  }
  else {
    tracking3.pastHits.push(coordinates);
    await Board.findOneAndUpdate({ type: 'tracking', player: request.user._id }, {   pastHits: tracking3.pastHits });
  
    const row = coordinates[0];
    const col = parseInt(coordinates.slice(1)) - 1;
  
    coordinates = row + col; // This fixes an off by one error in the for loop below
  
    // This will find all the Ships associated with the User's _id.

    let computerShips = await Ship.find({ player: computer._id} );

    // Checking each ship to see if their coordinates match the firing coordinates :

    for(let i = 0; i < computerShips.length; i++){

      // If the coordinates match a ships location then it will update as a hit.

      if(computerShips[i].location.includes(coordinates)){
        
        let shipHit = computerShips[i].location.indexOf(coordinates);
        computerShips[i].location.splice(shipHit, 1);
        
        if (computerShips[i].location.length === 0){
          computerShips[i].sunk = true;
          await Ship.findOneAndUpdate({name: computerShips[i].name, player: computer._id }, { sunk: true }, { new: true });
        }
        // Checking to see if all of the ships have sunk, if so then you win!!!

        let shipArray = await Ship.find({player: computer._id});
        for (let i = 0; i < shipArray.length; i++) {
          if (shipArray[i].sunk === false) {
            break;
          }
          if (i === shipArray.length - 1 && shipArray[i].sunk === true) {
            response.write('YOU WIN!!!\n');
          }
        }
        // If there is a hit, it will render an X on the tracking board, if it's a miss then it will render an O.

        await Ship.findByIdAndUpdate(computerShips[i]._id, computerShips[i], {new:true});
        
        let tracking1 = await Board.findOne({ type: 'tracking', player: request.user._id });
  
        tracking1.board[row][col] = 'X';
  
        tracker = await Board.findOneAndUpdate({ type: 'tracking', player: request.user._id   }, { board: tracking1.board }, { new: true });
  
        break;
      } else if (i === computerShips.length - 1) {
        let tracking2 = await Board.findOne({ type: 'tracking', player: request.user._id });
  
        tracking2.board[row][col] = 'O';
  
        tracker = await Board.findOneAndUpdate({ type: 'tracking', player: request.user._id   }, { board: tracking2.board }, { new: true });
  
        break;
      }
    }
  }
  // This shows the user their updated tracking board.

  response.write('TRACKING BOARD\n');
  response.write('  1  2  3  4  5  6  7  8  9  10\n');
  response.write('A ' + tracker.board.a.join('  ') + '\n');
  response.write('B ' + tracker.board.b.join('  ') + '\n');
  response.write('C ' + tracker.board.c.join('  ') + '\n');
  response.write('D ' + tracker.board.d.join('  ') + '\n');
  response.write('E ' + tracker.board.e.join('  ') + '\n');
  response.write('F ' + tracker.board.f.join('  ') + '\n');
  response.write('G ' + tracker.board.g.join('  ') + '\n');
  response.write('H ' + tracker.board.h.join('  ') + '\n');
  response.write('I ' + tracker.board.i.join('  ') + '\n');
  response.write('J ' + tracker.board.j.join('  ') + '\n\n');

  // This will randomly generate computer's firing at the user's ships.

  let array = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j'];
  let random1 = Math.floor(Math.random() * 10);
  let random2 = Math.floor(Math.random() * 10);
  let shotrow = array[random1];
  let shotcol = random2.toString();
  let shot = shotrow + shotcol;
  
  let userShips = await Ship.find({ player: request.user._id} );

  for(let i = 0; i < userShips.length; i++){
    if(userShips[i].location.includes(shot)){
      
      let shipHit = userShips[i].location.indexOf(shot);
      userShips[i].location.splice(shipHit, 1);
      
      if (userShips[i].location.length === 0){
        userShips[i].sunk = true;
        await Ship.findOneAndUpdate({name: userShips[i].name, player: request.user._id }, { sunk: true }, { new: true });
      } 
      // If all of the user's ships sink then they lose!!!

      let shipArray = await Ship.find({player: request.user._id});
      for (let i = 0; i < shipArray.length; i++) {
        if (shipArray[i].sunk === false) {
          break;
        }
        if (i === shipArray.length - 1 && shipArray[i].sunk === true) {
          response.write('YOU LOST!!!\n');
          response.end();
        }
      }
      // If there is a hit, it will render an X on the primary board, if it's a miss then it will render an O.

      await Ship.findByIdAndUpdate(userShips[i]._id, userShips[i], {new:true});
      
      let primary1 = await Board.findOne({ type: 'primary', player: request.user._id });

      primary1.board[shotrow][shotcol] = 'X';

      tracker = await Board.findOneAndUpdate({ type: 'primary', player: request.user._id   }, { board: primary1.board }, { new: true });

      break;
    } else if (i === userShips.length - 1) {

      let primary2 = await Board.findOne({ type: 'primary', player: request.user._id });

      primary2.board[shotrow][shotcol] = 'O';

      tracker = await Board.findOneAndUpdate({ type: 'primary', player: request.user._id   }, { board: primary2.board }, { new: true });

      break;
    }
  }
  // This shows the user the updated primary board.

  let primary = await Board.findOne({ type: 'primary', player: request.user._id });

  response.write('PRIMARY BOARD\n');
  response.write('  1  2  3  4  5  6  7  8  9  10\n');
  response.write('A ' + primary.board.a.join('  ') + '\n');
  response.write('B ' + primary.board.b.join('  ') + '\n');
  response.write('C ' + primary.board.c.join('  ') + '\n');
  response.write('D ' + primary.board.d.join('  ') + '\n');
  response.write('E ' + primary.board.e.join('  ') + '\n');
  response.write('F ' + primary.board.f.join('  ') + '\n');
  response.write('G ' + primary.board.g.join('  ') + '\n');
  response.write('H ' + primary.board.h.join('  ') + '\n');
  response.write('I ' + primary.board.i.join('  ') + '\n');
  response.write('J ' + primary.board.j.join('  ') + '\n');
  response.end();  
});

export default fireRouter;