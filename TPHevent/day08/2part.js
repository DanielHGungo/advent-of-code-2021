const fs = require('fs');

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
//{0:['a', 'b', 'c', 'd', 'e', 'f'] 1: 2: .... etc 9:}
// if includes all in the array it is that number

//if length = 2, 3, 4, 8 the number is obvious
//example of decoder object {} 
//decode array [{decoder object..}, {d.o.}, {d.o.}, {}, {}, {}, {}, {}, {}]
function getDecObjArr(arr){
  let myArr = [];
  for(let i=0; i<arr.length; i++){
    let myDObj = decodeTen(arr[i]);
    myArr.push(myDObj);
  }
  return myArr;
}
//{top:'g', }
//if top, topr, botr 
//[top, topl, botl, bot, botr, topr, mid]
//[g, cf, , ade, , bc, bc, cf]
function decodeTen(arr){
  let obj = {};
  for(let i=0; i<arr.length; i++){
    if(arr[i].length === 2){
      obj[1] = getIncludesArr(arr[i]);
    } else if(arr[i].length === 3){
      obj[7] = getIncludesArr(arr[i]);
    } else if(arr[i].length === 4){
      obj[4] = getIncludesArr(arr[i]);
    }
  }
  return obj;
  //now that we know the key for those 3 numbers...
  // construct right side, top left L, bot left L

}
function setEasy(sObj, str, num){
  sObj[num] = getIncludesArr(str);
}
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
//returns an array of all characters included in str
/////Calls////////////////////////////////////////////////////////////////
let arr1 = trimToFirstTen(outputNums);
console.dir(getDecObjArr(arr1), {"maxArrayLength":null});
// console.dir(outputNums, {"maxArrayLength":null});
///end calls////////////////////////////////////////////////////////////////