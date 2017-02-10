let gameOptions = {
  windowW: document.body.offsetWidth,
  windowH: document.body.offsetHeight,
  tileW: 10,
  tileH: 10,
  tileTime: 1,
  player: {
    maxhp: 100,
    atk: 3,
    recover: 0,
    money: 100
  },
  enemy: {
    name: 'ball',
    hp: 10,
    attackPower: 10,
    speed: 1
  }
};
console.log(gameOptions);

let game = new Phaser.Game(800, 600, Phaser.AUTO, '');

class Main {
  preload () {
    game.load.script('boot', '/states/boot.js');
    console.log('Main');
  }

  create () {
    game.state.add('Boot', Boot);
    game.state.start('Boot');
  }
}

game.state.add('Main', Main);
game.state.start('Main');
