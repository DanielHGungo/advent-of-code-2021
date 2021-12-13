//////////BEGIN PARSING TXT//////////////
const fs = require('fs');
const MAX_NUM = 1000;
let chart = fs
  .readFileSync('input.txt', {encoding: 'utf-8'})
  .split('\n')
  .filter(Boolean)
  .map(String);

//THIS IS THE DATA STRUCTURE
// [{xstart, ystart, xend, yend}]
//loop through objects array
let navChart = [];

for(let i=0; i<chart.length; i++){
  //
  navChart.push(objectifyStr(chart[i]));
}
/************ END PARSING TEXT********** */
//points is {Obj} with number fields from 0 up to MAX_NUM - 1
//each field holds an array of a number of 0's up to MAX_NUM
//points is our cartesian plane. the grid.
let points = {};
for(let j=0; j<MAX_NUM; j++){
    points[j] = [];
    for(let h=0; h<MAX_NUM; h++){
      points[j].push(0);
    }
}
/////////////END SETUP////////
//***MAIN ALGORITHM CALL */
function applyNavigation(){

  for(let k=0; k<navChart.length; k++){
    //check for same start same end
    if(navChart[k]['xstart'] === navChart[k]['xend'] &&
     navChart[k]['ystart'] === navChart[k]['yend'])
     {
       points[navChart[k]['xstart']][navChart[k]['ystart']] += 1;
       continue;
     }
    //check if its a diagonal line
    if(navChart[k]['xstart'] !== navChart[k]['xend'] && 
       navChart[k]['ystart'] !== navChart[k]['yend'])
    {
      // console.log(' input #: ' +(k+1));
      applyDiagonal(navChart[k]);
    } else {
      applyStraight(navChart[k]);
    }
  }
}
//handles adding points to grid for diagonal lines
function applyDiagonal(myObj){
  let xGoUp, yGoUp;
  // the (a, a) -> (b, b) diagonal case
  if(myObj.xstart < myObj.xend){
    xGoUp = true;
  } else {
    xGoUp = false;
  }
  if(myObj.ystart < myObj.yend){
    yGoUp = true;
  } else {
    yGoUp = false;
  }

  while(myObj.xstart !== myObj.xend && myObj.ystart !== myObj.yend){
    points[myObj.xstart][myObj.ystart] += 1;

    if(xGoUp){
      myObj.xstart += 1;
    } else{
      myObj.xstart -= 1;
    }
    if(yGoUp){
      myObj.ystart += 1;
    } else {
      myObj.ystart -= 1;
    }
  }
  points[myObj.xend][myObj.yend] += 1;

  // console.log('diagonal xUp: '+xGoUp + '  yUp: '+yGoUp);
}
//handles adding points to our grid for Horizontal and vertical lines
function applyStraight(myObj){
  let xMove = true, yMove = true;
  let startNum, endNum;
  if(myObj.xstart === myObj.xend){
    xMove = false;
    startNum = myObj.ystart;
    endNum = myObj.yend;
  } else{
    yMove = false;
    startNum = myObj.xstart;
    endNum = myObj.xend;
  }
  let goUp = true
  if(startNum > endNum){
    goUp = false;
  }
  // console.log(' xmove: '+xMove + '  ymove: '+yMove + ' goUp: '+ goUp);
  // console.log('startNum: '+startNum + '  endNum: '+ endNum);
  //iterate through
  points[myObj.xend][myObj.yend] += 1;
  while(startNum !== endNum){
    points[myObj.xstart][myObj.ystart] += 1;
    if(xMove){
      if(goUp){
        myObj.xstart += 1;
      } else{
        myObj.xstart -=1;
      }
      startNum = myObj.xstart;
    } else{
      if(goUp){
        myObj.ystart += 1;
      } else {
        myObj.ystart -= 1;
      }
      startNum = myObj.ystart;
    }
  }
}
/////////unComment to display the grid//////////////
function showOutput(points){
  let curLine = '';
  let count = 0;
  //PRINT THE OUTPUT
  for(let qq=0; qq<MAX_NUM; qq++){
    // curLine = '';
    for(let pp=0; pp<MAX_NUM; pp++){
      // if(points[pp][qq] === 0){
      //   curLine += '.';
      // } else {
      //   curLine += points[pp][qq];
      // }
      if(points[pp][qq] > 1){
        count++;
      }
    }
    // console.log(curLine);
  }

  console.log('total nodes with value 2 or higher is: ' +count);
}
/**************A PARSING HELPER FUNCTION specific format of input*/
function objectifyStr(ogStr){
  let obj = {};
  let str = ogStr;
  let comma = 1;
  let space = 1;
  let char;
  for(let i=0; i<str.length; i++){
    char = str.charAt(i);
    if(char === ','){
      if(comma === 1){
        obj.xstart = parseInt(str.substring(0, i));
        comma++;
        str = str.substring(i+1);
        i=0;
      } else {
        obj.xend = parseInt(str.substring(0, i));
        str = str.substring(i+1);
        obj.yend = parseInt(str);
        break;
      }
    }
    if(char === ' '){
      if(space === 1){
        obj.ystart = parseInt(str.substring(0, i));
        space++;
        str = str.substring(i+1);
        i=0;
      }
      else{
        str = str.substring(i+1);
        i=0;
      }
    }
  }
  return obj;
}

// console.log(navChart);
/******EXECUTE ALGORITHM */
applyNavigation();
showOutput(points);
// console.log(navChart);