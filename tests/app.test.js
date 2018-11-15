import { start, stop } from '../src/app.js';

describe('Test the server', () => {

  it('should start', () => {

    const actual = start();

    expect(actual).toBeDefined();

  });

  it('should stop', () => {

    start(); //Start the server so we have something to stop

    const actual = stop();

    expect(actual).toBeUndefined();

  });

});