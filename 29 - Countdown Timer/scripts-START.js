let countdown;
const timerDisplay = document.querySelector('.display__time-left');
const endTime = document.querySelector('.display__end-time');
const buttons = document.querySelectorAll('[data-time]');

function timer(seconds){

    clearInterval(countdown);

//     setInterval(function() {
//         seconds--;
//     }, 1000);

    const now = Date.now();
    const then = now + seconds * 1000;
    

    countdown = setInterval(() => {
        const secondsLeft = Math.round(then - Date.now() / 1000);
        if(secondsLeft < 0 ){
            clearInterval(countdown);
            return;
        }
    }, 1000)
}

function displayTimeLeft(seconds){
    const minutes = seconds / 60;
    const remainderSeconds = seconds % 60;
    const display = `${minutes}:${remainderSeconds < 10 ? '0' : ''}${remainderSeconds}`;
    document.title = display;
    timerDisplay.textContent = display;
}

function displayEndTime(timestamp){
    const end = new Date(timestamp);
    const hour = end.getHours();
    const minute = end.getMinutes();
    endTime.textContent = `Be Back At ${hour > 12 ? hour - 12: hour}:${minute < 10 ? '0' : ''}`;
}

function startTimer(){
    const seconds = parseInt(this.dataset.time);
    timer(seconds);
}

buttons.forEach(button => addEventListener('click', startTimer));
document.customForm.addEventListener('submit', function(e){
    e.preventDefault();
    const mins = this.minutes.value;
    timer(mins * 60);
    this.reset();
});
