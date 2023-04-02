
const refs = {
    btnStart: document.querySelector('button[data-start]'),
    btnStop: document.querySelector('button[data-stop]'),
    body: document.querySelector('body'),
};

let interval;

refs.btnStart.addEventListener('click', onclickStart);
refs.btnStop.addEventListener('click', onclickStop);

function onclickStart() {
    interval = setInterval(() => {
        refs.body.style.backgroundColor = getRandomHexColor();
    }, 1000);
    refs.btnStart.disabled = true;
}

function getRandomHexColor() {
  return `#${Math.floor(Math.random() * 16777215).toString(16).padStart(6, 0)}`;
}
 
function onclickStop() {
    clearInterval(interval)
    refs.btnStart.disabled = false;
    refs.body.style.backgroundColor = '#FFFFFF';
}
