const fs = require('fs');
const MAX_NUM = 10;
let chart = fs
  .readFileSync('test.txt', {encoding: 'utf-8'})
  .split('\n')
  .filter(Boolean)
  .map(String);


// [{xstart, ystart, xend, yend}]

//loop through object
let navChart = [];

for(let i=0; i<chart.length; i++){
  //enter string loop
  navChart.push(objectifyStr(chart[i]));
}

let points = {};
for(let j=0; j<MAX_NUM; j++){
    points[j] = [];
    for(let h=0; h<MAX_NUM; h++){
      points[j].push(0);
    }
}
let startnum = 0;
let common = 0;
let endnum = 0;
let myLine = {};
let useX = false;
let xGoUp = false;
let yGoUp = false;
let noDiag = false;
let firstNode = {};
let secondNode = {};
//adding the tally for each line
for(let k=0; k<navChart.length; k++){
  startnum = 0;
  startTwo = 0;
  common = 0;
  endnum = 0;
  noDiag = true;
  myLine.xstart = navChart[k]['xstart'];
  myLine.xend = navChart[k]['xend'];
  myLine.ystart = navChart[k]['ystart'];
  myLine.yend = navChart[k]['yend'];
  if((myLine.xstart+myLine.xend) === (myLine.ystart+myLine.yend)){
    if(myLine.ystart !== myLine.xstart){
      noDiag = false;
    } else {
      noDiag = true;
    }
  }
  if(myLine.xstart === myLine.xend && noDiag){
    if(myLine.ystart === myLine.yend){
      points[myLine.xstart][myLine.ystart] += 1;
      continue;
    }
    useX = true;
    common = myLine.xstart;
    if(myLine.ystart > myLine.yend){
      startnum = myLine.yend;
      endnum = myLine.ystart;
    } else {
      startnum = myLine.ystart;
      endnum = myLine.yend;
    }
  } else if(myLine.ystart === myLine.yend && noDiag){
    if(myLine.xstart === myLine.xend){
        points[myLine.xstart][myLine.ystart] += 1;
        continue;
      }
    useX = false;
    common = myLine.ystart;
    if(myLine.xstart > myLine.xend){
        startnum = myLine.xend;
        endnum = myLine.xstart;
      } else {
        startnum = myLine.xstart;
        endnum = myLine.xend;
      }
  } else if((myLine.xstart + myLine.xend) === (myLine.ystart + myLine.yend)){
    //diagonal case
    //handle double up/down case
    if(myLine.xstart === myLine.ystart){
      if(myLine.ystart > myLine.yend){
        yGoUp = false;
        xGoUp = false;
      } else {
        yGoUp = true;
        xGoUp = true;        
      }
    } else if(myLine.xend > myLine.xstart){
      xGoUp = true;
      yGoUp = false;
    } else{
      xGoUp = false;
      yGoUp = true;
    }
    endnum = myLine.xend;
    while(myLine.xstart !== endnum){
      points[myLine.xstart][myLine.ystart] += 1;
      points[myLine.xend][myLine.yend] += 1;
      if(xGoUp){
        myLine.xstart += 1;
        myLine.xend -= 1;
      } else {
        myLine.xstart -= 1;
        myLine.xend += 1;          
      }
      if(yGoUp){
        myLine.ystart += 1;
        myLine.yend -=1;
      } else {
        myLine.ystart -= 1;
        myLine.yend += 1;
      }
      if(myLine.xstart === myLine.xend){
        points[myLine.xstart][myLine.ystart] += 1;
        break;
      }
    }
    continue;
  }else {
      continue;
  }
  while(startnum <= endnum){
    if(useX){
      points[common][startnum] += 1;
    } else{
      points[startnum][common] += 1;
    }
    startnum++;
  }

}
let tempStr = '';
let debugStr = '';
let finalpoints = 0;
for(let ff=0; ff<MAX_NUM; ff++){
  for(let gg=0; gg<MAX_NUM; gg++){
    if(points[ff][gg] > 0){
        tempStr = `(${ff},${gg}) `;
        debugStr += tempStr;
    }
    if(points[ff][gg] > 1){
      finalpoints++;
    }
  }
}

 console.log(debugStr);
console.log('final points is: ' + finalpoints);


let curLine = '';
//PRINT THE OUTPUT
for(let qq=0; qq<MAX_NUM; qq++){
  curLine = '';
  for(let pp=0; pp<MAX_NUM; pp++){
    if(points[qq][pp] === 0){
      curLine += '.';
    } else {
      curLine += points[qq][pp];
    }
  }
  console.log(curLine);
}
//

//store points and values? yes. 999  by 999 points.
// ALGO
//find the matching pair of points
// subtract the non match points. for distance?
// if start is bigger go down. else if start smaller go up.

// store data in object?
// 



//string format
//up to 3 numbers, comma, up to 3 numbers, space, arrow sign, space, repeat start 
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
