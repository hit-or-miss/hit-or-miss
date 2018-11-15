'use strict';

import fs from 'fs';

const welcome = () => {
  return fs.readFileSync(`${__dirname}/../assets/welcome.txt`).toString();
};

const rules = () => {
  return fs.readFileSync(`${__dirname}/../assets/rules.txt`).toString();
};

const help = () => {
  return fs.readFileSync(`${__dirname}/../assets/help.txt`).toString();
};

const setupHelp = () => {
  return fs.readFileSync(`${__dirname}/../assets/setup-help.txt`).toString();
};

const playHelp = () => {
  return fs.readFileSync(`${__dirname}/../assets/play-help.txt`).toString();
};

const hit = () => {
  return fs.readFileSync(`${__dirname}/../assets/hit.txt`).toString();
};

const miss = () => {
  return fs.readFileSync(`${__dirname}/../assets/miss.txt`).toString();
};

const win = () => {
  return fs.readFileSync(`${__dirname}/../assets/win.txt`).toString();
};

const lose = () => {
  return fs.readFileSync(`${__dirname}/../assets/lose.txt`).toString();
};

export default {
  welcome,
  rules,
  help,
  setupHelp,
  playHelp,
  hit,
  miss,
  win,
  lose,
};

