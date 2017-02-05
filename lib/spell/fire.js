'use strict';

class Fire extends Spell {

  constructor(x, y, key, cooldown, duration) {
    super(x, y, key, cooldown, duration);
  }

  create() {
  	// create a group for the burn marks so it appears below all the flames
  	this.burnMarksGroup = game.add.group();

  	// create 8 flames that spawns in front of our hero
  	for(var i = 0; i < 8; i++) {
  		let offsetY = 180;
  		let posY = i * 15 + offsetY;
			let flame = game.add.sprite(game.rnd.between(150, 160), posY, 'flame');
      flame.alpha = 0;
      flame.animations.add('move', [15, 16, 17, 18, 19, 20]);
      flame.anchor.setTo(0.5, 0.5);

      // we don't need that much burn marks showing on the ground
      if(i % 2 > 0) {
				let mark = game.add.sprite(game.rnd.between(150, 160), posY + 10, 'burnMark');
				mark.alpha = 0;
				mark.anchor.setTo(0.5, 0.5);

				// store a reference
      	flame.mark = mark;

				this.burnMarksGroup.add(mark);
      }

      this.group.push(flame);
  	}
  }

  perform() {
    this.group.forEach((flame) => {
      flame.alpha = 1;
      // we show a growing flame
      flame.scale.set(0);

      // random growth size for each flame
      let size = game.rnd.realInRange(0.7, 1);
      game.add.tween(flame.scale).to({x: size, y: size}, game.rnd.between(300, 1000), Phaser.Easing.Linear.None, true);

      // play the animation
      flame.play('move', game.rnd.between(8, 15), true);

      if(flame.mark) {
      	// random angle and size for our burn marks
	      flame.mark.alpha = 1;
	      flame.mark.scale.set(0);
	      flame.mark.angle = game.rnd.between(0, 360);

	      let size = game.rnd.realInRange(0.15, 0.30);

        // show it a few moment after the flame shows up
	      game.time.events.add(500, () => {
	        game.add.tween(flame.mark.scale).to({x: size, y: size}, game.rnd.between(500, 1000), Phaser.Easing.Linear.None, true);
	      });
      }
    });
  }

  expire() {
  	// expire just fades them out
    this.group.forEach((flame) =>{
      game.add.tween(flame).to({alpha: 0}, 500, Phaser.Easing.Quadratic.InOut, true, 0);
      if(flame.mark)
      	game.add.tween(flame.mark).to({alpha: 0}, 500, Phaser.Easing.Quadratic.InOut, true, 0);
    });
  }

  strengthen() {

  }
}
