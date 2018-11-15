'use strict';

import express from 'express';

// TODO: I think we need to evaluate the naming here.
const fireRouter = express.Router();

import User from '../models/user-model.js';
import Ship from '../models/ship-model.js';
import Board from '../models/board-model.js';
import auth from '../middleware/auth';

// TODO: Create a route for /play/:fire 
fireRouter.get('/play/:fire', auth(), async (request, response, next) => {

  let computer = await User.findOne({ username: 'Computer' });
  //console.log('COMPUTER', computer);
  // Grab the request.params of :fire
  let coordinates = request.params.fire.toLowerCase();
  // coordinates;
  
  let tracking3 = await Board.findOne({ type: 'tracking', player: request.user._id });
  if(tracking3.pastHits.includes(coordinates)){
    response.write('This shot has already been taken, please shoot somewhere else\n');
  }
  tracking3.pastHits.push(coordinates);
  await Board.findOneAndUpdate({ type: 'tracking', player: request.user._id }, { pastHits: tracking3.pastHits });
  console.log(tracking3.pastHits);

  const row = coordinates[0];
  const col = parseInt(coordinates.slice(1)) - 1;

  coordinates = row + col; // this fixes an off by one error in the for loop below

  // if(coordinates.length > 3) return response.send('Please enter a letter and a number for the firing position');

  console.log(coordinates); // verifies we are grabbing the coordinates for the shot.
  // console.log(request.user); // logs out the user making the request
  // console.log(request.user._id);
  // console.log(request.user._id);

  // TODO: Grab all the Ships associated with the User's _id
  let computerShips = await Ship.find({ player: computer._id} );
  console.log(computerShips);

  let tracker;
  

  for(let i = 0; i < computerShips.length; i++){
    if(computerShips[i].location.includes(coordinates)){
      console.log('BEFORE',computerShips[i].location);
      
      let shipHit = computerShips[i].location.indexOf(coordinates);
      computerShips[i].location.splice(shipHit, 1);
      console.log('AFTER',computerShips[i].location);
      console.log('USER SHIP [i]',computerShips[i]);
      
      if(computerShips[i].location.length === 0){
        computerShips[i].sunk = true;
      }
      
      await Ship.findByIdAndUpdate(computerShips[i]._id, computerShips[i], {new:true});
      console.log('AFTER UPDATE',computerShips[i]);
      
      let tracking1 = await Board.findOne({ type: 'tracking', player: request.user._id });  //A5 turn into 'X');

      tracking1.board[row][col] = 'X';

      tracker = await Board.findOneAndUpdate({ type: 'tracking', player: request.user._id }, { board: tracking1.board }, { new: true });

      break;
    } else if (i === computerShips.length - 1) {
      let tracking2 = await Board.findOne({ type: 'tracking', player: request.user._id });  //A5 turn into 'X');

      tracking2.board[row][col] = 'O';

      tracker = await Board.findOneAndUpdate({ type: 'tracking', player: request.user._id }, { board: tracking2.board }, { new: true });

      console.log('NO SHIPS MATCH COORDINATES');
      break;
    }
    // console.log(computerShips[i].location);

  }
/*
  let tracking = await Board.findOne({ type: 'tracking', player: request.user._id });
  console.log('TRACKING BOARD',tracking);
  */
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


  let primary = await Board.findOne({ type: 'primary', player: request.user._id });

  console.log('PRIMARY BOARD',primary);
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



  // Ship.find({ player: request.user._id}).then(computerShips => {
  //   console.log(computerShips);
  // });
  console.log('hello');
  // console.log(computerShips);
  
  
  // TODO: verify the request.params of :fire matches a Ship "Location"
  
  // if (Ship.location.includes(coordinates)) {
    
  //   // TODO: If it does match, splice from the Ship "Location" array AND mark the board with _____
    
  //   let shipHit = Ship.location.indexOf(coordinates);
    
  //   Ship.location.splice(shipHit, 1);
    
  //   // let boardHit =
  //   //   response.send(Board.board);
  // }
  //response.send('End of game route.');
});


// TODO: If it does not match, report back to player with "MISS" AND mark the board with _____

// TODO: GAME OVER STATE


// TODO: Continiously check the "Location" of all Ship's


// TODO: If all Ship's "Location" are NOT empty, continue with game


// TODO: If all Ship's "Location" are empty then Respond with GAME OVER



export default fireRouter;