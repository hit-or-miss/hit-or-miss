'use strict';

import express from 'express';

// TODO: I think we need to evaluate the naming here.
const fireRouter = express.Router();

import Ship from '../models/ship-model.js';
import Board from '../models/board-model.js';
import auth from '../middleware/auth';

// TODO: Create a route for /play/:fire 
fireRouter.get('/play/:fire', auth('play'), (request, response, next) => {

  // Grab the request.params of :fire
  const coordinates = request.params.fire;

  console.log(coordinates);
  console.log(request.user);

  // TODO: verify the request.params of :fire matches a Ship "Location"

  if (Ship.location.includes(coordinates)) {

    // TODO: If it does match, splice from the Ship "Location" array AND mark the board with _____

    let shipHit = Ship.location.indexOf(coordinates);

    Ship.location.splice(shipHit, 1);

    let boardHit =
      response.send(Board.board);
  }
});


// TODO: If it does not match, report back to player with "MISS" AND mark the board with _____

// TODO: GAME OVER STATE


// TODO: Continiously check the "Location" of all Ship's


// TODO: If all Ship's "Location" are NOT empty, continue with game


// TODO: If all Ship's "Location" are empty then Respond with GAME OVER



export default fireRouter;