import 'flatpickr/dist/flatpickr.min.css';
import flatpickr from 'flatpickr';
// import { Notify } from 'notiflix/build/notiflix-notify-aio';

const start = document.querySelector('[data-start]');
start.setAttribute('disabled', 'disabled');

const calendar = document.querySelector('#datetime-picker');
const spans = [].concat(...document.querySelectorAll('.value'));

flatpickr(calendar, {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    console.log(selectedDates[0]);
  },
});

// остановка таймера когда он дойдет до финиша
// ресурс по которому писал отслеживание https://learn.javascript.ru/mutation-observer
//'DOMSubtreeModified' изначально использоват это событие но мдн его не рекомендует поэтому делал по рекомендации мдн

const finish = () => {
  let observer = new MutationObserver(() => {
    if (
      spans[0].textContent === '00' &&
      spans[1].textContent === '00' &&
      spans[2].textContent === '00' &&
      spans[3].textContent === '00' &&
      start.hasAttribute('disabled') &&
      !document.querySelector('.open')
    ) {
      Notify.success('Таймер пришел к финишу');
      return clearInterval(interval);
      // console.log();
    }
  });
  observer.observe(spans[0], {
    childList: true,
    subtree: true,
    oldValue: true,
  });
  observer.observe(spans[1], {
    childList: true,
    subtree: true,
    oldValue: true,
  });
  observer.observe(spans[2], {
    childList: true,
    subtree: true,
    oldValue: true,
  });
  observer.observe(spans[3], {
    childList: true,
    subtree: true,
    oldValue: true,
  });
};

let interval = null;

const myTimer = () => {
  start.setAttribute('disabled', 'disabled');

  finish();

  if (start.hasAttribute('disabled')) {
    const val = setInterval(() => {
      const date = new Date(Date.parse(calendar.value) - Date.now());
      const sec = (document.querySelector('[data-seconds]').textContent =
        convertMs(date).seconds);
      const mins = (document.querySelector('[data-minutes]').textContent =
        convertMs(date).minutes);
      const hour = (document.querySelector('[data-hours]').textContent =
        convertMs(date).hours);
      const day = (document.querySelector('[data-days]').textContent =
        convertMs(date).days);
    }, 1000);

    return (interval = val);
  }
};

const calendarValue = () => {
  const valueCalendar = new Date(Date.parse(calendar.value));
  if (valueCalendar < Date.now()) {
    start.setAttribute('disabled', 'disabled');
    Notify.failure('Please choose a date in the future');
    spans.forEach(e => (e.textContent = '00'));
    clearInterval(interval);
  } else if (calendar.value == '') {
    start.setAttribute('disabled', 'disabled');
  } else {
    start.removeAttribute('disabled');
    spans.forEach(e => (e.textContent = '00'));
    clearInterval(interval);
  }
};

calendar.addEventListener('input', calendarValue);
start.addEventListener('click', myTimer);

//добавляем ноль
const addLeadingZero = value => String(value).padStart(2, '0');

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
