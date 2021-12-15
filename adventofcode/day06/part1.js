const NUM_DAYS = 80;
const fs = require('fs');
let fish = fs
  .readFileSync('input.txt', {encoding: 'utf-8'})
  .split("")
  .filter(word =>{
      switch(word){
        case '0':
        case '1':
        case '2':
        case '3':
        case '4':
        case '5':
        case '6':
        case '7':
        case '8':
        case '9':
         return true;
        default:
         return false;
      }
  }).map(Number);
//////////////////END PARSE////////////////////////////////////////////////


/////////CREATE fish OBJECT///////////////////
//first count the number of each:
let fishObj = {};
function lanternFish(){
  let numOne=0, numTwo=0, numThree=0, numFour=0, numFive=0;
  for(let i=0; i<fish.length; i++){
    switch(fish[i]){
      case 1:
        numOne++;
        break;
      case 2:
        numTwo++;
        break;
      case 3:
        numThree++;
        break;
      case 4:
        numFour++;
        break;
      case 5:
        numFive++;
        break;
      default:
        break;
    }
  }
  fishObj[1] = numOne;
  fishObj[2] = numTwo;
  fishObj[3] = numThree;
  fishObj[4] = numFour;
  fishObj[5] = numFive;
}
///////////MAIN ALGORITHM//////////////////////////////
function incubate(obj, days){
  console.log('I GOT IN');
  let kidOne = numKids(1, days);
  console.log('I GOT OUT');
  let kidTwo = numKids(2, days);
  let kidThree = numKids(3, days);
  let kidFour = numKids(4, days);
  let kidFive = numKids(5, days);

  let totalKids = (kidOne * obj[1])
   + (kidTwo * obj[2])
   + (kidThree * obj[3])
   + (kidFour * obj[4])
   + (kidFive * obj[5]);

  let totalFish = obj[1] + obj[2] + obj[3] + obj[4] + obj[5] + totalKids;
  console.log('totalFish: '+totalFish);
}
/////////////////RECURSIVE KID COUNTER/////////////////////////
function numKids(num, days){
  let ct = num;
  let sunsets = 0;
  let kids = 0;
  while(sunsets < days){
    sunsets++; ct--;
    if(ct < 0){
      ct = 6;
      kids++;
      kids += numKids(8, (days-sunsets));
    }
  }
  return kids;
}
/////////////CALL ALGOS///////////////////////////////
lanternFish();
incubate(fishObj, NUM_DAYS);