var Load = function () {}

Load.prototype = {
  loadScripts () {
    // State
    game.load.script('play', '/states/play.js');
    game.load.script('menu', '/states/menu.js');

    // Lib
    game.load.script('player', '/lib/player.js');
    game.load.script('enemy', '/lib/enemy.js');
    game.load.script('spell', '/lib/spell/spell.js');
    game.load.script('spell', '/lib/spell/fire.js');
    game.load.script('spell', '/lib/spell/ice.js');
  },

  loadImages () {
    // Play State
    game.load.image('bg', '/assets/textures/wood_by_EricHart3d.png');
    game.load.image('iconFire', '/assets/icons/fire.png');
    game.load.image('iconIce', '/assets/icons/ice.png');
    game.load.image('burnMark', '/assets/spells/burnmark.png');

    game.load.image('ball', '/assets/ball.png');
  },

  loadAtlas () {
    // Play State
    game.load.atlas('player', '/assets/atlas/knight.png', '/assets/atlas/knight.json');

    game.load.atlas('ice', '/assets/spells/fire.png', '/assets/spells/ice.json');
    game.load.atlas('flame', '/assets/spells/fire.png', '/assets/spells/fire.json');
  },

  init () {
    this.loadingText = game.add.text(200, 270, 'Loading');
    this.loadingText.setStyle({ fill: '#ffffff' });
  },

  preload () {
    this.loadScripts();
    this.loadImages();
    this.loadAtlas();

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

