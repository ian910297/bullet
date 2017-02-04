'use strict';

function preload() {
  game.load.image('ball', `${AssetHome}/ball.png`)
}

function create() {
  game.stage.backgroundColor = '#6688ee';
  game.physics.startSystem(Phaser.Physics.ARCADE);
  game.physics.arcade.gravity.y = 150;
  game.time.events.repeat(Phaser.Timer.SECOND * 2, 10, createBall, this);
}

function createBall () {
  var ball = game.add.sprite(game.world.randomX, 0, 'ball');
  game.physics.enable(ball, Phaser.Physics.ARCADE)
    ball.body.bounce.y = 0.9;
  ball.body.collideWorldBounds = true;
}

function render () {
  game.debug.text('Time until event: ' + game.time.events.duration.toFixed(0), 32, 32);
  game.debug.text('Next tick: ' + game.time.events.next.toFixed(0), 32, 64);
}

var ball = {
  preload: preload,
  create: create,
  render: render
}

