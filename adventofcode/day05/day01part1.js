const fs = require('fs');
const MAX_NUM = 1000;
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
let goUp = false;
//adding the tally for each line
for(let k=0; k<navChart.length; k++){
  startnum = 0;
  common = 0;
  endnum = 0;
  myLine.xstart = navChart[k]['xstart'];
  myLine.xend = navChart[k]['xend'];
  myLine.ystart = navChart[k]['ystart'];
  myLine.yend = navChart[k]['yend'];

  if(myLine.xstart === myLine.xend){
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
  } else if(myLine.ystart === myLine.yend){
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
  } else {
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
let finalpoints = 0;

for(let ff=0; ff<MAX_NUM; ff++){
  for(let gg=0; gg<MAX_NUM; gg++){
    if(points[ff][gg] > 1){
      finalpoints++;
    }
  }
}

 console.log(points);
console.log('final points is: ' + finalpoints);

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
