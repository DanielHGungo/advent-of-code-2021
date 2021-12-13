const fs = require('fs');


// let second = str.split(' ');
// console.log(second);
// console.log(str);
const bingoOrder = fs
  .readFileSync('bingoboards.txt', { encoding: 'utf-8' })
  .split('\n\n')
  .filter(Boolean)
  .map(String);

// console.log(bingoOrder);
console.log('the total number of boards is : '+bingoOrder.length);
let tempNums = [];
let tempStr;
let newBoards = [];
for(let i=0; i<bingoOrder.length; i++){
    bingoOrder[i] = bingoOrder[i].replace(/\n/g, ' ');
    bingoOrder[i] = bingoOrder[i].replace(/  /g, ' ');
    tempStr = bingoOrder[i].split(' ');
    for(let j=0; j<tempStr.length; j++){
        if(tempStr[j] === ''){
            tempStr.splice(j, 1);
            j--;
        }
    }
    tempNums = [];
    for(let k=0; k<tempStr.length; k++){
        tempNums.push(parseInt(tempStr[k]));
    }
    newBoards.push(tempNums);
    // bingoOrder[i] = bingoOrder[i].replace(/ \d /g, 'X ');
}
console.log('below is the new array');
console.log(newBoards);


