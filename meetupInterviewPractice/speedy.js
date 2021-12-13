const n = 5;
const relations = [[1,5],[2,5],[3,5],[3,4],[4,5]];
const time = [1,2,3,4,5];

let timeSpent = 0; 
let coursesTaking = [];
let coursesCompleted = [];
let longestClass = 0;

function minimumTime(n, relations, time){
  totalClasses = n;
  timeSpent = 0;
  let timeJump = 0;
  coursesTaking = [];
  coursesCompleted = [];
  let classToEnd = 0;
  let indexThatEnds = 0;
  let coursesRequired = {};
  let coursesImADependent = {};
  for(let i=0; i<totalClasses; i++){
    coursesRequired[i+1] = [];
    coursesImADependent[i+1] = [];
  }
  for(let j=0; j<relations.length; j++){
    coursesRequired[relations[j][1]].push(relations[j][0]);
    coursesImADependent[relations[j][0]].push(relations[j][1]);
  }
//   console.log(coursesRequired);
//   console.log(coursesImADependent);
  //enroll in all non requisite classes.
  for(let k=0; k<totalClasses; k++){
    if(coursesRequired[k+1].length === 0){
      coursesTaking.push(k+1);
    }
  }
  console.log('first classes you can take are: ');
  console.log(coursesTaking);
   while(coursesCompleted < totalClasses){
    //find the shortest class time in coursesTaking
    timeJump = time[coursesTaking[0] - 1];
    classToEnd = coursesTaking[0];
    for(let l=0; l<coursesTaking.length; l++){
      if(timeJump > time[coursesTaking[l] - 1]){
        timeJump = time[coursesTaking[l] - 1];
        classToEnd = coursesTaking[l];
        indexThatEnds = l;
      }
    }
    // advance time to complete the shortest class
    timeSpent += timeJump;
    //remove the time from the time for each class taking now
    for(let d=0; d<coursesTaking.length; d++){
      time[coursesTaking[d] - 1] -= timeJump;
    }
    //remove the class from coursesTaking
    coursesTaking.splice(indexThatEnds, 1);
    //add the finished class to coursesCompleted
    coursesCompleted.push(classToEnd);
    //check if that class completion unlocked a new class
    for(let r=0; r<coursesImADependent[classToEnd].length; r++) {
      let z = coursesImADependent[classToEnd][r];
      for(let q=0; q<coursesRequired[z].length; q++){
        if(coursesRequired[z][q] === classToEnd){
          coursesRequired[z].splice(q, 1);
          if(coursesRequired[z].length === 0){
            coursesTaking.push(coursesRequired[z]);
          }
          break;
        }  
      }
    }
    console.log('coursesTaking : ' + coursesTaking);
    console.log('class '+classToEnd+' will end next in '+ timeJump + 'hours');
   }
   console.log('total timeSpent was: '+timeSpent);
   return timeSpent;
}
minimumTime(n, relations, time);