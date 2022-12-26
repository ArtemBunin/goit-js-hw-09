import { Notify } from 'notiflix/build/notiflix-notify-aio';

const form = document.querySelector('.form');
form.addEventListener('submit', submitForm);

function submitForm(ev){
ev.preventDefault();
let delay = Number(ev.currentTarget.delay.value);
const step = Number(ev.currentTarget.step.value);
const amount = Number(ev.currentTarget.amount.value);
for (let index = 1; index <= amount; index++) {
  createPromise(index,delay).then( ({ position, delay })=>{
    Notify.success(`✅ Fulfilled promise ${position} in ${delay}ms`)
  }).catch(({ position, delay })=>{
    Notify.warning(`❌ Rejected promise ${position} in ${delay}ms`)
    
  })
  delay += step;
}

}


function createPromise(position, delay) {
  const shouldResolve = Math.random() > 0.3;

  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (shouldResolve) {
        resolve({ position, delay });
      }
      reject({ position, delay });
    }, delay);
  });
}


