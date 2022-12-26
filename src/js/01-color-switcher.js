// Напиши скрипт, который после нажатия кнопки «Start», раз в секунду меняет цвет фона <body> 
// на случайное значение используя инлайн стиль. При нажатии на кнопку «Stop»,
//  изменение цвета фона должно останавливаться.


 const ref = {
btnStart :document.querySelector('button[data-start]'),
btnStop :document.querySelector('button[data-stop]'),
body:document.querySelector('body'),
 }

 let timerId =null;
ref.btnStart.addEventListener('click', onColorBodyChange)
ref.btnStop.addEventListener('click',onColorBodyStoped)


console.log(getRandomHexColor());

function onColorBodyChange(){

     timerId = setInterval(()=>{
        ref.body.style.backgroundColor = getRandomHexColor(),
        ref.btnStart.setAttribute('disabled',true)
        ref.btnStop.removeAttribute('disabled') 
    },1000)
    
}
 function onColorBodyStoped(){
 clearInterval(timerId);
 ref.btnStart.removeAttribute('disabled') 
 ref.btnStop.setAttribute('disabled',true)
 }

function getRandomHexColor() {
    return `#${Math.floor(Math.random() * 16777215).toString(16)}`;
  }


  