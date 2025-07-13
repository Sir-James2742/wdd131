const currentyear = document.querySelector("#currentyear");
const lastModified = document.querySelector("#lastModified");
const today = new Date();

currentyear.innerHTML = `<span >${today.getFullYear()}</span>`;
lastModified.innerHTML = `Last modification: <span class="date">${new Intl.DateTimeFormat("en-US", { dateStyle: "full", timeStyle: "short" }).format(today)}</span>`;


const menuButton = document.querySelector('#menubutton');
const navigation = document.querySelector('.navlist');

menuButton.addEventListener('click', () => {
    navigation.classList.toggle('open');
    menuButton.classList.toggle('open');
});