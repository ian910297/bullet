class Play {
  preload() {
    console.log('Play');
  }

  create() {
    // add game background a group so it doesn't get sorted with the game.world
    // when we sort it during update
    let bgGroup = game.add.group();
    let bg = game.add.sprite(0, 20, 'bg');
    bg.anchor.setTo(0, 0);
    bg.scale.set(2);
    bgGroup.add(bg);
    this.player = new Player(game.world.centerX, game.world.centerY, 'player');

    let pl = {ap: 0};

    // enemy
    let enemy = new Enemy(0, 0, 0, game.world._height);
    enemy.sprite.events.onInputDown.add(enemy.checkHP, this, 0, pl);
    enemy.start();

    // menu_label
    let menu_label = game.add.text(300, 20, 'Menu', { font: '24px Arial', fill: '#fff' });
    menu_label.inputEnabled = true;
    menu_label.events.onInputUp.add(() => {
      game.paused = true;
      this.menu = new Menu(this.player);
      this.menu.init();
    });
    game.input.onDown.add(this.unpaused, this);

    // icon position, icon key, cooldown, duration
    let fire = new Fire(130, 430, 'iconFire', 1000, 3000);
    // create keyboard and touch inputs
    game.input.addPointer();
    this.enableInput(fire, Phaser.KeyCode.TWO);
    /*
    let ice = new Ice(290, 430, 'iconIce', 3000, 2000);

    this.enableInput(ice, Phaser.KeyCode.TWO);
    */
/*

    this.zombies = [];
    let offsetX = 120;
    let offsetY = 110;
    for(let y = 1; y < 4; y++) {
        for(let x = 1; x < 5; x++) {
            let posx = x * 100 + ((y % 2) ? 0 : 50) + offsetX;
            let posy = y * 50 + offsetY;
            this.createZombie(posx, posy);
        }
    }

    let magicBolt = new MagicBolt(50, 430, 'iconMagicBolt', 2500);
    let lightningBolt = new LightningBolt(210, 430, 'iconLightningBolt', 2000);
    let fireStorm = new FireStorm(370, 430, 'iconFireStorm', 6000);

    // store a reference for these because we need to call their update method
    this.magicBolt = magicBolt;
    this.fireStorm = fireStorm;

    // we need a reference to the player's position
    magicBolt.player = this.player;

    // for these spells, we need a reference to the list of zombies
    // so we can target them
    iceCage.zombies = this.zombies;
    magicBolt.zombies = this.zombies;
    lightningBolt.zombies = this.zombies;

    this.enableInput(magicBolt, Phaser.KeyCode.ONE);
    this.enableInput(lightningBolt, Phaser.KeyCode.THREE);
    this.enableInput(iceCage, Phaser.KeyCode.FOUR);
    this.enableInput(fireStorm, Phaser.KeyCode.FIVE);
    */
  }

  unpaused(event) {
    if(game.paused) {
      let x1 = 200;
      let x2 = 600;
      let y1 = 150;
      let y2 = 450;
      if(event.x>x1 && event.x<x2 && event.y>y1 && event.y<y2) {
        console.log('click')
      } else {
        game.paused = false;
        this.menu.destroy();
      }
    }
  }

  enableInput(spell, keycode) {
    game.input.keyboard.addKey(keycode).onDown.add(() => {
      this.castSpell(spell);
    });

    spell.icon.inputEnabled = true;
    spell.icon.events.onInputDown.add((icon) => {
      this.castSpell(spell);
    });
  }

  castSpell(spell) {
    if(spell.active) {
      this.player.play('attack', 20, false);
      // only cast the spell after a certain ms the animation plays
      this.game.time.events.add(300, () => {
          spell.cast();
      });
    }
  }

  createZombie(x, y) {
    let zombie = game.add.sprite(x, y, 'zombie1');
    zombie.anchor.setTo(0.5, 0.5);

    let idle = zombie.animations.add('idle', [12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28]);
    let die = zombie.animations.add('die', [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11]);
    let raise = zombie.animations.add('raise', [11, 10, 9, 8, 7, 6, 5, 4, 3, 2, 1]);
    zombie.play('raise', 10, false);
    zombie.scale.setTo(-0.4, 0.4);
    // everytime a zombie dies, we raise them back
    die.onComplete.add(() => {
        zombie.play('raise', game.rnd.between(15, 20), false);
    });
    // set them to idle after they have risen
    // the random play speed gives us a nice effect
    // so that their movements are not sync with each other
    raise.onComplete.add(() => {
        zombie.play('idle', game.rnd.between(9, 20), true);
    });

    // store in our regular array
    this.zombies.push(zombie);
  }

  update() {
    game.world.sort('y', Phaser.Group.SORT_ASCENDING);
/*
    this.magicBolt.update();
    this.fireStorm.update();
    */
  }
}
