import flatpickr from "flatpickr";
import "flatpickr/dist/flatpickr.min.css";
import Notiflix from 'notiflix';
import { Notify } from 'notiflix/build/notiflix-notify-aio';

const refs = {
  input: document.querySelector('#datetime-picker'),
  btn: document.querySelector('button[data-start]'),
  stopBtn: document.querySelector('button[data-stop]'),
  days: document.querySelector('[data-days]'),
  hours: document.querySelector('[data-hours]'),
  minutes: document.querySelector('[data-minutes]'),
  seconds: document.querySelector('[data-seconds]'),
};

let timerId = null;
refs.btn.disabled = true;

flatpickr(refs.input, {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,

  onClose(selectedDates) {
    if (selectedDates[0] <= new Date()) {
      Notiflix.Notify.failure('Please choose a date in the future');
      refs.btn.disabled = true;
    } else {
      refs.btn.disabled = false;
      Notiflix.Notify.success('Lets go?');
    }  
  },
});

refs.btn.addEventListener('click', start);

function start() {
  const selectedDate = new Date(refs.input.value);

  timerId = setInterval(() => {
    const deltaTime = selectedDate - Date.now();
    const { days, hours, minutes, seconds } = convertMs(deltaTime);
    updateClock({ days, hours, minutes, seconds });

    if (deltaTime < 1000) {
      clearInterval(timerId);
    } 
  }, 1000);
  refs.btn.disabled = true;
}


refs.stopBtn.addEventListener('click', stopTimer);

function stopTimer() {
  clearInterval(timerId);
  refs.btn.disabled = false;
  refs.days.textContent = '00';
  refs.hours.textContent = '00';
  refs.minutes.textContent = '00';
  refs.seconds.textContent = '00';
}


  function convertMs(ms) {
    // Number of milliseconds per unit of time
    const second = 1000;
    const minute = second * 60;
    const hour = minute * 60;
    const day = hour * 24;
  
    // Remaining days
    const days = pad(Math.floor(ms / day));
    // Remaining hours
    const hours = pad(Math.floor((ms % day) / hour));
    // Remaining minutes
    const minutes = pad(Math.floor(((ms % day) % hour) / minute));
    // Remaining seconds
    const seconds = pad(Math.floor((((ms % day) % hour) % minute) / second));
  
    return { days, hours, minutes, seconds };
  }

  function pad(value) {
    return String(value).padStart(2, '0');
  }
  
  function updateClock({ days, hours, minutes, seconds }) {
    refs.days.textContent = `${days}`;
    refs.hours.textContent = `${hours}`;
    refs.minutes.textContent = `${minutes}`;
    refs.seconds.textContent = `${seconds}`;
  }
