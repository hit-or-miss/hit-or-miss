'use strict';

import express from 'express';

const fireRouter = express.Router();

import Ship from '../models/ship-model.js';
import Board from '../models/board-model.js';

// TODO: Create a route for /play/:fire 
fireRouter.post('/play/:fire', (request, response) => {
  // TODO: grab the request.params of :fire
  const coordinates = request.params;
  // TODO: verify the request.params of :fire matches a Ship "Location"
  if(Ship.location.includes(coordinates)) {
    //eslint-disable-next-line
      // TODO: If it does match, splice from the Ship "Location" array AND mark the board with _____
    let shipHit = Ship.location.indexOf(coordinates);
    Ship.location.splice(shipHit, 1);
    let boardHit = 
    response.send(Board.board.)
  }
});
//eslint-disable-next-line
  // TODO: If it does not match, report back to player with "MISS" AND mark the board with _____
// TODO: GAME OVER STATE
//eslint-disable-next-line
  // TODO: Continiously check the "Location" of all Ship's
//eslint-disable-next-line
    // TODO: If all Ship's "Location" are NOT empty, continue with game
//eslint-disable-next-line
    // TODO: If all Ship's "Location" are empty then Respond with GAME OVER