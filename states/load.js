class Load {
  loadScripts () {
    // State
    game.load.script('play', '/states/play.js');

    // Lib
    game.load.script('player', '/lib/player.js');
    game.load.script('enemy', '/lib/enemy.js');
    game.load.script('menu', '/lib/menu.js');
    game.load.script('spell', '/lib/spell/spell.js');
    game.load.script('fire', '/lib/spell/fire.js');
    game.load.script('ice', '/lib/spell/ice.js');
    game.load.script('pie-progress', '/lib/spell/pieprogress.js');
  }

  loadImages () {
    // Play State
    game.load.image('bg', '/assets/textures/wood_by_EricHart3d.png');
    game.load.image('iconFire', '/assets/icons/fire.png');
    game.load.image('iconIce', '/assets/icons/ice.png');
    game.load.image('burnMark', '/assets/spells/burnmark.png');

    game.load.image('menu-bg', '/assets/textures/cyberglow.png');
    game.load.image('ball', '/assets/ball.png');
  }

  loadAtlas () {
    // Play State
    game.load.atlas('player', '/assets/atlas/knight.png', '/assets/atlas/knight.json');

    game.load.atlas('ice', '/assets/spells/fire.png', '/assets/spells/ice.json');
    game.load.atlas('flame', '/assets/spells/fire.png', '/assets/spells/fire.json');
  }

  init () {
    this.loadingText = game.add.text(200, 270, 'Loading');
    this.loadingText.setStyle({ fill: '#ffffff' });
  }

  preload () {
    this.loadScripts();
    this.loadImages();
    this.loadAtlas();

    console.log('Load');
  }

  loadUpdate () {
    // update loading text percent
    this.loadingText.setText(game.load.progress);
  }

  addState () {
    game.state.add('Play', Play);
    game.state.add('Menu', Menu);
  }

  create () {
    this.addState();
    game.state.start('Play');
  }
}
