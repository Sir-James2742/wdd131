 

if (window.location.search) {

let reviewCount = localStorage.getItem('reviewCount');

reviewCount = reviewCount ? parseInt(reviewCount) + 1 : 1;


localStorage.setItem('reviewCount', reviewCount);


document.getElementById('reviewCounter').textContent = reviewCount;
} else {

const reviewCount = localStorage.getItem('reviewCount') || 0;
document.getElementById('reviewCounter').textContent = reviewCount;
}
