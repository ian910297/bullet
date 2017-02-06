'use strict';

var gameOptions = {
  windowW: document.body.offsetWidth,
  windowH: document.body.offsetHeight,
  tileW: 100,
  tileH: 100,
  tileTime: 1,
  enemy: {
    name: 'ball',
    hp: 10,
    attackPower: 10,
    speed: 1
  }
};
console.log(gameOptions);

var game = new Phaser.Game(800, 600, Phaser.AUTO, '');

var Main = function () {};
Main.prototype = {
  preload () {
    game.load.script('boot', '/states/boot.js');
    console.log('Main');
  },

  create () {
    game.state.add('Boot', Boot);
    game.state.start('Boot');
  }
}

game.state.add('Main', Main);
game.state.start('Main');
