const NUM_DAYS = 256;
const fs = require('fs');
let fish = fs
  .readFileSync('input.txt', {encoding: 'utf-8'})
  .split("")
  .filter(word =>{
      switch(word){
        case '0':
        case '1':
        case '2':
        case '3':
        case '4':
        case '5':
        case '6':
        case '7':
        case '8':
        case '9':
         return true;
        default:
         return false;
      }
  }).map(Number);

function getFish(){
  let fishByAge = new Array(9).fill(0);

  for(let i=0; i<fish.length; i++){
    fishByAge[fish[i]] += 1;
  }
  console.log(fishByAge);
  for(let j=0; j<NUM_DAYS; j++){
    fishByAge.push(fishByAge.shift());
    fishByAge[6] += fishByAge[8];
  }
  let sum = BigInt(0);
  for(let k=0; k<fishByAge.length; k++){
    let temp2 = BigInt(fishByAge[k]);
    sum += temp2;
  }
  console.log('the sum is : '+ sum);
}
getFish();