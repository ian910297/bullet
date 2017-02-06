var Boot = function () {};

Boot.prototype = {
  preload () {
    game.load.image('boot-bg', '/assets/boot-bg.jpg');
    game.load.script('utils', '/lib/utils.js');
    game.load.script('boot-animation', '/lib/boot-animation.js');
    game.load.script('load', '/states/load.js');

    console.log('Boot');
  },

  async create () {
    var anim = new BootAnimation(800, 600, gameOptions.tileW, gameOptions.tileH);
    await anim.start('random');
    this.welcomeText();

    game.state.add('Load', Load);
    game.input.onDown.addOnce(this.touchToContinue, this);
  },

  welcomeText () {
    var text = game.add.text(0, game.world.centerY, '', {font: '48px', fill: '#000000', align: 'center'});
    text.anchor.setTo(0, 0);
    var shineFlag = 0;
    setInterval(() => {
      if(shineFlag%2 == 0) {
        text.setText('Touch to continue');
      } else {
        text.setText('Touch to continue ...');
      }
      shineFlag += 1;
    }, 500);
  },

  touchToContinue () {
    game.state.start('Load');
  }
};

