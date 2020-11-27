const prompt = require('prompt-sync')({sigint: true});

const hat = '^';
const hole = 'O';
const fieldCharacter = '░';
const pathCharacter = '*';

class Field {
  constructor(field) {
    this.field = field;
    this.currentPos = [0, 0]; // [vertical movement, horizontal movement]
    this.gameOver = false;
  }
  print() {
    if (!this.gameOver) {
      this.field.forEach(arr => {
      console.log(arr.join(''))
      })
    }  
  }

  r() {
    this.currentPos[1]++;
  }

  l() {
    this.currentPos[1]--;
  }

  u() {
    this.currentPos[0]--;
  }

  d() {
    this.currentPos[0]++;
  }

  checkPos() {
    if (this.currentPos[0] < 0 || this.currentPos[0] > this.field.length - 1) {
        this.gameOver = true;
        console.log('You went out of bounds!')
    } else if (this.currentPos[1] < 0 || this.currentPos[1] > this.field[0].length - 1) {
        this.gameOver = true;
        console.log('You went out of bounds!')
    } else if (this.field[this.currentPos[0]][this.currentPos[1]] === 'O') {
        this.gameOver = true;
        console.log('You fell in a hole!')
    } else if (this.field[this.currentPos[0]][this.currentPos[1]] === '^') {
        this.gameOver = true;
        console.log('You found the hat!')
    }
  }

  updateField() {
    if (!this.gameOver) {
      this.field[this.currentPos[0]][this.currentPos[1]] = pathCharacter;
    }
  }

}

const myField = new Field([
  ['*', '░', 'O'],
  ['░', 'O', '░'],
  ['░', '^', '░'],
]);


// while the game is not over keep prompting
while (!myField.gameOver) {
  myField.print()
  // get userMove
  const userMove = prompt('Which way?');

  // update currentPos prop
  myField[userMove.toLowerCase()]();

  // checkPos()
  myField.checkPos();

  // update field with userMove
  myField.updateField();

  // show updated field with print()

}