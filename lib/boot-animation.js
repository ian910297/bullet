'use strict';

var BootAnimation = function (windowW, windowH, tileW, tileH) {
  this.windowW = windowW;
  this.windowH = windowH;
  this.tileW = tileW;
  this.tileH = tileH;

  this.numTilesPerColumn = this.windowW / this.tileW;
  this.numTilesPerRow = this.windowH / this.tileH;
  this.rect = game.add.graphics();
};

BootAnimation.prototype = {
  start () {
    //this.orderLeftToRight();
    this.orderRandom();
  },

  async orderRandom () {
    var total = this.numTilesPerColumn * this.numTilesPerRow;
    var visited = new Array(total).fill(0);
    var times = 0;
    var posX;
    var posY;

    while(times!=total) {
      var rand = Math.floor(Math.random() * visited.length);
      console.log(visited[rand]);
      if(visited[rand]==0) {
        posX = (rand % this.numTilesPerColumn) * this.tileW;
        posY = Math.floor(rand / this.numTilesPerColumn) * this.tileH;

        await sleep(50);
        this.drawRect(posX, posY);

        visited[rand] = 1;
        times += 1;
      }
    }
  },

  async orderLeftToRight () {
    var curCol;
    var curRow;
    var curPosX = 0;
    var curPosY = 0;

    for(curRow=0; curRow<this.numTilesPerRow; curRow+=1) {
      curPosY = curRow * this.tileH;
      curPosX = 0;
      for(curCol=0; curCol<this.numTilesPerColumn; curCol+=1) {
        await sleep(50);
        this.drawRect(curPosX, curPosY);
        curPosX += this.tileW;
      }
    }
  },

  drawRect (posX, posY) {
    this.rect.beginFill(0xffffff);
    this.rect.lineStyle(0, 0xfd900, 1);
    this.rect.moveTo(posX, posY);
    this.rect.lineTo(posX + this.tileW, posY);
    this.rect.lineTo(posX + this.tileW, posY + this.tileH);
    this.rect.lineTo(posX, posY + this.tileH);
    this.rect.endFill();
  }
};
