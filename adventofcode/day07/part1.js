const fs = require('fs');
const { get } = require('http');
const MAX_NUM = 2000;
let crabs = fs
  .readFileSync('input.txt', {encoding: 'utf-8'})
  .split(",")
  .filter(Boolean)
  .map(Number);

//   console.dir(crabs, {'maxArrayLength': null});
let prac = [11, 3, 2, 7, 15, 5, 10];
let prac2 = [1,1,2,4,0,2,7,16,14,2];

function getGasUsed(arr, num){
  let gasUsed = 0;
  for(let j=0; j<arr.length; j++){
    if(arr[j] >= num){
      gasUsed += arr[j] - num;
    } else {
      gasUsed += num - arr[j];
    }
  }
  return gasUsed;
}

// for(let p=0; p<16; p++){
//     console.log('p: ' + p);
//     console.log(getGasUsed(prac, p));
// }

function findBestAlignment(arr){
  let goDown = true, goUp = true;
  let curBestNum = Math.floor(arr.length / 2);
  let curBestGas = getGasUsed(arr, curBestNum);
  while(goDown && curBestNum > 0){
    let curGas = getGasUsed(arr, curBestNum -1);
    if(curGas <= curBestGas){
      curBestGas = curGas;
      curBestNum--;
    } else{
      goDown = false;
    }
  }
  while(goUp && curBestNum < MAX_NUM){
    let myGas = getGasUsed(arr, curBestNum+1);
    // console.log('curBestNum: '+ curBestNum+ 'curBestGas: '+curBestGas+ 'newGas: '+ myGas);
    if(myGas <= curBestGas){
        curBestGas = myGas;
        curBestNum++;
      } else{
        goUp = false;
      }
  }
  console.log('best alignment is : '+curBestNum);
  return curBestNum;
}
// console.dir(crabs, {'maxArrayLength': null});
// console.log('length: '+crabs.length);

console.log(getGasUsed(crabs, findBestAlignment(crabs)));
// console.log('average is : '+ curNum);
// console.log('crabs sum: '+ sum);
