import html from './file.html';


console.log(html);
const div = document.createElement('div');

div.innerHTML = html;

document.body.appendChild(div);
console.log('hi!')
