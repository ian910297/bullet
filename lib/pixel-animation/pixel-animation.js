class PixelAnimation {
  constructor (text, startX, startY, tileW, tileH, alphabetDB) {
    this.startX = startX;
    this.startY = startY;
    this.tileW = tileW;
    this.tileH = tileH;
    this.text = text.toUpperCase();
    this.database = [];
    this.alphabetDB = alphabetDB;
    this.alphabetLength = alphabetDB['Length'];
    this.alphabetW = alphabetDB['tileW'];
    this.alphabetH = alphabetDB['tileH'];
    this.wordW = tileW * alphabetDB['tileW'];
    this.wordH = tileH * alphabetDB['tileH'];
    this.wordSpace = tileW * 3;

    this.rect = game.add.graphics();
  }

  init () {
    for(let i=0; i<this.text.length; i++) {
      this.database.push({
        visited: new Array(this.alphabetLength).fill(0),
        data: this.alphabetDB[this.text[i]].data,
        times: this.alphabetDB[this.text[i]].times,
        curTimes: 0
      });
    }

    return this;
  }

  async start (style) {
    let posX = this.startX;
    let posY = this.startY;

    if(style == 'random') {
      for(let i=0; i<this.database.length; i++) {
        await this.printRandom(this.database[i], posX, posY);
        posX += this.wordSpace + this.wordW;
      }
    }

    return this;
  }

  async printRandom (e, startX, startY) {
    let visited = e.visited;
    let curTimes = e.curTimes;
    let times = e.times;
    let data = e.data;
    let posX;
    let posY;

    while(curTimes != times) {
      let rand = Math.floor(Math.random() * visited.length);

      if(data[rand]==1 && visited[rand]==0) {
        posX = startX + ((rand % this.alphabetW) * this.tileW);
        posY = startY + (Math.floor(rand / this.alphabetW) * this.tileH);

        await sleep(gameOptions.tileTime);
        this.drawRect(posX, posY);

        visited[rand] = 1;
        curTimes += 1;
      }
    }
  }

  drawRect (posX, posY) {
    this.rect.beginFill(0xffffff);
    this.rect.lineStyle(0, 0xfd900, 1);
    this.rect.moveTo(posX, posY);
    this.rect.lineTo(posX + this.tileW, posY);
    this.rect.lineTo(posX + this.tileW, posY + this.tileH);
    this.rect.lineTo(posX, posY + this.tileH);
    this.rect.endFill();
  }
}
