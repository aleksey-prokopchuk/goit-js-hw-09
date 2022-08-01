import flatpickr from 'flatpickr';
import 'flatpickr/dist/flatpickr.min.css';
import Notiflix from 'notiflix';

// const flatpickr = require('flatpickr');

// Достукємось до об'єктів на сторінці
const selectCalendar = document.querySelector('#datetime-picker');
const btnStart = document.querySelector('[data-start]');
const daysSpan = document.querySelector('[data-days]');
const hoursSpan = document.querySelector('[data-hours]');
const minutesSpan = document.querySelector('[data-minutes]');
const secondsSpan = document.querySelector('[data-seconds]');

let ms = 0;
let interval = null;

btnStart.setAttribute('disabled', 'disabled');
// console.log(delta);

// 1. При кліку на старт оновлюємо поля спанів таймера
btnStart.addEventListener('click', startTimer);

// let interval = null;

function startTimer() {
  btnStart.setAttribute('disabled', 'disabled');
  interval = setInterval(() => {
    apdTimerSpan();
    console.log(convertMs(ms));
    stopTimer();
  }, 1000);
  // return interval;
  //   apdTimer();
}

function stopTimer() {
  // Без + 1000 перескакує на -1, не можу зрозуміти де налажав
  if (Date.parse(selectCalendar.value) <= Date.now()) {
    console.log('StopTimer');
    console.log(Date.parse(selectCalendar.value));
    console.log(Date.now());
    clearInterval(interval);
    // btnStart.removeAttribute('disabled');
  }
}
// console.log(interval);

// Опції бібліотеки
const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: Date.now(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    console.log(Date.parse(selectedDates[0]));
    // Якщо дата минула, кнопка Start неактивна
    if (Date.parse(selectedDates[0]) < Date.now()) {
      btnStart.setAttribute('disabled', 'disabled');

      // Якщо дата минула сповіщення у вікні alert
      // alert('Please choose a date in the future');

      //  Якщо дата минула сповіщення за допомогою бібліотеки Notiflix
      Notiflix.Notify.failure('Please choose a date in the future', {
        timeout: 3000,
      });
    } else {
      // Якщо дата вибрана вірно, кнопка Start активна
      btnStart.removeAttribute('disabled');
    }
  },
};

// Бібліотека
flatpickr('#datetime-picker', options);

// Добавляємо нуль
const addLeadingZero = value => String(value).padStart(2, '0');

// Оновлюємо span-и на сторінці
function apdTimerSpan() {
  const today = Date.now();
  ms = Date.parse(selectCalendar.value) - today;
  daysSpan.textContent = addLeadingZero(convertMs(ms).days);
  hoursSpan.textContent = addLeadingZero(convertMs(ms).hours);
  minutesSpan.textContent = addLeadingZero(convertMs(ms).minutes);
  secondsSpan.textContent = addLeadingZero(convertMs(ms).seconds);
  // console.log('Сьогодні', today);
  // console.log('Вирана дата', selectCalendar.value);
  // console.log('Різниця', ms);
  // stopTimer();
}

// Конвертер
function convertMs(ms) {
  // Number of milliseconds per unit of time
  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;

  // Remaining days
  const days = Math.floor(ms / day);
  // Remaining hours
  const hours = Math.floor((ms % day) / hour);
  // Remaining minutes
  const minutes = Math.floor(((ms % day) % hour) / minute);
  // Remaining seconds
  const seconds = Math.floor((((ms % day) % hour) % minute) / second);

  return { days, hours, minutes, seconds };
}
// console.log(convertMs(ms).days);

// console.log(convertMs(ms)); // {days: 0, hours: 0, minutes: 0, seconds: 2}
// console.log(convertMs(140000)); // {days: 0, hours: 0, minutes: 2, seconds: 20}
// console.log(convertMs(24140000)); // {days: 0, hours: 6 minutes: 42, seconds: 20}
