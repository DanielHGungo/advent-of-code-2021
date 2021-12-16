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
  let sumRisk = 0;
  let temp = 0;
  for(let i=0; i<arrArray.length; i++){
    for(let j=0; j<arrArray[i].length; j++){
      temp = getRiskValue(arrArray, i, j);
      if(temp > 0 ){
        console.log(temp);
        console.log('low point down '+i+ '  across  '+j);
      }
      sumRisk += temp;
    }
  }
  return sumRisk;
}
let rightEdge = 0;
let topEdge = 0;
let leftEdge = 0;
let botEdge = 0;
let nodeCount = 0;
function getRiskValue(arr, i1, i2){
  //corner case + edge case;
  let myNum = arr[i1][i2];
  let defaultReturn = 0;
  if(i1 === 0){
    if(i2 === 0){ //top left corner
      // console.log('found a corner1');
      if(myNum < arr[0][1] && myNum < arr[1][0])
        return myNum+1;
    }else if( i2 === (MAX_COL - 1)){ // top right corner
      if(myNum < arr[i1][i2-1] && myNum < arr[i1+1][i2])
        return myNum+1;
    }
    else{ // top edge case
      topEdge++;
      if(myNum < arr[0][i2 - 1] && myNum < arr[0][i2 + 1] && myNum < arr[1][i2])
        return myNum+1; 
    }
  } else if(i1 === (MAX_COL -1)){
    if(i2 === 0){ // bot left corner
      // console.log('found a corner3');
      if(myNum < arr[i1 - 1][i2] && myNum < arr[i1][i2 + 1])
        return myNum+1;
    } else if(i2 === (MAX_COL -1)){ // bot right corner
      // console.log('found a corner4');
      if(myNum < arr[i1][i2 - 1] && myNum < arr[i1 - 1][MAX_COL - 1])
        return myNum+1;
    } else {  //  bot edge case
      botEdge++;
      if(myNum < arr[i1][i2-1] && myNum < arr[i1][i2+1] && myNum < arr[i1-1][i2])
        return myNum+1;
    }
  } else if(i2 === 0){ // left edge case
    leftEdge++;
    if(myNum < arr[i1-1][i2] && myNum < arr[i1+1][i2] && myNum < arr[i1][i2+1])
      return myNum+1;
  } else if(i2 === (MAX_COL - 1)){ // right edge case
    rightEdge++;
    if(myNum < arr[i1-1][i2] && myNum < arr[i1+1][i2] && myNum < arr[i1][i2-1])
      return myNum+1;
  } else { // node case
    nodeCount++;
    if(myNum < arr[i1-1][i2] && myNum < arr[i1+1][i2] && myNum < arr[i1][i2-1] && myNum < arr[i1][i2+1])
      return myNum+1;
  }
  return defaultReturn;
}
///////////CALLS////////////
createField();
let myNum = getAnswer(myField);

 console.log('the answer is for part1 is:  '+ myNum);
// console.log('the top edge count is: ' + topEdge);
// console.log('the right edge count is: ' + rightEdge);
// console.log('the left edge count is: ' + leftEdge);
// console.log('the bot edge count is: ' + botEdge);
// console.log('the inner node count is:  '+ nodeCount);
