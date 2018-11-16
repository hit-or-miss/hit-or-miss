'use strict';

import Ship from '../models/ship-model.js';

class Fleet{
  constructor(user) {
    this.user = user;
  }

  async init() {
    this.ac = await Ship.create({ name:'A', size:5, location:['a0','b0','c0','d0','e0'], player: this.user._id });
    this.bs = await Ship.create({ name:'B', size:4, location:['a1','b1','c1','d1'], player: this.user._id });
    this.cr = await Ship.create({ name:'C', size:3, location:['a2','b2','c2'], player: this.user._id });
    this.des = await Ship.create({ name:'D', size:3, location:['a3','b3','c3'], player: this.user._id });
    this.sub = await Ship.create({ name:'S', size:3, location:['a4','b4','c4'], player: this.user._id });
  }

}

export default Fleet;