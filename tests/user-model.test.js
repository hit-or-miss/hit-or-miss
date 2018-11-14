import { startDB, stopDB } from './supergoose.js';

import User from '../src/models/user-model.js';

beforeAll(startDB);
afterAll(stopDB);

beforeEach(async () => {
  await User.deleteMany({});
});

const compInfo = { username: 'comp', password: 'ai' };

describe('Test the User Model', () => {

  it('should create a new user model', async () => {
    const computer = await User.create(compInfo);

    const userInfo = { username: 'foo', email: 'foo@bar.com', password: 'foobar', role: 'user', opponent: computer._id };

    const user = await User.create(userInfo);

    expect(user.username).toBe(userInfo.username);

  });

  it('should find a user', async () => {

    const computer = await User.create(compInfo);

    const userInfo = { username: 'foo', email: 'foo@bar.com', password: 'foobar', role: 'user', opponent: computer._id };

    const user = await User.create(userInfo);
    const foundUser = await User.findById(user._id);

    expect(foundUser.opponent).toEqual(computer._id);

  });

  it('should fail if username is missing', async () => {
    try {
      await User.create({ password: 'test' });
    } catch (error) {

      expect(error.message).toEqual(expect.stringContaining('User validation failed: username'));
    }

  });

  it('should fail if password is missing', async () => {

    {
      try {
        await User.create({ username: 'test' });
      } catch (error) {

        expect(error.message).toEqual(expect.stringContaining('User validation failed: password'));
      }
    }

  });

  it('should fail if username is NOT unique', async () => {

    const computer = await User.create(compInfo);

    const userInfo = { username: 'foo', email: 'foo@bar.com', password: 'foobar', role: 'user', opponent: computer._id };

    await User.create(userInfo);

    {
      try {
        await User.create({ username: 'foo', password: 'bar' });
      } catch (error) {

        expect(error.message).toEqual(expect.stringContaining('E11000 duplicate key error dup key'));
      }
    }

  });

  it('should generate a token', async () => {

    const computer = await User.create(compInfo);

    const userInfo = { username: 'foo', email: 'foo@bar.com', password: 'foobar', role: 'user', opponent: computer._id };

    const user = await User.create(userInfo);

    const token = user.generateToken();

    expect(token).toBeDefined();

    expect(token.split('.').length).toBe(3);

  });

  it('should match a good password', async () => {

    const password = 'foobar';

    const computer = await User.create(compInfo);

    const userInfo = { username: 'foo', email: 'foo@bar.com', password: 'foobar', role: 'user', opponent: computer._id };

    const user = await User.create(userInfo);

    const passwordsMatch = await user.comparePassword(password);

    expect(passwordsMatch).toBeTruthy();

  });

  it('should not match bad password', async () => {

    const computer = await User.create(compInfo);

    const userInfo = { username: 'foo', email: 'foo@bar.com', password: 'foobar', role: 'user', opponent: computer._id };

    const user = await User.create(userInfo);

    const passwordsMatch = await user.comparePassword('badPass');

    expect(passwordsMatch).toBeFalsy();
  });


  it('should authenticate if credientials match', async () => {

    const computer = await User.create(compInfo);

    const userInfo = { username: 'foo', email: 'foo@bar.com', password: 'foobar', role: 'user', opponent: computer._id };

    await User.create(userInfo);

    const validUser = await User.authenticateBasic({ username: 'foo', password: 'foobar' });

    expect(validUser.username).toBe('foo');

  });

  it('should NOT authenticate if credientials DO NOT match', async () => {

    const computer = await User.create(compInfo);

    const userInfo = { username: 'foo', email: 'foo@bar.com', password: 'foobar', role: 'user', opponent: computer._id };

    await User.create(userInfo);

    const invalidUser = await User.authenticateBasic({ username: 'foo', password: 'badPass' });

    expect(invalidUser).toBeNull();

  });


  it('should authenticate a GOOD USER token', async () => {

    const computer = await User.create(compInfo);

    const userInfo = { username: 'foo', email: 'foo@bar.com', password: 'foobar', role: 'user', opponent: computer._id };

    const user = await User.create(userInfo);

    const token = user.generateToken();
    const validUser = await User.authenticateToken(token);

    expect(validUser.username).toBe(user.username);

  });

  it('should NOT authenticate a BAD USER token', async () => {

    const computer = await User.create(compInfo);

    const userInfo = { username: 'foo', email: 'foo@bar.com', password: 'foobar', role: 'user', opponent: computer._id };

    const user = await User.create(userInfo);

    const token = 'thisisnot.thetokenyourelookingfor.movealongnow';

    try {
      await User.authenticateToken(token);
    } catch (error) {
      expect(error.message).toEqual('invalid token');
    }
  });

});