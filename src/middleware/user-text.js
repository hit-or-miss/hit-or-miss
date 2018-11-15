'use strict';

import fs from 'fs';

// import test from './../assets/welcome.txt';

const welcome = () => {
  return fs.readFileSync(`${__dirname}/../assets/welcome.txt`).toString();
};

// const welcome = () => { return 'Hello World'; };

const rules = () => { };

const help = () => { };

const setupHelp = () => { };

const targetHelp = () => { };

const hit = () => { };

const miss = () => { };

const win = () => { };

const lose = () => { };



export default {
  welcome,
  rules,
  help,
  setupHelp,
  targetHelp,
  hit,
  miss,
  win,
  lose,
};

