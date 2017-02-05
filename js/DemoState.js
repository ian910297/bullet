'use strict';

class DemoState extends GameState {
  preload() {
    super.preload();

    game.load.image('bg', '/assets/textures/wood_by_EricHart3d.png');
    game.load.image('iconFire', '/assets/icons/fire.png');
    game.load.image('iconIce', '/assets/icons/ice.png');
    game.load.atlas('player', '/assets/atlas/knight.png', '/assets/atlas/knight.json');


    game.load.atlas('ice', '/assets/spells/fire.png', '/assets/spells/ice.json');
    game.load.atlas('flame', '/assets/spells/fire.png', '/assets/spells/fire.json');
    game.load.image('burnMark', '/assets/spells/burnmark.png');
/*
    game.load.image('groundCrack', '/files/phaser/assets/spells/groundcrack.png');
    game.load.image('iconMagicBolt', '/files/phaser/assets/icons/fireball-eerie-2.png');
    game.load.image('iconLightningBolt', '/files/phaser/assets/icons/Thunder.png');
    game.load.image('iconFireStorm', '/files/phaser/assets/icons/fire-arrows-3.png');

    game.load.atlas('zombie1', '/files/phaser/assets/zombie1/atlas.png', '/files/phaser/assets/zombie1/atlas.json');

    game.load.atlas('bolt', '/files/phaser/assets/spells/bolt/atlas.png', '/files/phaser/assets/spells/bolt/atlas.json');
*/
  }
  create() {
    game.juicy = game.plugins.add(new Phaser.Plugin.Juicy(this));
    // add game background a group so it doesn't get sorted with the game.world
    // when we sort it during update
    let bgGroup = game.add.group();
    let bg = game.add.sprite(0, 20, 'bg');
    bg.anchor.setTo(0, 0);
    bg.scale.set(2);
    bgGroup.add(bg);
    this.player = new Player(game.world.centerX, game.world.centerY, 'player');

    // icon position, icon key, cooldown, duration
    let fire = new Fire(130, 430, 'iconFire', 1000, 3000);
    let ice = new Ice(290, 430, 'iconIce', 3000, 2000);

    // create keyboard and touch inputs
    game.input.addPointer();
    this.enableInput(fire, Phaser.KeyCode.TWO);
    this.enableInput(ice, Phaser.KeyCode.TWO);
/*

    this.zombies = [];
    var offsetX = 120;
    var offsetY = 110;
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

    var idle = zombie.animations.add('idle', [12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28]);
    var die = zombie.animations.add('die', [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11]);
    var raise = zombie.animations.add('raise', [11, 10, 9, 8, 7, 6, 5, 4, 3, 2, 1]);
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

  render() {
    super.render();

    game.debug.text('Press 1 - magic bolt', 400, 400);
    game.debug.text('2 - fire wall', 430, 416);
    game.debug.text('3 - lightning bolt', 430, 432);
    game.debug.text('4 - ice cage', 430, 448);
    game.debug.text('5 - fire storm', 430, 464);
  }
}