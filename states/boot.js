var Boot = function () {};

Boot.prototype = {
  preload () {
    game.load.image('boot-bg', '/assets/boot-bg.jpg');
    game.load.script('utils', '/lib/utils.js');
    game.load.script('boot-animation', '/lib/boot-animation.js');
    game.load.script('load', '/states/load.js');
    console.log('Boot');
  },

  create () {
    var anim = new BootAnimation(800, 600, gameOptions.tileW, gameOptions.tileH);
    anim.start();

    game.state.add('Load', Load);
//    game.state.start('Load');
  },
};

