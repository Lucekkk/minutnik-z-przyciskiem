const outerProgress = document.querySelector('.wrapper .outerProgress');
const progress = document.querySelector('.digits');
const inputs = [...document.querySelectorAll('.digits input')];
const start = document.querySelector('.start');

let seconds = 0;
let minutes = 0;
let hours = 0;
let allSeconds;
let angle = 360;
let degrees;
let idInterval;

let flag = false

function setTime(e){
   
    if(e.target.classList.contains('hours')){
         
            hours = e.target.value;
            if(hours.length === 3){
                e.target.value = hours.slice(0, -1)
                hours = e.target.value;
                // console.log(hours)
            }
            hours = Number(hours);
            // console.log(hours)

    }else if(e.target.classList.contains('minutes')){
            minutes =  e.target.value;
            
            if(minutes.length === 3){
                e.target.value = minutes.slice(0, -1)
                minutes = e.target.value;
                 
            }
            minutes = Number(minutes);
            if(minutes > 59 ){
                hours++;
                minutes = 0;
                  
            }
    }else{
            seconds = e.target.value;
            if(seconds.length === 3){
                e.target.value = seconds.slice(0, -1)
                seconds = e.target.value;
                 
            }
            seconds = Number(seconds);
            if(seconds > 59 ){
                minutes++;
                seconds = 0;
            }
            }
    

}
function blockOtherChars(e){
    if(e.keyCode != 0 && e.keyCode != 8 && e.keyCode != 9 && e.keyCode < 48 || e.keyCode > 57){
        e.preventDefault();
    }
    // console.log(e.keyCode)
}
function startTime(){
        if(!flag){
                if(hours === 0 && minutes === 0 && seconds === 0){
                    return alert("Podaj czas");
                }
    
                if(hours === 0 && minutes === 0){

                    seconds >= 10 ?  seconds : seconds = "0" + seconds;
                    progress.textContent = seconds;
                    seconds = Number(seconds)
                    // console.log(seconds)
                }
                else if(hours === 0){
 
                    seconds >= 10 ?  seconds : seconds = "0" + seconds;
                    minutes >= 10 ?  minutes : minutes = "0" + minutes;
                    progress.textContent = `${minutes}:${seconds}`;
                    seconds = Number(seconds);
                    minutes = Number(minutes);
        
                }else{
        
                    seconds >= 10 ?  seconds : seconds = "0" + seconds;
                    minutes >= 10 ?  minutes : minutes = "0" + minutes;
                    hours >= 10 ?  hours : hours = "0" + hours;
                    progress.textContent = `${hours}:${minutes}:${seconds}`;
                    seconds = Number(seconds);
                    minutes = Number(minutes);
                    hours = Number(hours);
                    // console.log(hours)
                } 

                allSeconds = (hours * 3600) + (minutes * 60) + seconds;
                degrees  = angle / allSeconds;
                console.log(degrees)
                console.log(allSeconds)
                

                flag = !flag;
                start.textContent = 'Stop';
                idInterval = setInterval(timer, 1000);

            }else{
                flag = !flag;
                start.textContent = 'Wznów';
                clearInterval(idInterval);
            }
     
}

const timer = ()=>{
    

    angle -= degrees;
    allSeconds--;
    seconds--;
    if(seconds < 0){
        minutes -= 1;
        seconds = 59;
    }
    if(minutes < 0){
        hours -= 1;
        minutes = 59
    }
    // console.log(angle)
    // console.log(allSeconds)
   
    if(hours === 0 && minutes === 0){
        seconds >= 10 ?  seconds : seconds = "0" + seconds;
        progress.textContent = seconds;
        seconds = Number(seconds)
    }
    else if(hours === 0){

         seconds >= 10 ?  seconds : seconds = "0" + seconds;
         minutes >= 10 ?  minutes : minutes = "0" + minutes;
         progress.textContent = `${minutes}:${seconds}`;
         seconds = Number(seconds);
         minutes = Number(minutes);  
        
    }else{
        seconds >= 10 ?  seconds : seconds = "0" + seconds;
         minutes >= 10 ?  minutes : minutes = "0" + minutes;
        hours >= 10 ?  hours : hours = "0" + hours;
        progress.textContent = `${hours}:${minutes}:${seconds}`;
        seconds = Number(seconds);
        minutes = Number(minutes);
         hours = Number(hours);
    } 
         
   
     outerProgress.style.background = `conic-gradient(rgb(239 0 0 / 20%) ${angle}deg, transparent 0deg)`;
     document.title = `${hours}:${minutes}:${seconds}`;
     
    if(allSeconds === 0){
        clearInterval(idInterval)
    }
       
    }
inputs.forEach(input => input.addEventListener('input', setTime));
inputs.forEach(input => input.addEventListener('keydown', blockOtherChars));
start.addEventListener('click',startTime);

         

       