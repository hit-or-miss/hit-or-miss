'use strict';

import express from 'express';

// TODO: I think we need to evaluate the naming here.
const fireRouter = express.Router();

import Ship from '../models/ship-model.js';
import Board from '../models/board-model.js';
import auth from '../middleware/auth';

// TODO: Create a route for /play/:fire 
fireRouter.get('/play/:fire', auth(), async (request, response, next) => {

  // Grab the request.params of :fire
  const coordinates = request.params.fire;

  // if(coordinates.length > 2) return response.send('Please enter a letter and a number for the firing position');

  console.log(coordinates); // verifies we are grabbing the coordinates for the shot.
  console.log(request.user); // logs out the user making the request
  console.log(request.user._id);
  // console.log(request.user._id);

  // TODO: Grab all the Ships associated with the User's _id
  let userShips = await Ship.find({ player: request.user._id});
  console.log(userShips);

  for(let i = 0; i < userShips.length; i++){
    if(userShips[i].location.includes(coordinates)){
      console.log('BEFORE',userShips[i].location);

      let shipHit = userShips[i].location.indexOf(coordinates);
      userShips[i].location.splice(shipHit, 1);
      console.log('AFTER',userShips[i].location);
      console.log('USER SHIP [i]',userShips[i]);

      if(userShips[i].location.length === 0){
        userShips[i].sunk = true;
      }

      await Ship.findByIdAndUpdate(userShips[i]._id, userShips[i], {new:true});
      console.log('AFTER UPDATE',userShips[i]);

      break;
    } else {
      console.log('NO SHIPS MATCH COORDINATES');
    }
    // console.log(userShips[i].location);
  }

  Ship.find({ player: request.user._id}).then(userShips => {
    console.log(userShips);
  });
  console.log('hello');
  // console.log(userShips);


  // TODO: verify the request.params of :fire matches a Ship "Location"

  // if (Ship.location.includes(coordinates)) {

  //   // TODO: If it does match, splice from the Ship "Location" array AND mark the board with _____

  //   let shipHit = Ship.location.indexOf(coordinates);

  //   Ship.location.splice(shipHit, 1);

  //   // let boardHit =
  //   //   response.send(Board.board);
  // }
  response.send('End of game route.');
});


// TODO: If it does not match, report back to player with "MISS" AND mark the board with _____

// TODO: GAME OVER STATE


// TODO: Continiously check the "Location" of all Ship's


// TODO: If all Ship's "Location" are NOT empty, continue with game


// TODO: If all Ship's "Location" are empty then Respond with GAME OVER



export default fireRouter;