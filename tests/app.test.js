import { start } from '../src/app.js';

describe('Test the server', () => {

  it('should start', () => {

    const actual = start();

    expect(actual).toBeDefined();

  });

});