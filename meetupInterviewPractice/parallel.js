const n = 5;
const relations = [[1,5],[2,5],[3,5],[3,4],[4,5]];
const time = [1,2,3,4,5];

let timeSpent = 0; 
let coursesTaking = [];
let coursesCompleted = [];
let longestClass = 0;


function minimumTime(n, relations, time){
  totalClasses = time.length;
  timeSpent = 0;
  coursesTaking = [];
  coursesCompleted = [];
  timeSpent = 0;
  let aClassEnded = false;
  let coursesRequired = [];
//   let courseThatEnded = 0;
  for(let i=0; i<totalClasses; i++){
    coursesRequired.push([]);
  }
  for(let j=0; j<relations.length; j++){
    coursesRequired[relations[j][1] - 1].push(relations[j][0]);
  }
  console.log('hello');
  //continue taking classes until all completed.
  while(coursesCompleted.length < totalClasses){
    //search for classes you can take
    aClassEnded = false;
    for(let k=0; k<totalClasses; k++){
      if(coursesCompleted.includes(k+1))
      continue;
      if(coursesTaking.includes(k+1)){
        continue;
      }
      if(canTake(coursesRequired, coursesCompleted, k)){
        coursesTaking.push(k+1);
      }
    }
    //subtract 1 from time[i] for all coursesTaking if it is 0. go back up
    while(!aClassEnded){
      console.log(time);
      timeSpent++;
      for(let h=0; h<coursesTaking.length; h++){
        if(time[coursesTaking[h]-1] === 0){
          continue;
        }
        time[coursesTaking[h]-1] -= 1;
        if(time[coursesTaking[h]-1] === 0){
          coursesCompleted.push(coursesTaking[h]);
          aClassEnded = true;
        }
      }
      //remove classes that ended from coursesTaking
      if(aClassEnded){
        let temp = [];
        for(let m=0; m<coursesTaking.length; m++){
          if(!coursesCompleted.includes(coursesTaking[m])){
            temp.push(coursesTaking[m]);
          }
        }
        coursesTaking = [];
        coursesTaking = temp.slice();
      }   
    }
  }
  console.log('time spent: '+ timeSpent);
  return timeSpent;
}
function canTake(coursesRequired, coursesCompleted, k){
    if(coursesRequired[k].length === 0){
      return true;
    }
    for(let i=0; i<coursesRequired[k].length; i++){
      if(!coursesCompleted.includes(coursesRequired[k][i])){
          return false;
      }
    }
    return true;
}


minimumTime(n, relations, time);