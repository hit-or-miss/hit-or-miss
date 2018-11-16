'use strict';
import mongoose from 'mongoose';

// This is the schema for the ship model, we'll have access to the ship's name, size, location, which ship belongs to which player, and if a ship has been sunk.

const shipSchema = new mongoose.Schema({
  name: { type: String, required: true },
  size: { type: Number, required: true },
  location: { type: Array },
  sunk: { type: Boolean, required: true, default: false },
  player: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
});

const Ship = mongoose.model('Ships', shipSchema);

export default Ship;