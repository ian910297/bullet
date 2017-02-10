class Menu {
  constructor (player) {
    this.player = player;
    this.menuGroup = game.add.group();
    this.menu = game.add.sprite(400, 300, 'menu-bg');
    this.choice = game.add.text(400, 0, 'Click outside to continue', {font:'30px Arial', fill: '#fff'});
  }

  init () {
    this.menu.anchor.setTo(0.5, 0.5);
    this.choice.anchor.setTo(0.5, 0.5);

    this.menuGroup.add(this.menu);
    this.menuGroup.add(this.choice);
  }

  destroy () {
    this.menuGroup.destroy();
  }
}
