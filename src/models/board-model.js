'use strict';
import mongoose from 'mongoose';

const boardSchema = new mongoose.Schema({
  type: { type: String, required: true },
  board: {
    a: Array,
    b: Array,
    c: Array,
    d: Array,
    e: Array,
    f: Array,
    g: Array,
    h: Array,
    i: Array,
    j: Array,
  },
  pastHits: Array,
  player: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
});

const Board = mongoose.model('Boards', boardSchema);

export default Board;