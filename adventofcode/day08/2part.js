const fs = require('fs');
const { findSourceMap } = require('module');

const tenNums = fs
.readFileSync('input.txt', {encoding: 'utf-8'})
.split("\r\n");
const outputNums = fs
.readFileSync('input.txt', {encoding: 'utf-8'})
.split("\r\n");

function trimToFirstTen(myStr){
  let myArr = [];
  for(let i=0; i<myStr.length; i++){
    myStr[i] = myStr[i].substring(0, myStr[i].indexOf("|") -1);
    myArr.push(myStr[i].split(" "));
  }
  return myArr;
}
function trimToOutput(myStr){
  let myArr = [];
  for(let i=0; i<myStr.length; i++){
    myStr[i] = myStr[i].substring(myStr[i].indexOf("|") + 2);
    myArr.push(myStr[i].split(" "));
  }
  return myArr;
}


function getDecObjArr(arr){
  let myArr = [];
  let myDObj;
  for(let i=0; i<arr.length; i++){
    myDObj = decodeTen(arr[i]);
    myArr.push(myDObj);
  }
  return myArr;
}

function decodeTen(arr){
  let objSix = {a:0, b:0, c:0, d:0, e:0, f:0, g:0};
  let objFour = {a:0, b:0, c:0, d:0, e:0, f:0, g:0};
  let letters = ['a', 'b', 'c', 'd', 'e', 'f', 'g'];
  let curObj;
  for(let i=0; i<arr.length; i++){
    let leng = arr[i].length;
    if(leng === 2 || leng === 3 || leng === 4 || leng === 7){
      curObj = objFour;
    } else {
      curObj = objSix;
    }
    for(let j=0; j<arr[i].length; j++){
      curObj[arr[i].charAt(j)]++;
    }
  }
  let sum =0;
  let decObj = {};
  for(let k=0; k<letters.length; k++){
    sum = objSix[letters[k]] + objFour[letters[k]];
    if(sum === 9){
      decObj[letters[k]] = 'botr';
    } else if(sum === 6){
      decObj[letters[k]] = 'topl';
    } else if(sum === 4){
      decObj[letters[k]] = 'botl';
    }else if(sum === 8){
      if(objFour[letters[k]] === 2){
        decObj[letters[k]] = 'top';
      } else {
        decObj[letters[k]] = 'topr';
      }
    }else if(sum === 7){
      if(objFour[letters[k]] === 1){
        decObj[letters[k]] = 'bot';
      } else {
        decObj[letters[k]] = 'mid';
      }
    } else{
      decObj[letters[k]] = 'error';
    }
  }
  return decObj;
}
//obj is decObj
function strToArray(obj, str){
  let myStr = str;
  let arr = myStr.split("");
  let reArr = new Array(str.length);
  for(let i=0; i<arr.length; i++){
    reArr[i] = decObj[arr[i]];
  }
  return reArr;
}
function numFromStrArray(arr){
  let leng = arr.length;
  if(leng === 2){ return '1'; }
  if(leng === 3){ return '7'; }
  if(leng === 4){ return '4'; }
  if(leng === 7){ return '8'; }
  if(leng === 6){
    if(!arr.includes('topr')){
      return '6';
    }
    if(!arr.includes('mid')){
      return '0';
    }
    return '9';
  }
  if(leng === 5){
    if(!arr.includes('topl')){
      if(!arr.includes('botl')){
        return '3';
      } else{
        return '2';
      }
    }
    return '5';
  }
}
// function getIndexByChar(char){
//   switch(char){
//     case 'a':
//       return 0;
//     case 'b':
//       return 1;
//     case 'c':
//       return 2;
//     case 'd':
//       return 3;
//     case 'e':
//       return 4;
//     case 'f':
//       return 5;
//     case 'g':
//       return 6;
//     default:
//       return null;
//   }
// }
function getIncludesArr(str){
  let reArr = [];
  let myStr = str;
  let arr = myStr.split("");
  let h = ['a', 'b', 'c', 'd', 'e', 'f', 'g'];
  for(let i=0; i<h.length; i++){
    if(arr.includes(h[i])){
      reArr.push(h[i]);
    }
  }
  return reArr;
}
function runDecoder(doArr, outpArr){
  let reArr = new Array(200);
  let curNum = 0;
  for(let i=0; i<outpArr.length; i++){
    curNum = decodeNum(doArr[i], outpArr[i]);
    reArr[i] = curNum;
  }
  return reArr;
}
function decodeNum(doObj, fourArr){
  let numCoded = [];
  for(let n=0; n<4; n++){ numCoded.push([]); }
  let myStr = "";
  for(let i=0; i<fourArr.length; i++){
    myStr = fourArr[i];
    let sArr = myStr.split("");
    for(let j=0; j<sArr.length; j++){
      numCoded[i].push(doObj[sArr[j]]);
    }
  }

  let myNumStr = "";
  for(let k=0; k<numCoded.length; k++){
    myNumStr += numFromStrArray(numCoded[k]);
  }
  return parseInt(myNumStr);
}
function getSumArray(arr){
  let count = 0;
  for(let i=0; i<arr.length; i++){
    count += arr[i];
  }
  return count;
}
//returns an array of all characters included in str
/////Calls////////////////////////////////////////////////////////////////
let arr1 = trimToFirstTen(tenNums);
let decObjArr = getDecObjArr(arr1);
let outputsArr = trimToOutput(outputNums);
// console.log(outputsArr);
let addendArr = runDecoder(decObjArr, outputsArr);
let myTotal = getSumArray(addendArr);
console.log('The part 2 answer is:   ' + myTotal);
// console.dir(getDecObjArr(arr1), {"maxArrayLength":null});
// console.dir(outputNums, {"maxArrayLength":null});
///end calls////////////////////////////////////////////////////////////////