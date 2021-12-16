const fs = require('fs');

const myInputStr = fs
.readFileSync('input.txt', {encoding: 'utf-8'})
.split("\r\n");
const MAX_ROW = myInputStr[0].length;
const MAX_COL = myInputStr.length;

let myField = new Array(MAX_COL);


function createField(){
  for(let y=0; y<myField.length; y++){
    myField[y] = [];
  }
  let count = 0;
  for(let i=0; i<MAX_COL; i++){
    let myStr = myInputStr[i];
    for(let j=0; j<MAX_ROW; j++){
      count++;
      myField[i].push(parseInt(myStr.charAt(j)));
    }
  }
}
function getAnswer(arrArray){
  let lpSum = 0;
  let temp;
  let basinTopThree = [];
  for(let i=0; i<arrArray.length; i++){
    for(let j=0; j<arrArray[i].length; j++){
      if(isLowPoint(arrArray, i, j)){
        temp = getBasinSize(arrArray, i, j);
      }
    }
  }
  return lpSum;
}
function getBasinSize(arr, i1, i2){
  
}
function getContagiousArray(arr, i1, i2){
  let curI = i1;
  let curJ = i2;
  if((i1-1) >= 0){
    
  }
}
// [[2, 1], [1, 2], [0, 1], [1, 0], [2, 1], [0, 1]]
// ----> [[2, 1], [1, 2], [0, 1], [1, 0]]
let testArr = [[2, 1], [1, 2], [0, 1], [1, 0], [2, 1], [0, 1]];

function removeDuplicates(arr){
  let someArr = [];
  for(let i=0; i<arr.length; i++){
    if(doesNotInclude(someArr, arr[i][0], arr[i][1]))
    someArr.push(arr[i]);
  }
  return someArr;
}
function doesNotInclude(arr, i1, i2){
  for(let i=0; i<arr.length; i++){
    if(arr[i][0] === i1 && arr[i][1] === i2)
    return false;
  }
  return true;
}
function isLowPoint(arr, i1, i2){
  //corner case + edge case;
  let myNum = arr[i1][i2];
  if(i1 === 0){
    if(i2 === 0){ //top left corner
      // console.log('found a corner1');
      if(myNum < arr[0][1] && myNum < arr[1][0])
        return true;
    }else if( i2 === (MAX_COL - 1)){ // top right corner
      if(myNum < arr[i1][i2-1] && myNum < arr[i1+1][i2])
        return true;
    }
    else{ // top edge case
      if(myNum < arr[0][i2 - 1] && myNum < arr[0][i2 + 1] && myNum < arr[1][i2])
        return true; 
    }
  } else if(i1 === (MAX_COL -1)){
    if(i2 === 0){ // bot left corner
      // console.log('found a corner3');
      if(myNum < arr[i1 - 1][i2] && myNum < arr[i1][i2 + 1])
        return true;
    } else if(i2 === (MAX_COL -1)){ // bot right corner
      // console.log('found a corner4');
      if(myNum < arr[i1][i2 - 1] && myNum < arr[i1 - 1][MAX_COL - 1])
        return true;
    } else {  //  bot edge case
      if(myNum < arr[i1][i2-1] && myNum < arr[i1][i2+1] && myNum < arr[i1-1][i2])
        return true;
    }
  } else if(i2 === 0){ // left edge case
    if(myNum < arr[i1-1][i2] && myNum < arr[i1+1][i2] && myNum < arr[i1][i2+1])
      return true;
  } else if(i2 === (MAX_COL - 1)){ // right edge case
    if(myNum < arr[i1-1][i2] && myNum < arr[i1+1][i2] && myNum < arr[i1][i2-1])
      return true;
  } else { // node case
    if(myNum < arr[i1-1][i2] && myNum < arr[i1+1][i2] && myNum < arr[i1][i2-1] && myNum < arr[i1][i2+1])
      return true;
  }
  return false;
}
///////////CALLS////////////
// createField();
// let myNum = getAnswer(myField);
let newArr = removeDuplicates(testArr);
console.log(newArr);
// console.log('number of low points is:  '+ myNum);

