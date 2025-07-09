const button = document.querySelector('button');
const input = document.querySelector('#favchap');
const list = document.querySelector('#list');

const li = document.createElement('li');
const deleteButton = document.createElement('button');

li.textContent = input.value;
deleteButton.textContent = '❌';
li.appendChild(deleteButton);
list.appendChild(li);