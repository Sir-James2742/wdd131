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

let chaptersArray = getChapterList() || [];
chaptersArray.forEach(chapter => {
    displayList(chapter);
    chapter = chapter.slice(0, chapter.length - 1);
});
button.addEventListener('click', () => {
    if (input.value != '') {  
        displayList(input.value); 
        chaptersArray.push(input.value);  
        setChapterList(); 
        input.value = ''; 
        input.focus(); 
    }
});
function displayList(item) {
    
    const listContainer = document.getElementById('#list');

  
    const listItem = document.createElement('li');


    listItem.textContent = item.chapterName || item;
}
function setChapterList() {
    localStorage.setItem('myFavBOMList', JSON.stringify(chaptersArray));
}
function getChapterList() {
    return JSON.parse(localStorage.getItem('myFavBOMList'));
}
function deleteChapter(chapter) {
    chapter = chapter.slice(0, chapter.length - 1);
    chaptersArray = chaptersArray.filter(item => item !== chapter);
    setChapterList();
}