let seconds=document.getElementById('countdown').innerHTML;
const grid=document.getElementById('grid');
var seconds2 = document.getElementById('countdown');
var gon = 0;
let mode=0;
let hackermode=document.getElementById('hackermode');
hackermode.onclick=()=>{
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
      startgame();
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
  document.getElementById('timedata').innerHTML=seconds1 +":" +milliseconds;
}
function startgame(){
  {
    interval=window.setInterval(stopwatch,5);
    game();
    
  }
}
function stopgame(){
  
  document.getElementById('timedata').innerHTML='0.000';
  if(best.length>0 && seconds1<best[0]){
    best.push(seconds1+(milliseconds*0.001));
  }
  else if(best.length===0){
  	best[0]=seconds1+(milliseconds*0.001);
  }
  window.clearInterval(interval);
  document.getElementById('besttimedata').innerHTML=Math.min(...best);
  grid.innerHTML='Your time is  '+ seconds1+':'+milliseconds;
  seconds1=0;
  milliseconds=0;
  let button=document.createElement('div');
  button.className='restart';
  button.innerHTML='Restart';
  button.style.cursor = 'pointer';
  button.display = 'block';
  grid.appendChild(button);

button.onclick=()=>{
  startgame();
};
initialCounter=21;
}

function changeText(element){
  
  if(initialCounter-element.innerHTML===20 && initialCounter<=40){
    if(mode===1){
      element.style.backgroundColor='hsl(260,5%,'+(100-(element.innerHTML*2))+'%)';
    }
  element.innerHTML=initialCounter;
  initialCounter++;

  
  console.log(initialCounter);
  console.log(element.innerHTML)
  }
  else if(initialCounter-element.innerHTML===20 && initialCounter>40){
    if(mode===1){
      element.style.backgroundColor='hsl(260,5%,'+(100-(element.innerHTML*2))+'%)';
    }
    element.innerHTML=' ';
  initialCounter++;
  }
  if(initialCounter===61){
    stopgame();
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
    box.onclick=() =>{changeText(box)};
  }
}