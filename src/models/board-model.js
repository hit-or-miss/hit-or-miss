'use strict';
import mongoose from 'mongoose';

const boardSchema = new mongoose.Schema({
  type: { type: String, required: true },
  player: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  board: {
    A: Array,
    B: Array,
    C: Array,
    D: Array,
    E: Array,
    F: Array,
    G: Array,
    H: Array,
    I: Array,
    J: Array,
  },
});

const Board = mongoose.model('Boards', boardSchema);

export default Board;