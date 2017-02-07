var Boot = function () {};

Boot.prototype = {
  loadScripts () {
    game.load.script('utils', '/lib/utils.js');
    game.load.script('boot-animation', '/lib/boot-animation.js');
    game.load.script('alphabet', '/lib/pixel-animation/font/5x9-pixel-font.js');
    game.load.script('pixel-animation', '/lib/pixel-animation/pixel-animation.js');

    // State
    game.load.script('load', '/states/load.js');
  },

  loadImages () {
    game.load.image('boot-bg', '/assets/boot-bg.jpg');
  },

  loadFonts () {

  },

  preload () {
    this.loadScripts();
    this.loadImages();
    console.log('Boot');
  },

  async create () {
    /*
    var anim = new BootAnimation(800, 600, gameOptions.tileW, gameOptions.tileH);
    this.welcomeText();
    await anim.start('random');
    */
    var anim = new PixelAnimation('DEMONIC', 100, 100, gameOptions.tileW, gameOptions.tileH, alphabet);
    anim.init();
    anim.start('random');

    game.state.add('Load', Load);
    game.input.onDown.addOnce(this.touchToContinue, this);
  },

  welcomeText () {
    var titleStyle = {
      font: '48px PressStart2P',
      fill: '#000000',
      align: 'center'
    };
    var title = game.add.text(0, game.world.centerY, '', titleStyle);
    title.anchor.setTo(0, 0);
    title.setText('Demonic');

    var nextStyle = {
      font: '30px PressStart2P',
      fill: '#000000',
      align: 'center'
    };
    var next = game.add.text(30, game.world._height - 60, '', nextStyle);
    var shineFlag = 0;
    next.anchor.setTo(0, 0);
    setInterval(() => {
      if(shineFlag%2 == 0) {
        next.setText('be continue');
      } else {
        next.setText('be continue ...');
      }
      shineFlag += 1;
    }, 500);
  },

  touchToContinue () {
    game.state.start('Load');
  }
};

