const fs = require('fs');

const lines = fs
  .readFileSync('day03.txt', { encoding: 'utf-8'})
  .split('\n')
  .filter(Boolean)
  .map(String);




console.log(lines);
console.log('hello daniel');
let strange = "there was no confusion";
let myGamma = "";
let oneIsGreater = true;
let tallyOne, tallyZero;
for(let i=0; i<12; i++){
    
    tallyOne = 0;
    tallyZero = 0;
    for(let n=0; n<lines.length; n++){
        if(lines[n].charAt(i) === '0'){
            tallyZero++;
        }else{
            tallyOne++;
        }
    }
    if(tallyOne >= tallyZero){
        oneIsGreater = true;
    }
    else if(tallyZero > tallyOne){
        oneIsGreater = false;
    }
    else{
        strange ="Tough shit";
    }
    if(lines.length === 1){ break;}
    for(let p=0; p<lines.length; p++){
        if(lines.length === 1){break;}
        if(!oneIsGreater){
            if(lines[p].charAt(i) === '1'){
                lines.splice(p, 1);
                p--;
            }
        }
        else{
            if(lines[p].charAt(i) === '0'){
                lines.splice(p, 1);
                p--;
            }
        }
    }
}

console.log("my lines is :"+ lines);
console.log(strange);
function mainAlgo(){

}
