var Load = function () {}

Load.prototype = {
  loadScripts () {
    // State
    game.load.script('play', '/states/play.js');
    game.load.script('menu', '/states/menu.js');

    // Lib
    game.load.script('player', '/lib/player.js');
    game.load.script('spell', '/lib/spell/spell.js');
    game.load.script('spell', '/lib/spell/fire.js');
    game.load.script('spell', '/lib/spell/ice.js');
  },

  loadImages () {

  },

  init () {
    this.loadingText = game.add.text(200, 270, 'Loading');
    this.loadingText.setStyle({ fill: '#ffffff' });
  },

  preload () {

    this.loadScripts();
    console.log('Load');
  },

  loadUpdate () {
    // update loading text percent
    this.loadingText.setText(game.load.progress);
  },

  addState () {
    game.state.add('Play', Play);
    game.state.add('Menu', Menu);
  },

  create () {
    this.addState();
    game.state.start('Play');
  }
};

