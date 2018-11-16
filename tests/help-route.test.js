import supergoose, { startDB, stopDB } from './supergoose.js';

import { app } from '../src/app.js';

import User from '../src/models/user-model.js';

const mockRequest = supergoose(app);

process.env.APP_SECRET = 'password';

// Hooks for Jest
beforeAll(startDB);
afterAll(stopDB);

beforeEach(async () => {
  // Create user before each test
  const userInfo = { username: 'foo', password: 'foobar' };
  await mockRequest.post('/signup').send(userInfo);
});

afterEach(async () => {
  // Clear user after each test
  await User.deleteMany({});
});

describe('Help Routes', () => {

  it('should allow a valid USER to view the rules.', async () => {
  
    const response = await mockRequest.get('/rules').auth('foo', 'foobar');

    expect(response.status).toBe(200);

  });

  it('should allow a valid USER to view the help text.', async () => {
  
    const response = await mockRequest.get('/help').auth('foo', 'foobar');
  
    expect(response.status).toBe(200);

  });

  it('should allow a valid USER to view the setup help text.', async () => {
  
    const response = await mockRequest.get('/setuphelp').auth('foo', 'foobar');

    expect(response.status).toBe(200);

  });

  it('should allow a valid USER to view the play help text.', async () => {
  
    const response = await mockRequest.get('/playhelp').auth('foo', 'foobar');
  
    expect(response.status).toBe(200);
  });

});
