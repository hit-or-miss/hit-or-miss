'use strict';

import {app as server} from '../src/app.js';

import supergoose, { startDB, stopDB } from './supergoose.js';
import User from '../src/auth/model.js';

const mockRequest = supergoose(server);
// hello

beforeAll(startDB);
afterAll(stopDB);

beforeEach(async () => {
  await User.deleteMany({});
});

process.env.APP_SECRET = 'password';

describe('Setup Routes', () => {

  describe('/setup', () => {
    it('should...', () => {

    });

    it('should...', () => {

    });
  });

  describe('/setup/:places', () => {
    it('should...', () => {

    });

    it('should...', () => {

    });
  });


});