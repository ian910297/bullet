var Load = function () {}

Load.prototype = {
  preload () {
    // State
    game.load.script('play', '/states/play.js');
    game.load.script('menu', '/states/menu.js');

    // Lib
    game.load.script('player', '/lib/player.js');
    game.load.script('spell', '/lib/spell/spell.js');
    game.load.script('spell', '/lib/spell/fire.js');
    game.load.script('spell', '/lib/spell/ice.js');

    console.log('Load');
  },

  loadImages () {
  },

  create () {
    game.state.add('Play', Play);
    game.state.add('Menu', Menu);

    game.state.start('Play');
  }
};

