const button = document.querySelector('button');
const input = document.querySelector('#favchap');
const list = document.querySelector('#list');



button.addEventListener('click', () => {
    if (input.value.trim() !== '') {

        const li = document.createElement('li');
        const deleteButton = document.createElement('button');

        li.textContent = input.value;
        deleteButton.textContent = '❌';
        li.appendChild(deleteButton);
        list.appendChild(li);
        input.focus();

        deleteButton.addEventListener('click', () => {
            list.removeChild(li);
            input.focus();
        });
    }
    input.value = '';
    input.focus();


});

