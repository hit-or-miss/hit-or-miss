'use strict';

import userText from '../src/middleware/user-text.js';

describe(`Test the user text functions`, () => {

  it('should display the WELCOME text', () => {

    const actual = userText.welcome();
    const expects = 'THE GAME WHERE YOU GET TO LEAD YOUR SHIPS TO VICTORY!';

    expect(actual).toContain(expects);

  });

  it('should display the RULES text', () => {

    const actual = userText.rules();
    const expects = 'Codefellowia is under attack';

    expect(actual).toContain(expects);

  });

  it('should display the GENERIC HELP text', () => {
    const actual = userText.help();
    const expects = 'GENERAL HELP INFORMATION';

    expect(actual).toContain(expects);
  });

  it('should display the SETUP HELP text', () => {
    const actual = userText.setupHelp();
    const expects = 'Syntax: <ship>-<start>-<direction>';

    expect(actual).toContain(expects);
  });

  it('should display the TARGET HELP text', () => {
    const actual = userText.playHelp();
    const expects = 'notify you if you HIT or MISS';

    expect(actual).toContain(expects);
  });

  it('should display the WINNER text', () => {
    const actual = userText.win();
    const expects = '88888P Y88888 888     888 888  Y88888 ';

    expect(actual).toContain(expects);
  });

  it('should display the CONQUERED text', () => {
    const actual = userText.lose();
    const expects = '888     888  888 "Y8888b. 888 ';

    expect(actual).toContain(expects);
  });

  it('should display the HIT text', () => {
    const actual = userText.hit();
    const expects = 'HH   HH  IIIII  TTTTTTT';

    expect(actual).toContain(expects);
  });

  it('should display the MISS text', () => {
    const actual = userText.miss();
    const expects = 'MMM  MMM   III   SS       SS ';

    expect(actual).toContain(expects);
  });

});