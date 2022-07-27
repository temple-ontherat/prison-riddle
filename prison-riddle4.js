//declare global variable
let success="";
let nums="";
let repeat=0;
let dead=0;
let trialSuccess=0;
let trialFail=0;
let trialNum=100000;
//The setup function is necessary using P5.js.
function setup() {
//Make a button and point to answer function when pressed.  
let ans=select('button');
ans.mousePressed(answer);
// I'm sure there is a more visually elegant way to do this
// program with CSS, but I'm not there yet, so I'm using scrolling.
window.scrollTo(0, 600);
}
//reveals answer and explain program
function answer() {
document.getElementById("test").innerHTML="Before they go into the room the prisoners each agree to open the first box based on their own number, and then every subsequent box based on the number revealed. For example, prisoner 22 will go to box 22, open it, and then go to the next box that has the same outside number as the number just revealed. They will continue like this until they either reveal their number, or they open a total of 50 boxes. If each prisoner follows this rule, there is slightly more than a 30% chance that all 100 prisoners will find their numbers, and all of them will live."
document.getElementById("test2").innerHTML="Each time the run button is clicked, it will calculate 10,000 times whether all the 100 prisoners find their numbers in less than 50 tries and live, or just one has failed, making them all fail. I realize the run button disappears after a while, but you get the idea."
//make run and restart buttons and point them to functions putBoxNums and restrt.
press=createButton("Run");
press2=createButton("Restart");
window.scrollTo(0, 600);
press.mousePressed(putBoxNums);
press2.mousePressed(restrt);
}
//refreshes
function restrt(){
  location.reload();
}
//starts array creation, numbers randomizations, and prisoners walking
function putBoxNums() {
  trialSuccess=0;
  trialFail=0;  
  for (let y=0; y<trialNum;y++) {
  let nums=""
  tally=0;
  const innerBoxNum=[];
  dead=0;
  for (let i=0;i<100;i++) {
    innerBoxNum[i]=i;    
  }//The two following for loops randomize the array of numbers 0 through 99. Remarkably, if you don't do it twice, it doesn't work! No prisoner succeeds! Try it with just one!
  for (let i = innerBoxNum.length -1; i > 0; i--) {
   let j = Math.floor(Math.random() * i);
   let k = innerBoxNum[i];
   innerBoxNum[i] = innerBoxNum[j];
   innerBoxNum[j] = k;
  }
  for (let i = innerBoxNum.length -1; i > 0; i--) {
    let j = Math.floor(Math.random() * i);
    let k = innerBoxNum[i];
    innerBoxNum[i] = innerBoxNum[j];
    innerBoxNum[j] = k;
   } // Not necessary to randomize three times, so I commented this out.
  /* for (let i = innerBoxNum.length -1; i > 0; i--) {
    let j = Math.floor(Math.random() * i);
    let k = innerBoxNum[i];
    innerBoxNum[i] = innerBoxNum[j];
    innerBoxNum[j] = k;
   } */
   //make the random number display
   for (let i=0;i<100;i++) {
     nums = nums+" "+innerBoxNum[i]+"("+i+")";
  }//Dead man walking?
for (let i=0;i<100;i++) {
  
tally=1;
//create first box revealed
//let nextBoxTally=i+"(1) ";
//assign prisoner number to like box number
let nextBox=i; 
//createP("Prisoner number "+i+"."); 
//while the prisoner number doesn't equal the inner box number, the inner box number becomes the outer label (index) for the next box revealed
while (i != innerBoxNum[nextBox]) {
      tally+=1; 
      nextBox=innerBoxNum[nextBox];
      //keeps record of boxes revealed.
      //nextBoxTally+=nextBox+"("+tally+")"+" ";
    }
    //displays random numbers.
//createP("Here are the random numbers. The box label is in parentheses."+nums);
//displays which boxes revealed.
//createP("Here are the boxes revealed: The attempt number is in parentheses. "+nextBoxTally);
//displays revealed box count.
//createP("Number of boxes revealed: "+tally);
//counts how many prisoners fail and assigns a message to success variable.
if (tally>50) {
     success="Prisoner fails. They all die.";
    dead=dead+1;
    }
    //Assigns appropriate message to success variable.
//else if (tally<=50) {
//     success="Prisoner "+i+" survives.";
 //   }
    //displays success variable message
//createP(success);
//prints a line to screen to separate each prisoner (because I don't know how to do it in HTML)
//createP("------------------------------------------------------------");
}
//condition statements which ask if any prisoners died, and displays the appropriate message.
const test2=document.getElementById("test2");
   if (dead>0) {
     trialFail=trialFail+1;
    //make message standout better by changing it to red or green.
    //test2.style.color="red";
   // test2.innerHTML="Looks like they're all dead. Scroll down for details.";
   }
   else {
     trialSuccess=trialSuccess+1;
    //test2.style.color="green";
    //test2.innerHTML="They all survived! Scroll down for details.";

   }
   //more scrolling, because lazy.
  // window.scrollTo(0, 0);
}
createP("Number of trials: "+trialNum);
createP("Number of successes: "+trialSuccess);
createP("Number of fails: "+trialFail);
createP("Percentage successful: "+ (trialSuccess/trialNum*100));
window.scrollTo(0, 1000);
}



