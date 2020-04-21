let seconds=document.getElementById('countdown').innerHTML;
const grid=document.getElementById('grid');
var seconds2 = document.getElementById('countdown');
var gon = 0;
let mode=0;
var bleep=new Audio('sound.mp3');
let hackerMode=document.getElementById('hacker-mode');
hackerMode.onclick=()=>{
  mode=1;
  document.body.style.backgroundColor='black';
}
seconds2.style.display = 'none';
grid.style.display='none';
function sgame(){
	if(gon===0){
	gon = 1;
  let st=document.getElementById('st');
    st.style.display='none';
	seconds2.innerHTML = 3;
	seconds2.style.display = 'block';
let countdown=setInterval(function(){
    seconds--;
	document.getElementById('countdown').innerHTML=seconds;
    if(seconds<=0){
    grid.style.display='grid';
      clearInterval(countdown);
      document.getElementById('countdown').style.display='none';
      startGame();
        }
},1000); 
}
else{
  
	window.location.reload();
}
}
let initialCounter=21;
let seconds1=0;
let milliseconds=0;
let interval=null;
var best=[];

function stopwatch(){
  milliseconds+=5;
  if(milliseconds/1000===1){
    milliseconds=0;
    seconds1++;
  }
  document.getElementById('time-data').innerHTML=seconds1 +":" +milliseconds;
}
function startGame(){
  {
    interval=window.setInterval(stopwatch,5);
    game();
    
  }
}
function stopGame(){
  
  document.getElementById('time-data').innerHTML='0.000';
  if(best.length>0 && seconds1<best[best.length-1]){
    best.push(seconds1+(milliseconds*0.001));
  }
  else if(best.length===0){
  	best[0]=seconds1+(milliseconds*0.001);
  }
  window.clearInterval(interval);
  document.getElementById('best-time').innerHTML=Math.min(...best);
  grid.innerHTML='Your time is  '+ seconds1+':'+milliseconds;
  seconds1=0;
  milliseconds=0;
  let button=document.createElement('div');
  button.className='restart';
  button.innerHTML='Restart';
  grid.appendChild(button);

button.onclick=()=>{
  startGame();
};
if(mode===1){
  let levelButton=document.createElement('div');
  levelButton.className='level';
  levelButton.innerHTML='Next level';
  grid.appendChild(levelButton);
  console.log(level);
  levelButton.onclick=()=>{
    
    startGame();
    level++;
    console.log(level);
  };
}
  
initialCounter=21;
};

function changeText(element){
  
  if(initialCounter-element.innerHTML===20 && initialCounter<=40){
     element.innerHTML=initialCounter;
     initialCounter++;
     console.log(initialCounter);
     console.log(element.innerHTML)
  }
  else if(initialCounter-element.innerHTML===20 && initialCounter>40){
    element.innerHTML=' ';
  initialCounter++;
  }
  if(initialCounter===61){
    stopGame();
  } 
};
let level=0;
function changeTextHack(element){
  if(initialCounter-element.innerHTML===20 && initialCounter<=(40+(20*level))){
    element.style.backgroundColor='hsl(260,5%,'+(100-(element.innerHTML))+'%)';
    bleep.play();
    element.innerHTML=initialCounter;
    initialCounter++;
  }
  else if(initialCounter-element.innerHTML===20 && initialCounter>(40+(20*level))){
    element.style.backgroundColor='hsl(260,5%,'+(100-(element.innerHTML))+'%)';
    bleep.play();
    element.innerHTML=' ';
    initialCounter++;

  }
  if(initialCounter===(61+(20*level))){
    stopGame();
  }
};
  

function shuffle(){
  let a=[1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20];
  let i=a.length,k,t;
  while(--i > 0){
    k=Math.floor(Math.random()*(i+1));
      t=a[k];
      a[k]=a[i];
      a[i]=t;
  }
  return a;
}
function game(){
  let arr=shuffle();
  grid.innerHTML='';
  
  for(let i=0;i<20;i++){
    let box=document.createElement('div');
    box.id='el'+(i+1);
    box.className='box';
    box.innerHTML=arr[i];
    grid.appendChild(box);
    if(mode===1){
      box.onclick=() =>{changeTextHack(box)};
    }
    else{
      box.onclick=() =>{changeText(box)};
    }
  }
}