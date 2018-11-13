'use strict';
import mongoose from 'mongoose';

const shipSchema = new mongoose.Schema({
  name: { type: String, required: true },
  size: { type: Number, required: true },
  location: { type: Array },
  sunk: { type: Boolean, required: true, default: false },
  player: { type: mongoose.Schema.Types.ObjectId, ref: 'Player' },
});

const Ship = mongoose.model('Ships', shipSchema);

export default Ship;