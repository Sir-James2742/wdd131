const currentyear = document.querySelector("#currentyear");
const lastModified = document.querySelector("#lastModified");
const today = new Date();

currentyear.innerHTML = `<span >${today.getFullYear()}</span>`;
lastModified.innerHTML = `Last modification: <span class="date">${new Intl.DateTimeFormat("en-US", { dateStyle: "full", timeStyle: "short" }).format(today)}</span>`;

const products = [
    {
        id: "fc-1888",
        name: "flux capacitor",
        averagerating: 4.5
    },
    {
        id: "fc-2050",
        name: "power laces",
        averagerating: 4.7
    },
    {
        id: "fs-1987",
        name: "time circuits",
        averagerating: 3.5
    },
    {
        id: "ac-2000",
        name: "low voltage reactor",
        averagerating: 3.9
    },
    {
        id: "jj-1969",
        name: "warp equalizer",
        averagerating: 5.0
    }
];
const productSelect = document.getElementById('product');
products.forEach(product => {
    const option = document.createElement('option');
    option.value = product.name;
    option.textContent = product.name;
    productSelect.appendChild(option);
});


const stars = document.querySelectorAll('.rating label');
stars.forEach((star, index) => {
    star.addEventListener('mouseover', () => {
        for (let i = 0; i <= index; i++) {
            stars[i].style.color = '#ffcc00';
        }
    });
    star.addEventListener('mouseout', () => {
        const checked = document.querySelector('.rating input:checked');
        if (checked) {
            const checkedIndex = parseInt(checked.value) - 1;
            for (let i = 0; i <= checkedIndex; i++) {
                stars[i].style.color = '#ffcc00';
            }
            for (let i = checkedIndex + 1; i < stars.length; i++) {
                stars[i].style.color = '#ddd';
            }
        } else {
            stars.forEach(s => s.style.color = '#ddd');
        }
    });
});