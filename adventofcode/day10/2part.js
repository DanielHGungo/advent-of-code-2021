const fs = require('fs');

const myInput = fs
.readFileSync('input.txt', { encoding: 'utf-8'})
.split("\r\n")
.filter(Boolean);

function countUnexpected(arr){
  let wrongArray = [];
  let wrongChar;
  for(let i=0; i<arr.length; i++){  
    wrongChar = getWrongClose(arr[i]);
    if(wrongChar !== 'good'){
        wrongArray.push(wrongChar);
    }
  }
  return countPoints(wrongArray);    
}
function countPoints(arr){
  let count = 0;
  for(let i=0; i<arr.length; i++){
    if(arr[i] === ')')
    count += 3;
    else if(arr[i] === '}')
    count += 1197;
    else if(arr[i] === ']')
    count += 57;
    else
    count += 25137;
  }
  return count;
}
function getWrongClose(str){
  let myStr = str;
  let myArr = myStr.split('');
  let openArr = [];
  for(let i=0; i<myArr.length; i++){
    let ai = myArr[i];
    if(ai === '(' || ai === '[' || ai === '{' || ai === '<')
    openArr.push(ai);
    else {
      if(openArr.length < 1) { return ai; }
      let oP = getOpenCounterPart(ai);
      if(openArr[openArr.length - 1] === oP)
      openArr.pop();
      else
      return ai;
    }
  }
  return 'good';
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
// console.dir(myInput, {'maxArrayLength': null});
//////////CALLS////////////////////////////////
let num = countUnexpected(myInput);
console.log('the answer value is:  '+ num);
