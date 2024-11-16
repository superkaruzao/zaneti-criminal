const debounce = function(func, wait, immediate) {
    let timeout;
    return function(...args) {
        const context = this;
        const later = function () {
        timeout = null;
        if (!immediate) func.apply(context, args);
        };
        const callNow = immediate && !timeout;
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
        if (callNow) func.apply(context, args);
    };
};

const target = document.querySelectorAll("[data-anime]");
const animationClass = 'animate';

function animeScroll() {
    target.forEach(function(element) {
        if(element.offsetHeight > 0){
            if(element.getBoundingClientRect().top <= 800) {
                element.classList.add(animationClass);
            } else {
                element.classList.remove(animationClass);
            }
        }
    })
}

animeScroll();

if(typeof(target) != 'undefined' && target != null) {
    window.addEventListener('scroll', debounce(function() {
        animeScroll();
    }, 4));
}

let progress = document.getElementById("progressBar");
if(typeof(progress) != 'undefined' && progress != null) {
    window.onscroll = function() {
        let totalHeight = document.body.scrollHeight - window.innerHeight;
        let progressHeight = (window.pageYOffset / totalHeight) * 100;
        progress.style.height = progressHeight + "%";
    }
}