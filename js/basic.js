
var basic = function(){};

basic.prototype = {
  preload: function() {
    game.load.image('floor', `${AssetHome}/env/floor.jpg`);
  },

  create: function() {
    game.add.sprite(0, 0, 'floor');
  }
}


