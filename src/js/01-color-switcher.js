const refs = {
  bgColorBody: document.querySelector('body'),
  btnStart: document.querySelector('[data-start]'),
  btnStop: document.querySelector('[data-stop]'),
};

// console.log(refs.bgColorBody);
// console.log(refs.btnStart);
// console.log(refs.btnStop);

//Функція рандомного кольору
function getRandomHexColor() {
  return `#${Math.floor(Math.random() * 16777215).toString(16)}`;
}

//По замовчуванню добавляємо отрибут виммкненої кнопкки
refs.btnStop.setAttribute('disabled', 'disabled');

//Зберігаємо інтервал заміни ккольору
let intervalChangeColor = null; // переменная id интервала

//Прослуховуємо кнопки
refs.btnStart.addEventListener('click', startChangeBgc);
refs.btnStop.addEventListener('click', stopChangeBgc);

//
function startChangeBgc() {
  // Робимо не активною кнопку СТАРТ при натисканні (встаановлюємо атрибут disabled)
  refs.btnStart.setAttribute('disabled', 'disabled');
  refs.btnStop.removeAttribute('disabled');
  // Перевіряємо атрибут кнопки СТОП та зміньємо на активну (видаяємо атрибут disabled)
  if (refs.btnStart.hasAttribute('disabled')) {
    refs.btnStop.removeAttribute('disabled');
  }
  console.log('Кнопка СТАРТ');

  // При натисканні на старт запускаємо зміну кольору беграунда з интервалом в 1000 ms
  const startChangeBgc = setInterval(() => {
    refs.bgColorBody.style.backgroundColor = getRandomHexColor();
  }, 1000);

  // Повертаємо інтервал startChangeBgc в перемінну intervalChangeColor
  return (intervalChangeColor = startChangeBgc);
}

function stopChangeBgc() {
  // Робимо не активною кнопку СТОП при натисканні (встаановлюємо атрибут disabled)
  refs.btnStop.setAttribute('disabled', 'disabled');

  // З кнопки СТАРТ видаяємо атрибут disabled
  refs.btnStart.removeAttribute('disabled');

  console.log('Кнопка СТОП');

  // При натисканні на СТОП чисстимо інтервал
  clearInterval(intervalChangeColor);
}

// console.log(getRandomHexColor());
