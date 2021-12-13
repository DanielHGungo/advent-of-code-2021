const n = 4;
const relations = [[1,3],[2,4]];
const time = [5,3,3,5];


let timeSpent = 0; 
let coursesTaking = [];
let coursesCompleted = [];
let longestClass = 0;

function minimumTime(n, relations, time){
  totalClasses = time.length;
  coursesTaking = [];
  coursesCompleted = [];
  coursesRequired = [];
  timeSpent = 0;
  //first set up a better structure for storing requirements
  for(let i=0; i<totalClasses; i++){
    coursesRequired.push([]);
  }
  for(let j=0; j<relations.length; j++){
    // console.log('j1 : '+relations[j][1]);
    // console.log('j0 '+relations[j][0]);
    coursesRequired[relations[j][1] - 1].push(relations[j][0]);
  }
//GOOD TIL HERE
  while(coursesCompleted.length < totalClasses){
    coursesTaking = [];
    longestClass = 0;
    //search for classes I can take
    for(let k=0; k<totalClasses; k++){
      if(coursesCompleted.includes(k+1)){
      }else if(canTake(coursesRequired, coursesCompleted, k, coursesTaking)){
        coursesTaking.push(k+1);
      }
    }
    //add coursesTaking to coursesCompleted, calculate time spent on them.
    for(let h=0; h<coursesTaking.length; h++){
      if(time[coursesTaking[h] - 1] > longestClass){
        longestClass = time[coursesTaking[h]-1];
      }
      coursesCompleted.push(coursesTaking[h]);
    }
    console.log('classesTaking: ' + coursesTaking);
    timeSpent += longestClass;
  }
  console.log(coursesRequired);
  console.log(coursesCompleted);
  console.log('time : ' + timeSpent);
  return timeSpent;
}
function canTake(coursesRequired, coursesCompleted, k, coursesTaking){
  if(coursesRequired[k].length === 0){
    // console.log('can take k: '+ k);
    return true;
  }
  for(let i=0; i<coursesRequired[k].length; i++){
    if(!coursesCompleted.includes(coursesRequired[k][i])){
    //   console.log('cant take k: '+ k);
        return false;
    }
  }
//   console.log('can take k: '+ k);
  return true;
}
minimumTime(n, relations, time);