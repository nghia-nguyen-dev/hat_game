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
    } else if (this.field[this.currentPos[0]][this.currentPos[1]] === hole) {
        this.gameOver = true;
        console.log('You fell in a hole!')
    } else if (this.field[this.currentPos[0]][this.currentPos[1]] === hat) {
        this.gameOver = true;
        console.log('You found the hat!')
    }
  }

  updateField() {
    if (!this.gameOver) {
      this.field[this.currentPos[0]][this.currentPos[1]] = pathCharacter;
    }
  }

  static generateField(height, width) {
    const outerArr = [];

    // add vertical levels
    for (let i = 0; i < height; i++) {
      outerArr.push([]);

      // push in horizontal direction
      for (let j = 0; j < width; j++) {
        outerArr[i].push(this.getRandomSymbol())
      }
    }

    // add starting marker
    outerArr[0][0] = pathCharacter

    // place hat in random spot we would need two random numbers
    const hatPos = []

    // make sure hat cannot be randomly placed in a [0,0] position
    do {
      hatPos.push(Math.floor(Math.random() * height))
      hatPos.push(Math.floor(Math.random() * width))
    } while (hatPos === [0,0]);

    outerArr[hatPos[0]][hatPos[1]] = '^';

    return outerArr;
  }

  static placeHat() {

  }

  static getRandomSymbol() {
    const symbols = [fieldCharacter, hole];
    const randNum = Math.floor(Math.random() * symbols.length)
    return symbols[randNum];
  }

}

const myField = new Field([
  ['*', '░', 'O'],
  ['░', 'O', '░'],
  ['░', '^', '░'],
]);


// // while the game is not over keep prompting
// while (!myField.gameOver) {
//   myField.print()
//   // get userMove
//   const userMove = prompt('Which way?');

//   // update currentPos prop
//   myField[userMove.toLowerCase()]();

//   // checkPos()
//   myField.checkPos();

//   // update field with userMove
//   myField.updateField();

//   // show updated field with print()

// }


console.log(Field.generateField(3,3));

