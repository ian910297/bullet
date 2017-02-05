class menu {
  preload () {
    game.load.spritesheet('button', '/assets/buttons/number-buttons-90x90.png', 90, 90);
    game.load.image('background', '/assets/misc/starfield.jpg');
  }

  create () {
    game.stage.backgroundColor = '#182d3b';
    this.button = game.add.button(game.world.centerX, game.world.centerY, 'button', this.actionOnClick, this, 1, 0, 2);
    this.button.anchor.setTo(0.5, 0.5);
  }

  render () {

  }

  actionOnClick () {
    this.button.setFrames(4, 3, 5);
  }
}
