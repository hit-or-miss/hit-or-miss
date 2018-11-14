import mongoose from 'mongoose';
// import bcrypt from 'bcrypt';
// FIXME: temporary adjustment hashing for David's Win32 issue
import bcrypt from '../middleware/hashing.js';
import jwt from 'jsonwebtoken';

const userSchema = new mongoose.Schema({
  username: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  role: { type: String, default: 'user', enum: ['admin', 'user'] },
  online: Boolean,
  opponent: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  stats: {
    wins: Number,
    losses: Number,
    ratio: Number,
  },
});

const capabilities = {
  user: ['play'],
  admin: ['play', 'delete'],
};

userSchema.pre('save', function (next) {
  bcrypt.hash(this.password, 10)
    .then(hashedPassword => {
      this.password = hashedPassword;
      next();
    })
    .catch(error => { throw error; });
});

userSchema.methods.can = function (capability) {
  return capabilities[this.role].includes(capability);
};

userSchema.statics.authenticateBasic = function (auth) {
  let query = { username: auth.username };
  return this.findOne(query)
    .then(user => {
      return user && user.comparePassword(auth.password);
    })
    .catch(console.error);
};

userSchema.statics.authenticateToken = function (token) {
  let parsedToken = jwt.verify(token, process.env.APP_SECRET);
  // let parsedToken = jwt.verify(token, 'process.env.SECRET');
  let query = { _id: parsedToken.id };
  return this.findOne(query)
    .then(user => {
      return user;
    })
    .catch(error => error);
};

userSchema.methods.comparePassword = function (password) {
  return bcrypt.compare(password, this.password)
    .then(valid => valid ? this : null);
};

userSchema.methods.generateToken = function () {
  let tokenData = {
    id: this._id,
    capabilities: capabilities[this.role],
  };

  return jwt.sign(tokenData, process.env.APP_SECRET);
};

const User = mongoose.model('User', userSchema);

export default User;