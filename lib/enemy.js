var Enemy = function (posX, posY, toPosX, toPosY) {
  this.HP = gameOptions.enemy.HP;
  this.attackPower = gameOptions.enemy.attackPower;
  this.speed = gameOptions.enemy.speed;
  this.sprite = game.add.sprite(posX, posY, gameOptions.enemy.name);
  this.tween = game.add.tween(this.sprite);
  this.tween.to({x: toPosX, y: toPosY}, 10000, 'Linear', false, 0);
};

Enemy.prototype = {
  start () {
    console.log('start');
    this.sprite.inputEnabled = true;
    this.sprite.useHandCursor = true;
    this.tween.start();
  },

  checkHP (key, name, attack) {
    console.log('check', attack);
  },

  destory () {
    this.sprite.kill();
  }
};
