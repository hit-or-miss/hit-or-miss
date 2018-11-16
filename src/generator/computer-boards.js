'use strict';

import Board from '../models/board-model.js';
import CompUser from './computer-user.js';


// CREATING THE TRACKING BOARD ATTACHED TO THE COMPUTER USER
async function createComputerTrackingBoard() {
  return await Board.create({type: 'tracking', player:  CompUser._id, board: {
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
}

// CREATING THE PRIMARY BOARD ATTACHED TO THE COMPUTER USER
async function createComputerPrimaryBoard() {
  return await Board.create({type: 'tracking', player: CompUser._id, board: {
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
  }});
}

const trackingBoard = createComputerTrackingBoard().then( board => { return board; }).catch(console.error);
const primaryBoard = createComputerPrimaryBoard().then( board => { return board; }).catch(console.error);

export default {
  trackingBoard,
  primaryBoard,
};