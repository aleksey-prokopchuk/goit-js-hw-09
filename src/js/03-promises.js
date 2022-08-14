import Notiflix from 'notiflix';

const form = document.querySelector('.form');

const firstDelay = document.querySelector('[name="delay"]');
const delayStep = document.querySelector('[name="step"]');
const amount = document.querySelector('[name="amount"]');

form.addEventListener('submit', onSubmit);

function onSubmit(event) {
  event.preventDefault(5);
  const firstDelayData = Number(firstDelay.value);
  const delayStepData = Number(delayStep.value);
  const amountDta = Number(amount.value);

  for (let i = 0; i < amountDta; i += 1) {
    const delay = firstDelayData + delayStepData * i;
    const position = i + 1;
    setTimeout(() => {
      createPromise(position, delay)
        .then(({ position, delay }) => {
          Notiflix.Notify.success(
            `✅ Fulfilled promise ${position} in ${delay}ms`,
            {
              timeout: 2000,
            }
          );
        })
        .catch(({ position, delay }) => {
          Notiflix.Notify.failure(
            `❌ Rejected promise ${position} in ${delay}ms`,
            {
              timeout: 2000,
            }
          );
        });
    }, delay);
  }
}

console.log(form);

function createPromise(position, delay) {
  return new Promise((resolve, reject) => {
    const shouldResolve = Math.random() > 0.3;
    if (shouldResolve) {
      // Fulfill
      resolve({ position, delay });
    } else {
      // Reject
      reject({ position, delay });
    }
  });
}
