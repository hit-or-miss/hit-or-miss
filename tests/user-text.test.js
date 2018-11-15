'use strict';

import { app as server } from '../src/app.js';

import supergoose, { startDB, stopDB } from './supergoose.js';
import User from '../src/models/user-model.js';

import userText from '../src/middleware/user-text.js';

const mockRequest = supergoose(server);
// hello

beforeAll(startDB);
afterAll(stopDB);

beforeEach(async () => {
  await User.deleteMany({});
});

process.env.APP_SECRET = 'password';

beforeAll(startDB);
afterAll(stopDB);

beforeEach(async () => {
  await User.deleteMany({});
});

describe(`Test the user text functions`, () => {

  it('should display the WELCOME text', () => {

    console.log(userText);

    const actual = userText.welcome();
    console.log(actual);
    console.log(actual);

    const expects = '';

    expect(actual).toContain(expects);


  });

  it('should display the RULES text', () => { });

  it('should display the GENERIC HELP text', () => { });

  it('should display the SETUP HELP text', () => { });

  it('should display the TARGET HELP text', () => { });

  it('should display the WINNER text', () => { });

  it('should display the CONQUERED text', () => { });

  it('should display the HIT text', () => { });

  it('should display the MISS text', () => { });

});