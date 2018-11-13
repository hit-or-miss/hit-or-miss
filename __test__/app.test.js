require('dotenv').config();
import supergoose, { startDB, stopDB } from './supergoose.js';
import { app } from '../src/app.js';

const mockRequest = supergoose(app);

beforeAll(startDB);
afterAll(stopDB);
beforeEach(async () => {
  // clean up as needed
});

describe('app', () => {
  it('should send back a token to the user', async () => {
    const userData = {
      username: 'George',
      password: 'password',
    };

    const response = await mockRequest.post('/signup').send(userData);
    expect(response.statusCode).toBe(200);
  });
});

