const fs = require('fs');

const myInput = fs
.readFileSync('input.txt', { encoding: 'utf-8'})
.split("\r\n")
.filter(Boolean);

function getPointsArray(arr){
  let properCloseArr = [];
  let curArr;
  for(let i=0; i<arr.length; i++){  
    curArr = getProperClose(arr[i]);
    if(curArr.length > 0){
      properCloseArr.push(curArr);
    }
  }
  let pointsArr = new Array(properCloseArr.length);
  for(let j=0; j<properCloseArr.length; j++){
    pointsArr[j] = countPoints(properCloseArr[j]);
  }
  return pointsArr;
}
function countPoints(arr){
  let count = 0;
  for(let i=0; i<arr.length; i++){
    count = count * 5;
    switch(arr[i]){
      case ')': count += 1; break;
      case ']': count += 2; break;
      case '}': count += 3; break;
      case '>': count += 4; break;
    }
  }
  return count;
}
function getProperClose(str){
  let myStr = str;
  let isWrongClose = false;
  let myArr = myStr.split('');
  let badReturn = [];
  let openArr = [];
  for(let i=0; i<myArr.length; i++){
    let ai = myArr[i];
    if(ai === '(' || ai === '[' || ai === '{' || ai === '<')
    openArr.push(ai);
    else {
      if(openArr.length < 1) {
        isWrongClose = true;
        break;
      }
      let oP = getOpenCounterPart(ai);
      if(openArr[openArr.length - 1] === oP)
      openArr.pop();
      else{
        isWrongClose = true;
        break;
      }
    }
  }
  if(isWrongClose){
    return badReturn;
  } else {
    return flipOpenArray(openArr);
  }
}
function flipOpenArray(arr){
  let reArr = [];
  for(let i=arr.length-1; i >= 0; i--){
    reArr.push(getCloseCounterPart(arr[i]));
  }
  return reArr;
}
function getCloseCounterPart(char){
  switch(char){
    case '(':
        return ')';
    case '{':
        return '}';
    case '[':
        return ']';
    case '<':
        return '>';
    default:
        return null;
  }  
}
function getOpenCounterPart(char){
  switch(char){
    case ')':
        return '(';
    case '}':
        return '{';
    case ']':
        return '[';
    case '>':
        return '<';
    default:
        return null;
  }
}
//assume odd number in array.
function getMidPoint(arr){
  // console.log(arr);
  if(arr.length % 2 === 0) {console.log('this was an even Array');}
  let myArr = arr.sort(function(a, b) {
    return a - b;
  });
  // console.log(myArr);
  let mid = Math.floor(myArr.length / 2);
  return myArr[mid];
}

// console.dir(myInput, {'maxArrayLength': null});
//////////CALLS////////////////////////////////
let ansArr = getPointsArray(myInput);
let answer = getMidPoint(ansArr);
console.log('the midpoint high score is:  '+ answer);
