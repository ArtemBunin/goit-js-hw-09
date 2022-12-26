import flatpickr from 'flatpickr';
import 'flatpickr/dist/flatpickr.min.css';
import { Notify } from 'notiflix/build/notiflix-notify-aio';

const input = document.getElementById('datetime-picker');
const btnStart = document.querySelector('button[data-start]');

//  selectedDates[0]

const componentTimer = {
  days: document.querySelector('[data-days]'),
  hours: document.querySelector('[data-hours]'),
  minutes: document.querySelector('[data-minutes]'),
  seconds: document.querySelector('[data-seconds]'),
};

const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    // почему невыбираеться this
    if (selectedDates[0] < new Date()) {
      Notify.warning('Please choose a date in the future');
      return;
    }
    btnStart.disabled = false;
  },
};

const timer = {
  intervalId: null,
  start() {
    const selectedtime = new Date(input.value);
input.disabled = true;
    this.intervalId = setInterval(() => {
      
      const currentTime = new Date();
      const deltaTime = selectedtime - currentTime;
      if (deltaTime <= 0) {
        this.stop();
        return;
      }

      const componentTimer = convertMs(deltaTime);
      console.log(componentTimer);
      updateTimeFace(componentTimer);
      updateWords(componentTimer)
      btnStart.disabled = true;
    }, 1000);
  },

  stop() {
    this.intervalId = clearInterval(this.intervalId);
  },
};
flatpickr(input, options);

btnStart.disabled = true;
btnStart.addEventListener('click', () => timer.start());

function updateTimeFace({ days, hours, minutes, seconds }) {
  componentTimer.days.textContent = days;
  componentTimer.hours.textContent = hours;
  componentTimer.minutes.textContent = minutes;
  componentTimer.seconds.textContent = seconds;
}
function updateWords({ days, hours, minutes}){
if( days<2){
  componentTimer.days.nextElementSibling.textContent= 'DAY';
}
 if(hours<2){
  componentTimer.hours.nextElementSibling.textContent='HOUR';
 }
 if(minutes<2){
  componentTimer.minutes.nextElementSibling.textContent='MINUTE';
 }
  
}


function convertMs(ms) {
  // Number of milliseconds per unit of time
  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;

  // Remaining days
  const days = addLeadingZero(Math.floor(ms / day));
  // Remaining hours
  const hours = addLeadingZero(Math.floor((ms % day) / hour));
  // Remaining minutes
  const minutes = addLeadingZero(Math.floor(((ms % day) % hour) / minute));
  // Remaining seconds
  const seconds = addLeadingZero(
    Math.floor((((ms % day) % hour) % minute) / second)
  );

  return { days, hours, minutes, seconds };
}
function addLeadingZero(value) {
  return String(value).padStart(2, 0);
}
