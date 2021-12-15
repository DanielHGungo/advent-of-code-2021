const fs = require('fs');

const outputNums = fs
.readFileSync('input.txt', {encoding: 'utf-8'})
.split("\r\n");

function trimToOutput(myStr){
  for(let i=0; i<myStr.length; i++){
    myStr[i] = myStr[i].substring(myStr[i].indexOf("|") + 2);
  }
}
trimToOutput(outputNums);

function getDoubleArray(){
  let bigArr = [];
  let strCopy = "";
  for(let j=0; j<outputNums.length; j++){
    strCopy = outputNums[j];    
    let myArr = strCopy.split(" ");
    bigArr.push(myArr);
  }
  return bigArr;
}

function counter(){
  let count = 0;
  let myArr = getDoubleArray();
  for(let i=0; i<myArr.length; i++){
    for(let j=0; j<myArr[i].length; j++){
      let leng = myArr[i][j].length;
      switch(leng){
        case 2:
        case 3:
        case 4:
        case 7:
          count++;
          break;
        default:
          break;
      }
    }
  }
  return count;
}
console.log(counter());
// .filter(segment =>{
//     if(segment.length > 30){
//       return false;
//     } else{
//       return true;
//     }
// });

// console.log(outputNums);