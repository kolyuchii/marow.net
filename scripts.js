import {countdown} from './scripts/countdown.js';
import './scripts/tic-tac-toe.js';
import './scripts/mine.js';
const element = document.querySelector('#countdown');
const destinationDate = new Date('08/07/2022');
countdown(element, destinationDate);

const changeBG = () => {
    document.body.style.backgroundColor = getRandomColor();
};

const getRandomColor = () => {
    const trans = '0.1'; // 50% transparency
    let color = 'rgba(';
    for (let i = 0; i < 3; i++) {
        color += Math.floor(Math.random() * 255) + ',';
    }
    color += trans + ')'; // add the transparency
    return color;
};

changeBG();
setInterval(() => {
    changeBG();
}, 1000 * 60);